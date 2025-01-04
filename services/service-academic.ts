import prisma from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { Role } from "@prisma/client";

interface YearGradeLevelWithDetails {
  id: string;
  schoolId: string;
  levelName: string;
  description: string | null;
  levelCategory: string;
  levelOrder: number;
  capacity: number | null;
  classRoom: string | null;
  studentCount: number;
  classPeriods: {
    id: string;
    name: string;
    classType: string | null;
    description: string | null;
    startTime: Date;
    endTime: Date;
  }[];
}

const getYearGradeLevelById = async (
  id: string
): Promise<any> => {
  try {
    const yearGradeLevel = await prisma.yearGradeLevel.findUnique({
      where: { id },
      include: {
        classPeriods: true,
        _count: {
          select: {
            students: true,
          },
        },
      },
    });
    if (!yearGradeLevel) {
      return null;
    }

    const studentCount = yearGradeLevel._count.students;

    const { _count, ...yearGradeLevelData } = yearGradeLevel;

    return {
      yearGradeLevelData,
      studentCount,
    };
  } catch (error: any) {
    console.error(`Error retrieving year grade level: ${error.message}`, { id, error });
    throw new Error('Failed to get year grade level');
  }
};


export const getYearGradeLevel = withAuth(getYearGradeLevelById,[Role.SUPER_ADMIN, Role.SCHOOL_ADMIN, Role.PRINCIPAL, Role.TENANT_ADMIN]

);


function parseTimeStringToDate(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (
    Number.isInteger(hours) &&
    Number.isInteger(minutes) &&
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59
  ) {
    return new Date(1970, 0, 1, hours, minutes, 0);
  }
  throw new Error(`Invalid time format: ${timeStr}`);
}
interface ClassPeriodData {
  yearGradeLevelId: string;
  teacherId?: string;
  name: string;
  classType?: string;
  description?: string;
}

type RecurringScheduleInput = {
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
};

type OneTimeScheduleInput = {
  date: string;
  startTime: string;
  endTime: string;
};

type ScheduleData =
  | {
      type: "recurring";
      data: RecurringScheduleInput;
    }
  | {
      type: "one-time";
      data: OneTimeScheduleInput;
    };


    export async function createClassPeriod(
      classPeriodData: ClassPeriodData,
      scheduleData: ScheduleData
    ) {
      try {
        const result = await prisma.$transaction(async (prisma) => {
          // Create the ClassPeriod
          const classPeriod = await prisma.classPeriod.create({
            data: classPeriodData,
          });

          // Create the schedule(s)
          if (scheduleData.type === "recurring") {
            const { daysOfWeek, startTime, endTime, startDate, endDate } =
              scheduleData.data;

            // Convert times and dates
            const startTimeDate = parseTimeStringToDate(startTime); // Time on 1970-01-01
            const endTimeDate = parseTimeStringToDate(endTime);
            const startDateDate = new Date(startDate);
            const endDateDate = new Date(endDate);

            // Create the RecurringSchedule
            const recurringSchedule = await prisma.recurringSchedule.create({
              data: {
                classPeriodId: classPeriod.id,
                daysOfWeek,
                startTime: startTimeDate,
                endTime: endTimeDate,
                startDate: startDateDate,
                endDate: endDateDate,
              },
            });
            return { classPeriod, recurringSchedule };
          } else if (scheduleData.type === "one-time") {
            const { date, startTime, endTime } = scheduleData.data;

            // Convert times and dates
            const dateDate = new Date(date);
            const startTimeDate = parseTimeStringToDate(startTime);
            const endTimeDate = parseTimeStringToDate(endTime);

            // Create the OneTimeSchedule
            const oneTimeSchedule = await prisma.oneTimeSchedule.create({
              data: {
                classPeriodId: classPeriod.id,
                date: dateDate,
                startTime: startTimeDate,
                endTime: endTimeDate,
              },
            });
            return { classPeriod, oneTimeSchedule };
          } else {
            throw new Error("Invalid schedule type");
          }
        });

        console.log("Transaction Result:", result);
        return result;
      } catch (error) {
        console.error("Error in createClassPeriod:", error);
        throw error;
      }
    }
