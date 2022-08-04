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
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Answer = {
  __typename?: 'Answer';
  body: Scalars['String'];
  choice?: Maybe<Choice>;
  choiceId: Scalars['Int'];
  id: Scalars['Int'];
  post?: Maybe<Post>;
  postId: Scalars['Int'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type Choice = {
  __typename?: 'Choice';
  id: Scalars['Int'];
  name: Scalars['String'];
  post?: Maybe<Post>;
  postId: Scalars['Int'];
};

export type Comment = {
  __typename?: 'Comment';
  answer?: Maybe<Answer>;
  answerId: Scalars['Int'];
  body: Scalars['String'];
  id: Scalars['String'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAnswer: Answer;
  createComment: Comment;
  createPost: Post;
};


export type MutationCreateAnswerArgs = {
  body: Scalars['String'];
  choiceId: Scalars['Int'];
  postId: Scalars['Int'];
  userId: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  answerId: Scalars['Int'];
  body: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  choices: Array<ChoiceInput>;
  imgurl: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  blurDataURL?: Maybe<Scalars['String']>;
  body: Scalars['String'];
  choices?: Maybe<Array<Maybe<Choice>>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  imgurl: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  answersByPostId: Array<Maybe<Answer>>;
  commentsByAnswerId?: Maybe<Array<Maybe<Comment>>>;
  hello?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  posts: Array<Maybe<Post>>;
  postsByUserId?: Maybe<Array<Maybe<Post>>>;
};


export type QueryAnswersByPostIdArgs = {
  postId: Scalars['Int'];
};


export type QueryCommentsByAnswerIdArgs = {
  id: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsByUserIdArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type ChoiceInput = {
  name: Scalars['String'];
};

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
  imgurl: Scalars['String'];
  choices: Array<ChoiceInput> | ChoiceInput;
  userId: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, title: string, body: string, choices?: Array<{ __typename?: 'Choice', id: number, name: string } | null> | null } };

export type CreateAnswerMutationVariables = Exact<{
  body: Scalars['String'];
  postId: Scalars['Int'];
  choiceId: Scalars['Int'];
  userId: Scalars['String'];
}>;


export type CreateAnswerMutation = { __typename?: 'Mutation', createAnswer: { __typename?: 'Answer', id: number, body: string, postId: number, choiceId: number, post?: { __typename?: 'Post', title: string, body: string, imgurl: string, choices?: Array<{ __typename?: 'Choice', id: number, name: string } | null> | null } | null, choice?: { __typename?: 'Choice', id: number, name: string } | null } };

export type CreateCommentMutationVariables = Exact<{
  body: Scalars['String'];
  userId: Scalars['String'];
  answerId: Scalars['Int'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, body: string, user?: { __typename?: 'User', name?: string | null, image?: string | null } | null, answer?: { __typename?: 'Answer', body: string } | null } };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, title: string, body: string, imgurl: string, createdAt: any, updatedAt: any, blurDataURL?: string | null, choices?: Array<{ __typename?: 'Choice', id: number, name: string } | null> | null, user?: { __typename?: 'User', name?: string | null, image?: string | null } | null } | null> };

export type GetPostByIdQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type GetPostByIdQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: number, title: string, body: string, imgurl: string, blurDataURL?: string | null, choices?: Array<{ __typename?: 'Choice', id: number, name: string } | null> | null, user?: { __typename?: 'User', name?: string | null, image?: string | null } | null } | null };

export type GetAnswersByPostIdQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type GetAnswersByPostIdQuery = { __typename?: 'Query', answersByPostId: Array<{ __typename?: 'Answer', id: number, body: string, choice?: { __typename?: 'Choice', name: string } | null, user?: { __typename?: 'User', name?: string | null, image?: string | null } | null } | null> };

