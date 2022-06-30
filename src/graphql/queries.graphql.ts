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
    }
  }
`

export const GetAnswersByPostId = gql`
  query GetAnswersByPostId($postId: Int!) {
    answersByPostId(postId: $postId) {
      body
      choice {
        name
      }
    }
  }
`
