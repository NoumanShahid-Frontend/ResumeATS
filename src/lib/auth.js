import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password required')
          }
          
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })
          
          if (!user) {
            throw new Error('No user found with this email')
          }
          
          if (!user.password) {
            throw new Error('Please sign in with Google')
          }
          
          const isValid = await bcrypt.compare(credentials.password, user.password)
          if (!isValid) {
            throw new Error('Invalid password')
          }
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            subscriptionTier: user.subscriptionTier || 'FREE'
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '991791678701-22o7vtbaivcjb1e31d55ags86b2fe8dv.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  session: { 
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.subscriptionTier = user.subscriptionTier || 'FREE'
        token.id = user.id
      }
      if (account?.provider === 'google') {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id || token.sub
        session.user.subscriptionTier = token.subscriptionTier || 'FREE'
        session.accessToken = token.accessToken
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
          })
          
          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                subscriptionTier: 'FREE'
              }
            })
          }
        } catch (error) {
          console.error('Google sign-in error:', error)
          return false
        }
      }
      return true
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
}

export default NextAuth(authOptions)