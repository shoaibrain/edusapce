// @ts-nocheck
"use client";

import { Card, CardContent, CardHeader } from "../ui/card";

interface SchoolGeneralSettingsFormProps extends React.HTMLAttributes<HTMLFormElement> {
  schoolAcademics: schoolAcademics;
}

export function SchoolAcademicSettingsForm({
  schoolAcademics,
  ...props
 }) {
  console.log(JSON.stringify(schoolAcademics));

  if (!schoolAcademics || !schoolAcademics.yearGradeLevels?.length) {
    return <p>No academic details found for this school.</p>;
  }

  const yearGradeLevelCards = schoolAcademics.yearGradeLevels.map((yearGradeLevel) => (
    <Card key={yearGradeLevel.id}>
      <CardHeader title={yearGradeLevel.name} />
      <CardContent>
        <p>Level Category: {yearGradeLevel.levelCategory}</p>
        <p>Level Order: {yearGradeLevel.levelOrder}</p>
        {yearGradeLevel.capacity && <p>Capacity: {yearGradeLevel.capacity}</p>}
        {yearGradeLevel.classRoom && <p>Classroom: {yearGradeLevel.classRoom}</p>}
        {yearGradeLevel.description && (
          <p>Description: {yearGradeLevel.description}</p>
        )}
      </CardContent>
    </Card>
  ));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {yearGradeLevelCards}
    </div>
  );
}
