"use client"

import { Book, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { ClassPeriodAdd } from "./forms/form-class-periods-add";

interface ClassPeriod {
  id: string;
  name: string;
  classType: string;
  description: string;
  startTime: string;
  endTime: string;
}
export default function ClassPeriodCard({classPeriods, existingDepartments, yearGradeLevelId}){

  return (
    <div className="flex-1">
      <Card>
        <CardHeader>
          <CardTitle>Class Periods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {classPeriods.map((classPeriod, index) => (
              <div key={index} className="flex flex-col rounded-lg p-4 shadow">
                <div className="mb-2 flex items-center">
                  <Book className="mr-3 size-6 text-primary" />
                  <span className="font-medium">{classPeriod.name}</span>
                </div>
              </div>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex h-full items-center justify-center">
                  <Plus className="mr-2 size-4" /> Class Period
                </Button>
              </DialogTrigger>
              <ClassPeriodAdd existingDepartments={existingDepartments} gradeLevelId={yearGradeLevelId} />
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
