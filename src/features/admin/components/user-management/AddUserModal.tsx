import React from "react"
import { X } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import type { UserRole } from "../../types/adminTypes"

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  newUsername: string
  setNewUsername: (val: string) => void
  newFullName: string
  setNewFullName: (val: string) => void
  newEmail: string
  setNewEmail: (val: string) => void
  newRole: UserRole
  setNewRole: (val: UserRole) => void
  submittingUser: boolean
  onSubmit: (e: React.FormEvent) => void
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  newUsername,
  setNewUsername,
  newFullName,
  setNewFullName,
  newEmail,
  setNewEmail,
  newRole,
  setNewRole,
  submittingUser,
  onSubmit
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md bg-card border-border/80 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
        <CardHeader>
          <CardTitle>Register New Account</CardTitle>
          <CardDescription>
            Manually record credentials directly into the database console
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="newUsername">Username</Label>
              <Input
                id="newUsername"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="e.g. iron_man"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="newFullName">Full Name</Label>
              <Input
                id="newFullName"
                value={newFullName}
                onChange={(e) => setNewFullName(e.target.value)}
                placeholder="e.g. Tony Stark"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="newEmail">Email Address</Label>
              <Input
                id="newEmail"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="e.g. tony@stark.com"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="newRole">System Authorization Role</Label>
              <Select
                value={newRole}
                onChange={setNewRole}
                options={[
                  { value: "user", label: "User" },
                  { value: "moderator", label: "Moderator" },
                  { value: "admin", label: "Admin" }
                ]}
                className="w-full md:w-full"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={submittingUser} className="bg-brand text-brand-foreground">
                {submittingUser ? "Creating..." : "Confirm Create"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
