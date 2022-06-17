import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../graphql/schema'
import { createContext } from '../../lib/context'
import Cors from 'micro-cors'

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
})

const cors = Cors()

export const config = {
  api: {
    bodyParser: false,
  },
}

const startServer = apolloServer.start()

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res)
})
