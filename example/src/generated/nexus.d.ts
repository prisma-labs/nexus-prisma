/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as photon from "@generated/photon"



declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  AuthorCreateManyWithoutAuthorsInput: { // input type
    connect?: NexusGenInputs['AuthorWhereUniqueInput'][] | null; // [AuthorWhereUniqueInput!]
    create?: NexusGenInputs['AuthorCreateWithoutBlogInput'][] | null; // [AuthorCreateWithoutBlogInput!]
  }
  AuthorCreateOneWithoutAuthorInput: { // input type
    connect?: NexusGenInputs['AuthorWhereUniqueInput'] | null; // AuthorWhereUniqueInput
    create?: NexusGenInputs['AuthorCreateWithoutPostsInput'] | null; // AuthorCreateWithoutPostsInput
  }
  AuthorCreateWithoutBlogInput: { // input type
    name?: string | null; // String
    posts?: NexusGenInputs['PostCreateManyWithoutPostsInput'] | null; // PostCreateManyWithoutPostsInput
  }
  AuthorCreateWithoutPostsInput: { // input type
    blog: NexusGenInputs['BlogCreateOneWithoutBlogInput']; // BlogCreateOneWithoutBlogInput!
    name?: string | null; // String
  }
  AuthorWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  BlogCreateInput: { // input type
    authors?: NexusGenInputs['AuthorCreateManyWithoutAuthorsInput'] | null; // AuthorCreateManyWithoutAuthorsInput
    createdAt?: any | null; // DateTime
    name: string; // String!
    posts?: NexusGenInputs['PostCreateManyWithoutPostsInput'] | null; // PostCreateManyWithoutPostsInput
    updatedAt?: any | null; // DateTime
    viewCount: number; // Int!
  }
  BlogCreateOneWithoutBlogInput: { // input type
    connect?: NexusGenInputs['BlogWhereUniqueInput'] | null; // BlogWhereUniqueInput
    create?: NexusGenInputs['BlogCreateWithoutAuthorsInput'] | null; // BlogCreateWithoutAuthorsInput
  }
  BlogCreateWithoutAuthorsInput: { // input type
    createdAt?: any | null; // DateTime
    name: string; // String!
    posts?: NexusGenInputs['PostCreateManyWithoutPostsInput'] | null; // PostCreateManyWithoutPostsInput
    updatedAt?: any | null; // DateTime
    viewCount: number; // Int!
  }
  BlogPostsOrderByInput: { // input type
    id?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    title?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
  }
  BlogWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  IntFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: number | null; // Int
    notIn?: number[] | null; // [Int!]
  }
  NullableStringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: string | null; // String
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  PostCreateManyWithoutPostsInput: { // input type
    connect?: NexusGenInputs['PostWhereUniqueInput'][] | null; // [PostWhereUniqueInput!]
    create?: NexusGenInputs['PostCreateWithoutBlogInput'][] | null; // [PostCreateWithoutBlogInput!]
  }
  PostCreateWithoutBlogInput: { // input type
    author?: NexusGenInputs['AuthorCreateOneWithoutAuthorInput'] | null; // AuthorCreateOneWithoutAuthorInput
    tags?: NexusGenInputs['PostCreatetagsInput'] | null; // PostCreatetagsInput
    title: string; // String!
  }
  PostCreatetagsInput: { // input type
    set?: string[] | null; // [String!]
  }
  PostWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  QueryFindManyAuthorFilter: { // input type
    every?: NexusGenInputs['QueryFindManyAuthorWhereInput'] | null; // QueryFindManyAuthorWhereInput
    none?: NexusGenInputs['QueryFindManyAuthorWhereInput'] | null; // QueryFindManyAuthorWhereInput
    some?: NexusGenInputs['QueryFindManyAuthorWhereInput'] | null; // QueryFindManyAuthorWhereInput
  }
  QueryFindManyAuthorWhereInput: { // input type
    AND?: NexusGenInputs['QueryFindManyAuthorWhereInput'][] | null; // [QueryFindManyAuthorWhereInput!]
    blog?: NexusGenInputs['QueryFindManyAuthorWhereInput'] | null; // QueryFindManyAuthorWhereInput
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    name?: NexusGenInputs['NullableStringFilter'] | null; // NullableStringFilter
    NOT?: NexusGenInputs['QueryFindManyAuthorWhereInput'][] | null; // [QueryFindManyAuthorWhereInput!]
    OR?: NexusGenInputs['QueryFindManyAuthorWhereInput'][] | null; // [QueryFindManyAuthorWhereInput!]
    posts?: NexusGenInputs['QueryFindManyAuthorFilter'] | null; // QueryFindManyAuthorFilter
  }
  QueryFindManyPostOrderByInput: { // input type
    id?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    title?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
  }
}

export interface NexusGenEnums {
  OrderByArg: photon.OrderByArg
}

