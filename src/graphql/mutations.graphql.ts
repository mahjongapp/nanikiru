import gql from 'graphql-tag'

export const CreatePost = gql`
  mutation CreatePost(
    $title: String!
    $body: String!
    $imgurl: String!
    $choices: [choiceInput!]!
  ) {
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
`

export const choiceInput = gql`
  input choiceInput {
    name: String!
  }
`

export const CreateAnswer = gql`
  mutation CreateAnswer($body: String!, $postId: Int!, $choiceId: Int!) {
    createAnswer(body: $body, postId: $postId, choiceId: $choiceId) {
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
