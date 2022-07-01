import { prisma } from '../../../lib/prisma'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      })
    },
  },
})

declare module 'next-auth' {
  interface Session {
    user: User | JWT
  }

  interface User extends DefaultUser {
    id?: string | null
  }
}
