import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string
type SchoolId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    schoolId?: SchoolId;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      schoolId?: SchoolId;
    }
  }
}
