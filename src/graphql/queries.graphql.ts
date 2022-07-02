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
`

export const GetPostById = gql`
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
`

export const GetAnswersByPostId = gql`
  query GetAnswersByPostId($postId: Int!) {
    answersByPostId(postId: $postId) {
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
