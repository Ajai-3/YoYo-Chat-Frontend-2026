import React from "react"
import { ShieldAlert, Globe, Lock, Users } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { AdminGroup } from "../../data/mockAdminData"

interface GroupTableProps {
  loading: boolean
  paginatedGroups: AdminGroup[]
  filteredGroupsCount: number
  currentPage: number
  totalPages: number
  itemsPerPage: number
  actionLoadingId: string | null
  onToggleRestriction: (group: AdminGroup) => void
  onPrevPage: () => void
  onNextPage: () => void
}

export const GroupTable: React.FC<GroupTableProps> = ({
  loading,
  paginatedGroups,
  filteredGroupsCount,
  currentPage,
  totalPages,
  itemsPerPage,
  actionLoadingId,
  onToggleRestriction,
  onPrevPage,
  onNextPage
}) => {
  return (
    <Card className="bg-card/30 border-border/80 backdrop-blur-md shadow-xl overflow-hidden">
      <CardHeader className="border-b border-border/50 bg-card/40 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-xl font-bold">Groups Database Management</CardTitle>
            <CardDescription>
              Moderate groups, review privacy levels, and restrict access
            </CardDescription>
          </div>
          <span className="text-xs font-semibold bg-brand/10 text-brand px-3 py-1 rounded-full border border-brand/20 whitespace-nowrap shrink-0 w-fit">
            {filteredGroupsCount} groups
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
            <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-medium">Fetching secure groups directory...</p>
          </div>
        ) : paginatedGroups.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <ShieldAlert className="h-12 w-12 mx-auto mb-4 text-muted-foreground/60" />
            <p className="font-semibold text-lg">No groups found</p>
            <p className="text-sm mt-1">Change filters or try another search term.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-card/20 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="p-4 pl-6 w-12">No.</th>
                    <th className="p-4">Group Info</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Members</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Created Date</th>
                    <th className="p-4 text-right pr-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {paginatedGroups.map((group, index) => (
                    <tr 
                      key={group.id}
                      className={`hover:bg-card/40 transition-colors duration-200 ${group.status === "restricted" ? "bg-amber-500/5 text-muted-foreground" : ""}`}
                    >
                      <td className="p-4 pl-6 text-sm font-mono text-muted-foreground">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center font-bold text-brand text-sm">
                            {group.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">{group.name}</p>
                            <p className="text-xs text-muted-foreground">ID: {group.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1.5 text-sm text-foreground font-medium">
                          {group.type === "public" ? (
                            <>
                              <Globe className="h-4 w-4 text-emerald-500" />
                              <span>Public</span>
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4 text-indigo-500" />
                              <span>Private</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-semibold">
                        <div className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{group.membersCount} members</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span 
                          className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                            group.status === "active"
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          }`}
                        >
                          {group.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground font-mono">{group.createdDate}</td>
                      <td className="p-4 text-right pr-6">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onToggleRestriction(group)}
                          disabled={actionLoadingId === group.id}
                          className={`text-xs font-semibold h-8 rounded-lg border transition-all ${
                            group.status === "active"
                              ? "border-amber-500/30 hover:border-amber-500 text-amber-500 bg-amber-500/5 hover:bg-amber-500/10"
                              : "border-emerald-500/30 hover:border-emerald-500 text-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10"
                          }`}
                        >
                          {group.status === "active" ? "Restrict Access" : "Restore Group"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-border flex items-center justify-between bg-card/10">
                <span className="text-xs text-muted-foreground">
                  Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
                  <span className="font-semibold text-foreground">{totalPages}</span>
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onPrevPage}
                    disabled={currentPage === 1}
                    className="text-xs h-8 border-border"
                  >
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onNextPage}
                    disabled={currentPage === totalPages}
                    className="text-xs h-8 border-border"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
