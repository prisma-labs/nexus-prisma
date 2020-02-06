import { DMMF } from '@prisma/client/runtime'
import { isEmpty, fromEntries } from '@re-do/utils'
import {
  MutationResolverParams,
  ComputedInputs,
  ResolvedRelationsConfig,
} from '../utils'
import { getPhotonDmmf } from './utils'
import { DmmfDocument } from './DmmfDocument'
import { DmmfTypes } from './DmmfTypes'
import { Publisher } from '../publisher'

export const getTransformedDmmf = (
  photonClientPackagePath: string,
): DmmfDocument =>
  new DmmfDocument(transform(getPhotonDmmf(photonClientPackagePath)))

export function transform(document: DMMF.Document): DmmfTypes.Document {
  return {
    datamodel: transformDatamodel(document.datamodel),
    mappings: document.mappings as DmmfTypes.Mapping[],
    schema: transformSchema(document.schema),
  }
}

function transformDatamodel(datamodel: DMMF.Datamodel): DmmfTypes.Datamodel {
  return {
    enums: datamodel.enums,
    models: datamodel.models.map(model => ({
      ...model,
      fields: model.fields.map(field => ({
        ...field,
        kind: field.kind === 'object' ? 'relation' : field.kind,
      })),
    })),
  }
}

function transformSchema(schema: DMMF.Schema): DmmfTypes.Schema {
  return {
    enums: schema.enums,
    inputTypes: schema.inputTypes.map(transformInputType),
    outputTypes: schema.outputTypes.map(o => ({
      ...o,
      fields: o.fields.map(f => ({
        ...f,
        args: f.args.map(transformArg),
        outputType: {
          ...f.outputType,
          type: getReturnTypeName(f.outputType.type),
        },
      })),
    })),
  }
}

/**
 * Conversion from a Photon arg type to a GraphQL arg type using
 * heuristics. A conversion is needed becuase GraphQL does not
 * support union types on args, but Photon does.
 */
function transformArg(arg: DMMF.SchemaArg): DmmfTypes.SchemaArg {
  // FIXME: *Enum*Filter are currently empty
  let inputType = arg.inputType.some(a => a.kind === 'enum')
    ? arg.inputType[0]
    : arg.inputType.find(a => a.kind === 'object')!

  if (!inputType) {
    inputType = arg.inputType[0]
  }

  return {
    name: arg.name,
    inputType: {
      ...inputType,
      type: getReturnTypeName(inputType.type),
    },
    // FIXME Why?
    isRelationFilter: undefined,
  }
}

const computeInputs = (
  computedInputs: ComputedInputs,
  params: MutationResolverParams,
  // If passed, computedInput result will be filtered to include only those fields that exist in inputType
  inputType?: DmmfTypes.InputType,
) => {
  let computedEntries = Object.entries(computedInputs)
  if (inputType) {
    computedEntries = computedEntries.filter(([key]) =>
      inputType.fields.find(({ name }) => name === key),
    )
  }
  return fromEntries(
    computedEntries.map(([key, computeValue]) => [key, computeValue(params)]),
  )
}

type TransformArgsParams = {
  inputType: DmmfTypes.InputType
  params: MutationResolverParams
  publisher: Publisher
  computedInputs: ComputedInputs
  relations: ResolvedRelationsConfig
}

function deepTransformArgData(params: TransformArgsParams, data: unknown): any {
  const { inputType, publisher } = params
  if (!data || typeof data !== 'object') {
    return data
  }
  let transformedData = data
  if (Array.isArray(data)) {
    transformedData = data.map(value =>
      deepTransformArgData(
        {
          ...params,
          // A relation key will be injected at the end of this function call
          // if the inputType required one, so this avoids duplicating it
          inputType: { ...inputType, relation: false },
        },
        value,
      ),
    )
  } else if (data && typeof data === 'object') {
    // Recurse to handle nested inputTypes
    transformedData = fromEntries(
      Object.entries(data).map(([fieldName, fieldData]) => {
        const field = inputType.fields.find(_ => _.name === fieldName)
        if (!field) {
          throw new Error(
            `Couldn't find field '${fieldName}' on input type '${
              inputType.name
            }' which was expected based on your data (${JSON.stringify(
              data,
              null,
              4,
            )}). Found fields ${inputType.fields.map(_ => _.name)}`,
          )
        }
        const deepTransformedFieldValue =
          field.inputType.kind === 'object'
            ? deepTransformArgData(
                {
                  ...params,
                  inputType: publisher.getInputType(field.inputType.type),
                },
                fieldData,
              )
            : fieldData
        return [fieldName, deepTransformedFieldValue]
      }),
    )
    // Add computedInputs to data
    transformedData = {
      ...transformedData,
      ...computeInputs(params.computedInputs, params.params, inputType),
    }
  }
  if (typeof inputType.relation === 'string') {
    // Inject relation key into data if one was omitted based on the inputType
    transformedData = { [inputType.relation]: transformedData }
  }
  return transformedData
}

type IsTransformRequiredArgs = {
  relations: ResolvedRelationsConfig
  computedInputs: ComputedInputs
}

export const isTransformRequired = ({
  relations,
  computedInputs,
}: IsTransformRequiredArgs) =>
  !isEmpty(computedInputs) ||
  !isEmpty(relations.connect) ||
  !isEmpty(relations.create) ||
  relations.defaultRelation

export const transformArgs = ({
  inputType,
  params,
  publisher,
  relations,
  computedInputs,
}: TransformArgsParams) =>
  isTransformRequired({ relations, computedInputs })
    ? {
        ...params.args,
        data: deepTransformArgData(
          {
            inputType,
            publisher,
            params,
            relations,
            computedInputs,
          },
          params.args.data,
        ),
      }
    : params.args

const isRelationType = (inputType: DMMF.InputType) =>
  inputType.fields.length === 2 &&
  inputType.fields.every(
    field => field.name === 'create' || field.name === 'connect',
  )

function transformInputType(inputType: DMMF.InputType): DmmfTypes.InputType {
  return {
    ...inputType,
    fields: inputType.fields.map(transformArg),
    relation: isRelationType(inputType),
  }
}

/**
 * Make the "return type" property type always be a string. In Photon
 * it is allowed to be a nested structured object but we want only the
 * reference-by-name form.
 *
 */
//
// TODO _why_ is the dmmf like this?
//
// FIXME `any` type becuase this is used by both outputType and inputType
// and there is currently no generic capturing both ideas.
//
function getReturnTypeName(type: any) {
  if (typeof type === 'string') {
    return type
  }

  return type.name
}