export type GetPostsByUserIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetPostsByUserIdQuery = { __typename?: 'Query', postsByUserId?: Array<{ __typename?: 'Post', id: number, title: string, body: string, imgurl: string, createdAt: any, updatedAt: any, blurDataURL?: string | null, choices?: Array<{ __typename?: 'Choice', id: number, name: string } | null> | null, user?: { __typename?: 'User', name?: string | null, image?: string | null } | null } | null> | null };

export type GetCommentsByAnswerIdQueryVariables = Exact<{
  answerId: Scalars['Int'];
}>;


export type GetCommentsByAnswerIdQuery = { __typename?: 'Query', commentsByAnswerId?: Array<{ __typename?: 'Comment', id: string, body: string, userId: string, answerId: number, user?: { __typename?: 'User', id: string, name?: string | null, email?: string | null, image?: string | null } | null } | null> | null };


export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $body: String!, $imgurl: String!, $choices: [choiceInput!]!, $userId: String!) {
  createPost(
    title: $title
    body: $body
    imgurl: $imgurl
    choices: $choices
    userId: $userId
  ) {
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
export const CreateAnswerDocument = gql`
    mutation CreateAnswer($body: String!, $postId: Int!, $choiceId: Int!, $userId: String!) {
  createAnswer(body: $body, postId: $postId, choiceId: $choiceId, userId: $userId) {
    id
    body
    postId
    post {
      title
      body
      imgurl
      choices {
        id
        name
      }
    }
    choiceId
    choice {
      id
      name
    }
  }
}
    `;
export const CreateCommentDocument = gql`
    mutation CreateComment($body: String!, $userId: String!, $answerId: Int!) {
  createComment(body: $body, userId: $userId, answerId: $answerId) {
    id
    body
    user {
      name
      image
    }
    answer {
      body
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
    createdAt
    updatedAt
    blurDataURL
    choices {
      id
      name
    }
    user {
      name
      image
    }
  }
}
    `;
export const GetPostByIdDocument = gql`
    query GetPostByID($postId: Int!) {
  post(id: $postId) {
    id
    title
    body
    imgurl
    blurDataURL
    choices {
      id
      name
    }
    user {
      name
      image
    }
  }
}
    `;
export const GetAnswersByPostIdDocument = gql`
    query GetAnswersByPostId($postId: Int!) {
  answersByPostId(postId: $postId) {
    id
    body
    choice {
      name
    }
    user {
      name
      image
    }
  }
}
    `;
export const GetPostsByUserIdDocument = gql`
    query GetPostsByUserId($userId: String!) {
  postsByUserId(id: $userId) {
    id
    title
    body
    imgurl
    createdAt
    updatedAt
    blurDataURL
    choices {
      id
      name
    }
    user {
      name
      image
    }
  }
}
    `;
export const GetCommentsByAnswerIdDocument = gql`
    query GetCommentsByAnswerId($answerId: Int!) {
  commentsByAnswerId(id: $answerId) {
    id
    body
    userId
    user {
      id
      name
      email
      image
    }
    answerId
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
    CreateAnswer(variables: CreateAnswerMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateAnswerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAnswerMutation>(CreateAnswerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateAnswer', 'mutation');
    },
    CreateComment(variables: CreateCommentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCommentMutation>(CreateCommentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateComment', 'mutation');
    },
    GetPosts(variables?: GetPostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostsQuery>(GetPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPosts', 'query');
    },
    GetPostByID(variables: GetPostByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostByIdQuery>(GetPostByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPostByID', 'query');
    },
    GetAnswersByPostId(variables: GetAnswersByPostIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAnswersByPostIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAnswersByPostIdQuery>(GetAnswersByPostIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAnswersByPostId', 'query');
    },
    GetPostsByUserId(variables: GetPostsByUserIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPostsByUserIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostsByUserIdQuery>(GetPostsByUserIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPostsByUserId', 'query');
    },
    GetCommentsByAnswerId(variables: GetCommentsByAnswerIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCommentsByAnswerIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCommentsByAnswerIdQuery>(GetCommentsByAnswerIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCommentsByAnswerId', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;