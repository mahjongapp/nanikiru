import gql from 'graphql-tag'

export const GetPosts = gql`
  query GetPosts {
    posts {
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
