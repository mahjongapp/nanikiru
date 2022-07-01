import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.string('name')
    t.string('email')
    t.datetime('emailVerified')
    t.string('image')
    t.list.field('posts', {
      type: 'Post',
      resolve(parent, _args, ctx) {
        return ctx.prisma.user.findUnique({ where: { id: parent.id } }).posts()
      },
    })
  },
})
