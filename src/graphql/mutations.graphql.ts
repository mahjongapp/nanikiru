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
