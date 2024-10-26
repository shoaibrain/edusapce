import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EmployeeDetailsLoading() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle><Skeleton className="h-6 w-40" /></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Skeleton className="h-5 w-24 mb-2" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-6 w-16" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-9 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="mt-6">
        <TabsList>
          <TabsTrigger value="details"><Skeleton className="h-5 w-28" /></TabsTrigger>
          <TabsTrigger value="communications"><Skeleton className="h-5 w-32" /></TabsTrigger>
          <TabsTrigger value="notifications"><Skeleton className="h-5 w-28" /></TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle><Skeleton className="h-6 w-48" /></CardTitle>
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="text-right space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
