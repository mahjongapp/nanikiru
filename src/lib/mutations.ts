import gql from 'graphql-tag'

export const CreatePost = gql`
  mutation Mutation($title: String!, $body: String!) {
    createTask(title: $title, body: $body) {
      id
      title
      body
    }
  }
`
