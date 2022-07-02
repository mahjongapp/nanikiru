/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../src/lib/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     */
    bigint<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "BigInt";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     */
    bigint<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "BigInt";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  choiceInput: { // input type
    name: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  BigInt: bigint
  DateTime: Date
}

export interface NexusGenObjects {
  Answer: { // root type
    body: string; // String!
    choiceId: number; // Int!
    id: number; // Int!
    postId: number; // Int!
    userId: string; // String!
  }
  Choice: { // root type
    id: number; // Int!
    name: string; // String!
    postId: number; // Int!
  }
  Mutation: {};
  Post: { // root type
    body: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    imgurl: string; // String!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId: string; // String!
  }
  Query: {};
  User: { // root type
    email?: string | null; // String
    emailVerified?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    image?: string | null; // String
    name?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Answer: { // field return type
    body: string; // String!
    choice: NexusGenRootTypes['Choice'] | null; // Choice
    choiceId: number; // Int!
    id: number; // Int!
    post: NexusGenRootTypes['Post'] | null; // Post
    postId: number; // Int!
    user: NexusGenRootTypes['User'] | null; // User
    userId: string; // String!
  }
  Choice: { // field return type
    id: number; // Int!
    name: string; // String!
    post: NexusGenRootTypes['Post'] | null; // Post
    postId: number; // Int!
  }
  Mutation: { // field return type
    createAnswer: NexusGenRootTypes['Answer']; // Answer!
    createPost: NexusGenRootTypes['Post']; // Post!
  }
  Post: { // field return type
    body: string; // String!
    choices: Array<NexusGenRootTypes['Choice'] | null> | null; // [Choice]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    imgurl: string; // String!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User'] | null; // User
    userId: string; // String!
  }
  Query: { // field return type
    answersByPostId: Array<NexusGenRootTypes['Answer'] | null>; // [Answer]!
    hello: string | null; // String
    post: NexusGenRootTypes['Post'] | null; // Post
    posts: Array<NexusGenRootTypes['Post'] | null>; // [Post]!
    postsByUserId: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
  }
  User: { // field return type
    email: string | null; // String
    emailVerified: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    image: string | null; // String
    name: string | null; // String
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
  }
}

export interface NexusGenFieldTypeNames {
  Answer: { // field return type name
    body: 'String'
    choice: 'Choice'
    choiceId: 'Int'
    id: 'Int'
    post: 'Post'
    postId: 'Int'
    user: 'User'
    userId: 'String'
  }
  Choice: { // field return type name
    id: 'Int'
    name: 'String'
    post: 'Post'
    postId: 'Int'
  }
  Mutation: { // field return type name
    createAnswer: 'Answer'
    createPost: 'Post'
  }
  Post: { // field return type name
    body: 'String'
    choices: 'Choice'
    createdAt: 'DateTime'
    id: 'Int'
    imgurl: 'String'
    title: 'String'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
  }
  Query: { // field return type name
    answersByPostId: 'Answer'
    hello: 'String'
    post: 'Post'
    posts: 'Post'
    postsByUserId: 'Post'
  }
  User: { // field return type name
    email: 'String'
    emailVerified: 'DateTime'
    id: 'String'
    image: 'String'
    name: 'String'
    posts: 'Post'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createAnswer: { // args
      body: string; // String!
      choiceId: number; // Int!
      postId: number; // Int!
      userId: string; // String!
    }
    createPost: { // args
      body: string; // String!
      choices: NexusGenInputs['choiceInput'][]; // [choiceInput!]!
      imgurl: string; // String!
      title: string; // String!
      userId: string; // String!
    }
  }
  Query: {
    answersByPostId: { // args
      postId: number; // Int!
    }
    post: { // args
      id: number; // Int!
    }
    postsByUserId: { // args
      id: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
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
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}