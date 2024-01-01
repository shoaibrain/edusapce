import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function SchoolCard({school}){

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {school.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            {`
              ${school.address}
              ${school.email}
              ${school.phone}
            `}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
