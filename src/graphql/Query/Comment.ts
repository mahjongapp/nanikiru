import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('body')
    t.nonNull.string('userId')
    t.field('user', {
      type: 'User',
      resolve(parent, _args, ctx) {
        return ctx.prisma.comment.findUnique({ where: { id: parent.id } }).user()
      },
    })
    t.nonNull.int('answerId')
    t.field('answer', {
      type: 'Answer',
      resolve(parent, _args, ctx) {
        return ctx.prisma.comment.findUnique({ where: { id: parent.id } }).answer()
      },
    })
  },
})

export const CommentsByAnswerId = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('commentsByAnswerId', {
      type: 'Comment',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.answer
          .findUnique({
            where: {
              id: args.id,
            },
          })
          .comments({
            orderBy: {
              updatedAt: 'desc',
            },
          })
      },
    })
  },
})

export const CreateComment = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createComment', {
      type: 'Comment',
      args: {
        body: nonNull(stringArg()),
        userId: nonNull(stringArg()),
        answerId: nonNull(intArg()),
      },
      async resolve(_parent, args, ctx) {
        return ctx.prisma.comment.create({
          data: {
            body: args.body,
            userId: args.userId,
            answerId: args.answerId,
          },
        })
      },
    })
  },
})
