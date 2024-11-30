import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ClassPeriod {
  id: string
  name: string
  classType?: string
  description?: string
}

interface ClassPeriodListProps {
  classPeriods: ClassPeriod[]
}

export function ClassPeriodList({ classPeriods }: ClassPeriodListProps) {
  const dummyClassPeriods: ClassPeriod[] = [
    { id: "1", name: "Morning Session", classType: "Regular", description: "Main morning class" },
    { id: "2", name: "Afternoon Session", classType: "Regular", description: "Main afternoon class" },
    { id: "3", name: "Special Session", classType: "Remedial", description: "Extra help for students" },
  ]

  const displayClassPeriods = classPeriods.length > 0 ? classPeriods : dummyClassPeriods

  return (
    <div className="space-y-4">
      {displayClassPeriods.map((period) => (
        <Card key={period.id}>
          <CardHeader>
            <CardTitle>{period.name}</CardTitle>
            <CardDescription>{period.classType}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{period.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

