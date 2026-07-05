import React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select } from "@/components/ui/select"

import type { GroupTypeFilter, GroupStatusFilter } from "../../types/adminTypes"

interface GroupFiltersProps {
  searchQuery: string
  setSearchQuery: (val: string) => void
  typeFilter: GroupTypeFilter
  setTypeFilter: (val: GroupTypeFilter) => void
  statusFilter: GroupStatusFilter
  setStatusFilter: (val: GroupStatusFilter) => void
}

export const GroupFilters: React.FC<GroupFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter
}) => {
  return (
    <Card className="bg-card/40 border border-border/85 backdrop-blur-md shadow-lg relative z-30">
      <CardContent className="p-2 md:p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups by name..."
            className="pl-9 bg-card/20 border-border text-foreground dark:bg-[#1a1a1e] dark:border-border/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Select
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: "all", label: "All Types" },
              { value: "public", label: "Public" },
              { value: "private", label: "Private" }
            ]}
          />

          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "All Access" },
              { value: "active", label: "Active" },
              { value: "restricted", label: "Restricted" }
            ]}
          />
        </div>
      </CardContent>
    </Card>
  )
}
