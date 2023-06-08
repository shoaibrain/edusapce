import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { User } from "@/components/user"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1>Home</h1>
      <h1>Server Side rendered</h1>
      <pre> {JSON.stringify(session)}</pre>
      <h1>Cient side render</h1>
      <User />
    </section>
  )
}
