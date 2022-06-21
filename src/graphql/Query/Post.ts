import { objectType, extendType, stringArg, nonNull, arg, list, extendInputType } from 'nexus'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('title')
    t.nonNull.string('body')
    t.list.field('choices', {
      type: 'Choice',
      resolve(parent, _args, ctx) {
        return ctx.prisma.post.findUnique({ where: { id: parent.id } }).choices()
      },
    })
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
    t.nonNull.field('createPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
        choices: nonNull(list(nonNull('choiceInput'))),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.post.create({
          data: {
            title: args.title,
            body: args.body,
            choices: {
              create: args.choices,
            },
          },
        })
      },
    })
  },
})

export const choiceInput = extendInputType({
  type: 'choiceInput',
  definition(t) {
    t.nonNull.string('name')
  },
})