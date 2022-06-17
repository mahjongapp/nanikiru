import { queryType, makeSchema } from 'nexus'
import path from 'path'
import { Post, PostsQuery, CreatePostMutation } from './Query/Post'

const Query = queryType({
  definition(t) {
    t.string('hello', { resolve: () => 'hello world' })
  },
})

export const schema = makeSchema({
  types: [Query, Post, PostsQuery, CreatePostMutation],
  outputs: {
    typegen: path.join(process.cwd(), 'generated', 'nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated', 'schema.graphql'),
  },
  contextType: {
    module: path.join(process.cwd(), 'src', 'lib', 'context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
