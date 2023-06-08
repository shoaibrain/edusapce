"use client"
import { useSession, signOut } from "next-auth/react"

import { FC } from "react"

const Dashboard: FC<pageProps> = ({}) => {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hi {session?.user?.email}</p>
      <button
        onClick={() => {
          signOut()
        }}
      >
        Sign out
      </button>
    </div>
  )
}

export default Dashboard
