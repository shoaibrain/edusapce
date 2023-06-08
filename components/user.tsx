'use client'

import { FC } from "react"
import { useSession } from "next-auth/react"

export function User() {
  const { data: session } = useSession()
  return <div>{JSON.stringify(session)}</div>
}
