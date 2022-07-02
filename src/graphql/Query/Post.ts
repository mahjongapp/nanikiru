import {
  objectType,
  extendType,
  stringArg,
  nonNull,
  arg,
  list,
  extendInputType,
  intArg,
} from 'nexus'
import { getPlaiceholder } from 'plaiceholder'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('title')
    t.nonNull.string('body')
    t.nonNull.string('imgurl')
    t.nonNull.datetime('createdAt')
    t.nonNull.datetime('updatedAt')
    t.string('blurDataURL')
    t.list.field('choices', {
      type: 'Choice',
      resolve(parent, _args, ctx) {
        return ctx.prisma.post.findUnique({ where: { id: parent.id } }).choices()
      },
    })
    t.nonNull.string('userId')
    t.field('user', {
      type: 'User',
      resolve(parent, _args, ctx) {
        return ctx.prisma.post.findUnique({ where: { id: parent.id } }).user()
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
        return ctx.prisma.post.findMany({
          orderBy: {
            updatedAt: 'desc',
          },
        })
      },
    })
  },
})

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('post', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      // @ts-ignore
      resolve(_parent, args, ctx) {
        return ctx.prisma.post.findUnique({
          where: {
            id: args.id,
          },
        })
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
        imgurl: nonNull(stringArg()),
        choices: nonNull(list(nonNull('choiceInput'))),
        userId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const { base64 } = await getPlaiceholder(args.imgurl, { size: 10 })
        console.log(base64)
        return ctx.prisma.post.create({
          data: {
            title: args.title,
            body: args.body,
            imgurl: args.imgurl,
            choices: {
              create: args.choices,
            },
            answers: {
              create: [],
            },
            userId: args.userId,
            blurDataURL: base64,
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