export interface NexusGenRootTypes {
  Author: photon.Author;
  Blog: photon.Blog;
  CustomPost: { // root type
    id: number; // Int!
    tags: string[]; // [String!]!
    title: string; // String!
  }
  Mutation: {};
  Query: {};
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  AuthorCreateManyWithoutAuthorsInput: NexusGenInputs['AuthorCreateManyWithoutAuthorsInput'];
  AuthorCreateOneWithoutAuthorInput: NexusGenInputs['AuthorCreateOneWithoutAuthorInput'];
  AuthorCreateWithoutBlogInput: NexusGenInputs['AuthorCreateWithoutBlogInput'];
  AuthorCreateWithoutPostsInput: NexusGenInputs['AuthorCreateWithoutPostsInput'];
  AuthorWhereUniqueInput: NexusGenInputs['AuthorWhereUniqueInput'];
  BlogCreateInput: NexusGenInputs['BlogCreateInput'];
  BlogCreateOneWithoutBlogInput: NexusGenInputs['BlogCreateOneWithoutBlogInput'];
  BlogCreateWithoutAuthorsInput: NexusGenInputs['BlogCreateWithoutAuthorsInput'];
  BlogPostsOrderByInput: NexusGenInputs['BlogPostsOrderByInput'];
  BlogWhereUniqueInput: NexusGenInputs['BlogWhereUniqueInput'];
  IntFilter: NexusGenInputs['IntFilter'];
  NullableStringFilter: NexusGenInputs['NullableStringFilter'];
  PostCreateManyWithoutPostsInput: NexusGenInputs['PostCreateManyWithoutPostsInput'];
  PostCreateWithoutBlogInput: NexusGenInputs['PostCreateWithoutBlogInput'];
  PostCreatetagsInput: NexusGenInputs['PostCreatetagsInput'];
  PostWhereUniqueInput: NexusGenInputs['PostWhereUniqueInput'];
  QueryFindManyAuthorFilter: NexusGenInputs['QueryFindManyAuthorFilter'];
  QueryFindManyAuthorWhereInput: NexusGenInputs['QueryFindManyAuthorWhereInput'];
  QueryFindManyPostOrderByInput: NexusGenInputs['QueryFindManyPostOrderByInput'];
  OrderByArg: NexusGenEnums['OrderByArg'];
}

export interface NexusGenFieldTypes {
  Author: { // field return type
    blog: NexusGenRootTypes['Blog']; // Blog!
    id: number; // Int!
    name: string | null; // String
    posts: NexusGenRootTypes['CustomPost'][] | null; // [CustomPost!]
  }
  Blog: { // field return type
    authors: NexusGenRootTypes['Author'][] | null; // [Author!]
    createdAt: any; // DateTime!
    id: number; // Int!
    name: string; // String!
    posts: NexusGenRootTypes['CustomPost'][] | null; // [CustomPost!]
    updatedAt: any; // DateTime!
    viewCount: number; // Int!
  }
  CustomPost: { // field return type
    id: number; // Int!
    tags: string[]; // [String!]!
    title: string; // String!
  }
  Mutation: { // field return type
    createOneBlog: NexusGenRootTypes['Blog']; // Blog!
  }
  Query: { // field return type
    authors: NexusGenRootTypes['Author'][] | null; // [Author!]
    blog: NexusGenRootTypes['Blog'] | null; // Blog
    blogs: NexusGenRootTypes['Blog'][] | null; // [Blog!]
    posts: NexusGenRootTypes['CustomPost'][] | null; // [CustomPost!]
  }
}

export interface NexusGenArgTypes {
  Author: {
    posts: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  Blog: {
    authors: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    posts: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['BlogPostsOrderByInput'] | null; // BlogPostsOrderByInput
      skip?: number | null; // Int
    }
  }
  Mutation: {
    createOneBlog: { // args
      data: NexusGenInputs['BlogCreateInput']; // BlogCreateInput!
    }
  }
  Query: {
    authors: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
      where?: NexusGenInputs['QueryFindManyAuthorWhereInput'] | null; // QueryFindManyAuthorWhereInput
    }
    blog: { // args
      where: NexusGenInputs['BlogWhereUniqueInput']; // BlogWhereUniqueInput!
    }
    posts: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['QueryFindManyPostOrderByInput'] | null; // QueryFindManyPostOrderByInput
      skip?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Author" | "Blog" | "CustomPost" | "Mutation" | "Query";

export type NexusGenInputNames = "AuthorCreateManyWithoutAuthorsInput" | "AuthorCreateOneWithoutAuthorInput" | "AuthorCreateWithoutBlogInput" | "AuthorCreateWithoutPostsInput" | "AuthorWhereUniqueInput" | "BlogCreateInput" | "BlogCreateOneWithoutBlogInput" | "BlogCreateWithoutAuthorsInput" | "BlogPostsOrderByInput" | "BlogWhereUniqueInput" | "IntFilter" | "NullableStringFilter" | "PostCreateManyWithoutPostsInput" | "PostCreateWithoutBlogInput" | "PostCreatetagsInput" | "PostWhereUniqueInput" | "QueryFindManyAuthorFilter" | "QueryFindManyAuthorWhereInput" | "QueryFindManyPostOrderByInput";

export type NexusGenEnumNames = "OrderByArg";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: {};
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}