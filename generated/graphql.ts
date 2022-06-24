import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Choice = {
  __typename?: 'Choice';
  id: Scalars['Int'];
  name: Scalars['String'];
  post?: Maybe<Post>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  choices: Array<ChoiceInput>;
  imgurl: Scalars['String'];
  title: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  body: Scalars['String'];
  choices?: Maybe<Array<Maybe<Choice>>>;
  id: Scalars['Int'];
  imgurl: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  posts: Array<Maybe<Post>>;
};

export type ChoiceInput = {
  name: Scalars['String'];
};

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
  imgurl: Scalars['String'];
  choices: Array<ChoiceInput> | ChoiceInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, title: string, body: string, choices?: Array<{ __typename?: 'Choice', id: number, name: string } | null> | null } };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, title: string, body: string, imgurl: string, choices?: Array<{ __typename?: 'Choice', id: number, name: string } | null> | null } | null> };


export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $body: String!, $imgurl: String!, $choices: [choiceInput!]!) {
  createPost(title: $title, body: $body, imgurl: $imgurl, choices: $choices) {
    id
    title
    body
    choices {
      id
      name
    }
  }
}
    `;
export const GetPostsDocument = gql`
    query GetPosts {
  posts {
    id
    title
    body
    imgurl
    choices {
      id
      name
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreatePost(variables: CreatePostMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePostMutation>(CreatePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreatePost', 'mutation');
    },
    GetPosts(variables?: GetPostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostsQuery>(GetPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPosts', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;