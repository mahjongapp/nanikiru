import { objectType, extendType, stringArg, nonNull } from 'nexus'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('title')
    t.nonNull.string('body')
  },
})

export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('posts', {
      type: 'Post',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.post.findMany()
      },
    })
  },
})

export const CreatePostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createTask', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.post.create({
          data: {
            title: args.title,
            body: args.body,
          },
        })
      },
    })
  },
})
