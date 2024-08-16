import { User } from "next-auth"
import { JWT } from "next-auth/jwt"
import { Role } from '@prisma/client';
type UserId = string
type SchoolId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    schoolId?: SchoolId;
    role?: Role;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      schoolId?: SchoolId;
      role?: Role;
    }
  }
}
