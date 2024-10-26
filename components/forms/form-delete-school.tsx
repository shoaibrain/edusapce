"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangleIcon } from 'lucide-react'

export function DeleteSchool() {
  const [confirmText, setConfirmText] = useState('')
  const isDeleteDisabled = confirmText.toLowerCase() !== 'proceed'

  return (
    <Card className="overflow-hidden rounded-lg border border-red-200">
      <CardHeader className="border-b border-red-200 p-4">
      <CardTitle className="flex items-center text-red-500">
          <AlertTriangleIcon className="mr-2 size-5" />
          Danger Zone
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <p>
          Permanently delete your school account, all of your workspaces, links and their respective stats. This action cannot be
          undone - please proceed with caution.
        </p>
        <div className="space-y-2">
          <Label htmlFor="confirm-delete" className="text-sm font-medium">
            Type &quot;proceed&quot; to confirm deletion
          </Label>
          <Input
            id="confirm-delete"
            type="text"
            placeholder="Type 'proceed' to enable delete"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-6">
        <Button
          variant="destructive"
          className="rounded bg-red-500 px-4 py-2 font-semibold hover:bg-red-600"
          disabled={isDeleteDisabled}
        >
          Delete School
        </Button>
      </CardFooter>
    </Card>
  )
}
