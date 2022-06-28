import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'

export const Answer = objectType({
  name: 'Answer',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('body')
    t.nonNull.int('postId')
    t.field('post', {
      type: 'Post',
      resolve(parent, _args, ctx) {
        return ctx.prisma.answer.findUnique({ where: { id: parent.id } }).post()
      },
    })
    t.nonNull.int('choiceId')
    t.field('choice', {
      type: 'Choice',
      resolve(parent, _args, ctx) {
        return ctx.prisma.answer.findUnique({ where: { id: parent.id } }).choice()
      },
    })
  },
})

export const CreateAnswerMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createAnswer', {
      type: 'Answer',
      args: {
        body: nonNull(stringArg()),
        postId: nonNull(intArg()),
        choiceId: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.answer.create({
          data: {
            body: args.body,
            postId: args.postId,
            choiceId: args.choiceId,
          },
        })
      },
    })
  },
})
