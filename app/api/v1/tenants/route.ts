import prisma from "@/lib/db";


export async function GET(){
  try {
    const tenants = await prisma.tenant.findMany();
    return new Response(JSON.stringify(tenants), { status: 200 })
  } catch(error) {
    return new Response(error.message, { status: 500 })
  }
}
