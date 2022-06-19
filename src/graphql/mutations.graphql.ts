import gql from 'graphql-tag'

export const CreatePost = gql`
  mutation CreatePost($title: String!, $body: String!, $choices: [choiceInput!]!) {
    createPost(title: $title, body: $body, choices: $choices) {
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
