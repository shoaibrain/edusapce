
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function TenantNotificationPreference() {
  return (
    <main className="flex w-full flex-col items-center px-4 py-8 md:px-8">
      <h1 className="text-3xl font-bold mb-6">Notification Preferences</h1>
      <p> Note: These settings are not developed yet </p>
      <Card className="w-full max-w-md mb-8">
        <CardHeader className="pb-4">
          <CardTitle>Email Settings</CardTitle>
          <CardDescription>Customize your email preferences.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center">
            <div className="space-y-1">
              <Label className="text-sm font-medium leading-none" htmlFor="newsletter">
                Newsletter Subscription
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive our weekly newsletter.</p>
            </div>
            <Switch className="ml-auto" defaultChecked id="newsletter" />
          </div>
          <div className="flex items-center">
            <div className="space-y-1">
              <Label className="text-sm font-medium leading-none" htmlFor="updates">
                Product Updates
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about new features and updates.</p>
            </div>
            <Switch className="ml-auto" id="updates" />
          </div>
          <div className="flex items-center">
            <div className="space-y-1">
              <Label className="text-sm font-medium leading-none" htmlFor="promotions">
                Promotions
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive special offers and promotions.</p>
            </div>
            <Switch className="ml-auto" id="promotions" />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md mb-8">
        <CardHeader className="pb-4">
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage your notification preferences.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center">
            <div className="space-y-1">
              <Label className="text-sm font-medium leading-none" htmlFor="push">
                Push Notifications
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications on your device.</p>
            </div>
            <Switch className="ml-auto" defaultChecked id="push" />
          </div>
          <div className="flex items-center">
            <div className="space-y-1">
              <Label className="text-sm font-medium leading-none" htmlFor="sms">
                SMS Notifications
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive SMS notifications on your phone.</p>
            </div>
            <Switch className="ml-auto" id="sms" />
          </div>
          <div className="flex items-center">
            <div className="space-y-1">
              <Label className="text-sm font-medium leading-none" htmlFor="desktop">
                Desktop Notifications
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive desktop notifications when you are online.
              </p>
            </div>
            <Switch className="ml-auto" id="desktop" />
          </div>
        </CardContent>
      </Card>
      <Button className="w-full max-w-md">Update</Button>
    </main>
  )
}

