import gql from 'graphql-tag'

export const GetPosts = gql`
  query GetPosts {
    posts {
      id
      title
      body
      imgurl
      createdAt
      updatedAt
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
`

export const GetPostById = gql`
  query GetPostByID($postId: Int!) {
    post(id: $postId) {
      id
      title
      body
      imgurl
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
`

export const GetAnswersByPostId = gql`
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
`

export const GetPostByUserId = gql`
  query GetPostsByUserId($userId: String!) {
    postsByUserId(id: $userId) {
      id
      title
      body
      imgurl
      createdAt
      updatedAt
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
`

export const GetCommentsByAnswerId = gql`
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
`
