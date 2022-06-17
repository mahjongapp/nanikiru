import gql from 'graphql-tag'

export const GetPosts = gql`
  query {
    posts {
      id
      title
      body
    }
  }
`
