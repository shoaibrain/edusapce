import NextAuth, { NextAuthOptions } from "next-auth"
import prisma from "@/lib/db"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text"},
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // check credential exists
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Please enter your email and password")
        }
        //check user exists
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        // if no user found
        if (!user || !user?.hashedPassword) {
          throw new Error("No user found")
        }
        // check password match
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        if (!passwordMatch) {
          // if password not match
          throw new Error("Incorrect password")
        }
        return user
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
