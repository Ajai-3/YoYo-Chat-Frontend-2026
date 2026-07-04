import React from "react"
import { Shield, ShieldAlert } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { AdminUser } from "../../data/mockAdminData"

interface UserTableProps {
  loading: boolean
  paginatedUsers: AdminUser[]
  filteredUsersCount: number
  currentPage: number
  totalPages: number
  itemsPerPage: number
  actionLoadingId: string | null
  onEditRoleClick: (user: AdminUser) => void
  onStatusActionClick: (user: AdminUser, action: "activate" | "suspend" | "ban") => void
  onPrevPage: () => void
  onNextPage: () => void
}

export const UserTable: React.FC<UserTableProps> = ({
  loading,
  paginatedUsers,
  filteredUsersCount,
  currentPage,
  totalPages,
  itemsPerPage,
  actionLoadingId,
  onEditRoleClick,
  onStatusActionClick,
  onPrevPage,
  onNextPage
}) => {
  return (
    <Card className="bg-card/30 border-border/80 backdrop-blur-md shadow-xl overflow-hidden">
      <CardHeader className="border-b border-border/50 bg-card/44 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-xl font-bold">Accounts Console Directory</CardTitle>
            <CardDescription>
              Assign moderation permissions, suspend temporarily, or permanently ban accounts
            </CardDescription>
          </div>
          <span className="text-xs font-semibold bg-brand/10 text-brand px-3 py-1 rounded-full border border-brand/20 whitespace-nowrap shrink-0 w-fit">
            {filteredUsersCount} total
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
            <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-medium">Loading user list...</p>
          </div>
        ) : paginatedUsers.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <ShieldAlert className="h-12 w-12 mx-auto mb-4 text-muted-foreground/60" />
            <p className="font-semibold text-lg">No accounts match query</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-card/20 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="p-4 pl-6 w-12">No.</th>
                    <th className="p-4">User Profile</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Security Status</th>
                    <th className="p-4">Joined Date</th>
                    <th className="p-4 text-right pr-6">Manage Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {paginatedUsers.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className={`hover:bg-card/45 transition-colors duration-200 ${
                        user.status === "banned" ? "bg-red-500/5 text-muted-foreground" : 
                        user.status === "suspended" ? "bg-amber-500/5 text-muted-foreground" : 
                        user.status === "deleted" ? "bg-muted/10 opacity-70" : ""
                      }`}
                    >
                      <td className="p-4 pl-6 text-sm font-mono text-muted-foreground">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                              alt={user.fullName}
                              className="h-10 w-10 rounded-full border border-border bg-card object-cover"
                            />
                            {user.isOnline && user.status === "active" && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" title="Online" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">{user.fullName}</p>
                            <p className="text-xs text-muted-foreground">@{user.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-mono">{user.email}</td>
                      <td className="p-4">
                        <button
                          onClick={() => onEditRoleClick(user)}
                          disabled={actionLoadingId === user.id || user.status === "deleted"}
                          className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded bg-card hover:bg-accent border border-border transition-all disabled:opacity-50"
                        >
                          <Shield className="h-3.5 w-3.5 text-brand" />
                          <span className="capitalize">{user.role}</span>
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-0.5">
                          <span 
                            className={`text-[10px] w-fit font-extrabold px-2 py-0.5 rounded-full border uppercase ${
                              user.status === "active"
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                : user.status === "suspended"
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                : user.status === "banned"
                                ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                                : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                            }`}
                          >
                            {user.status}
                          </span>
                          {user.status === "suspended" && user.suspendedUntil && (
                            <span className="text-[10px] font-mono text-muted-foreground mt-0.5">
                              Until: {user.suspendedUntil}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground font-mono">{user.joinedDate}</td>
                      <td className="p-4 text-right pr-6">
                        <div className="flex justify-end gap-2">
                          {user.status === "deleted" ? (
                            <span className="text-xs text-muted-foreground italic pr-4">Self-deleted</span>
                          ) : (
                            <>
                              {user.status !== "active" ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => onStatusActionClick(user, "activate")}
                                  disabled={actionLoadingId === user.id}
                                  className="text-xs font-semibold h-8 rounded-lg border border-emerald-500/30 text-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10"
                                >
                                  Activate
                                </Button>
                              ) : (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onStatusActionClick(user, "suspend")}
                                    disabled={actionLoadingId === user.id}
                                    className="text-xs font-semibold h-8 rounded-lg border border-amber-500/30 text-amber-500 bg-amber-500/5 hover:bg-amber-500/10"
                                  >
                                    Suspend
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onStatusActionClick(user, "ban")}
                                    disabled={actionLoadingId === user.id}
                                    className="text-xs font-semibold h-8 rounded-lg border border-rose-500/30 text-rose-500 bg-rose-500/5 hover:bg-rose-500/10"
                                  >
                                    Ban
                                  </Button>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
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
