import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";


export async function GET(){
  try {
    const tenants = await prisma.tenant.findMany();
    return new Response(JSON.stringify(tenants), { status: 200 })
  } catch(error) {
    return new Response(error.message, { status: 500 })
  }
}
