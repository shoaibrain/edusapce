
import prisma from '@/lib/db';


export async function GET (req: Request) {

    try {
        const students = await prisma.student.findMany();
        return new Response(JSON.stringify(students))
      } catch (error) {
        return new Response(null, { status: 500 })
      }
}

export async function POST(req: Request){
   
}