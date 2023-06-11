import bcrypt from "bcrypt"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request) {
  const body = await request.json()
  const { name, email, password } = body

  if (!name || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 })
  }

  const exist = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (exist) {
    throw new Error("Email already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
