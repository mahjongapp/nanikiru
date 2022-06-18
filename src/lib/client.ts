import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../../generated/graphql'

const API_ROOT = '/api/graphql'

const client = getSdk(new GraphQLClient(API_ROOT))

export default client
