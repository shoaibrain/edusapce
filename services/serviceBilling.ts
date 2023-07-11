
import prisma from '@/lib/db';

export async function getFeeChart(){
  return await prisma.classFee.findMany({
    orderBy: {
      classGrade: 'asc'
    }
  });
}


export async function getFeeChartById(classGrade: string) {
  return await prisma.classFee.findFirst({
    where: {
      classGrade: classGrade
    }
  });
}
