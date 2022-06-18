import gql from 'graphql-tag'

export const CreatePost = gql`
  mutation CreatePost($title: String!, $body: String!) {
    createPost(title: $title, body: $body) {
      id
      title
      body
    }
  }
`
