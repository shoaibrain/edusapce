import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import prisma from "./db"
import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
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
          const tenant = await prisma.tenant.findUnique({
            where: { email: credentials.email },
          })
          if (!tenant || !tenant?.hashedPassword) {
            throw new Error("No tenant found")
          }
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            tenant.hashedPassword
          )
          if (!passwordMatch) {
            throw new Error("Incorrect password")
          }
          return tenant
        },
      })
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.schoolId = token.schoolId

      }

      return session
    },

    // TODO: add schoolId to token?
    async jwt({ token, user }) {
      const dbUser = await prisma.tenant.findFirst({
        where: {
          email: token.email || "",
        }
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      const updatedToken = {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };

      return Promise.resolve(updatedToken);

    },
  },
}
