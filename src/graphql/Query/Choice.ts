import { objectType } from 'nexus'

export const Choice = objectType({
  name: 'Choice',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.field('post', {
      type: 'Post',
      resolve(parent, _args, ctx) {
        return ctx.prisma.choice.findUnique({ where: { id: parent.id } }).post()
      },
    })
  },
})
