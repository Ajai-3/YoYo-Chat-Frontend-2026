import React from "react"
import { Search, UserPlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select } from "@/components/ui/select"

import type { UserStatusFilter, UserRoleFilter } from "../../types/adminTypes"

interface UserFiltersProps {
  searchQuery: string
  setSearchQuery: (val: string) => void
  statusFilter: UserStatusFilter
  setStatusFilter: (val: UserStatusFilter) => void
  roleFilter: UserRoleFilter
  setRoleFilter: (val: UserRoleFilter) => void
  onAddClick: () => void
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
  onAddClick
}) => {
  return (
    <Card className="bg-card/40 border border-border/85 backdrop-blur-md shadow-lg relative z-30">
      <CardContent className="p-2 md:p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 flex-col md:flex-row gap-3 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search profiles by name, email..."
              className="pl-9 bg-card/25 border-border text-foreground dark:bg-[#1a1a1e] dark:border-border/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: "all", label: "All Statuses" },
                { value: "active", label: "Active" },
                { value: "suspended", label: "Suspended" },
                { value: "banned", label: "Banned" },
                { value: "deleted", label: "Deleted" }
              ]}
            />

            <Select
              value={roleFilter}
              onChange={setRoleFilter}
              options={[
                { value: "all", label: "All Roles" },
                { value: "user", label: "User" },
                { value: "moderator", label: "Moderator" },
                { value: "admin", label: "Admin" }
              ]}
            />
          </div>
        </div>

        <Button
          onClick={onAddClick}
          className="w-full md:w-auto bg-brand hover:bg-brand/90 text-brand-foreground flex gap-2 items-center"
        >
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </CardContent>
    </Card>
  )
}
