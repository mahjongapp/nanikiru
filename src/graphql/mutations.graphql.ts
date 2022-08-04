import gql from 'graphql-tag'

export const CreatePost = gql`
  mutation CreatePost(
    $title: String!
    $body: String!
    $imgurl: String!
    $choices: [choiceInput!]!
    $userId: String!
  ) {
    createPost(title: $title, body: $body, imgurl: $imgurl, choices: $choices, userId: $userId) {
      id
      title
      body
      choices {
        id
        name
      }
    }
  }
`

export const choiceInput = gql`
  input choiceInput {
    name: String!
  }
`

export const CreateAnswer = gql`
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
`

export const CreateComment = gql`
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
`
