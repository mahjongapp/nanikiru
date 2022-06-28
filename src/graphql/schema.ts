import { queryType, makeSchema } from 'nexus'
import path from 'path'
import { Post, PostQuery, PostsQuery, CreatePostMutation, choiceInput } from './Query/Post'
import { Choice } from './Query/Choice'
import { Answer, CreateAnswerMutation } from './Query/Answer'

const Query = queryType({
  definition(t) {
    t.string('hello', { resolve: () => 'hello world' })
  },
})

export const schema = makeSchema({
  types: [
    Answer,
    Query,
    Post,
    CreateAnswerMutation,
    PostQuery,
    PostsQuery,
    CreatePostMutation,
    Choice,
    choiceInput,
  ],
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
