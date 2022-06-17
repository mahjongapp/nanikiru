import { useQuery, useMutation, UseMutationOptions } from 'react-query'
import { GraphQLClient, RequestDocument } from 'graphql-request'

export const useGQLQuery = (key: any, query: RequestDocument, variables: any, config = {}) => {
  const headers = {
    headers: {},
  }
  const graphQLClient = new GraphQLClient('/api/graphql', headers)
  const fetchData = async () => await graphQLClient.request(query, variables)

  return useQuery(key, fetchData, config)
}

export function useGQLMutation<T>(
  mutation: RequestDocument,
  options?: Omit<UseMutationOptions<any, unknown, T, unknown>, 'mutationFn'> | undefined,
) {
  const headers = {
    headers: {},
  }
  const graphQLClient = new GraphQLClient('/api/graphql', headers)
  async function fetchData<T>(data: T) {
    return await graphQLClient.request(mutation, data)
  }
  return useMutation(fetchData, options)
}
