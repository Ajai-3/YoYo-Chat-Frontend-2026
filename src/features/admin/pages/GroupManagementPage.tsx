import React, { useState, useEffect, useCallback } from "react"
import { useToast } from "@/context/ToastContext"
import { ConfirmationModal } from "../components/ConfirmationModal"
import { apiSimulate } from "../data/mockAdminData"
import type { AdminGroup, GroupTypeFilter, GroupStatusFilter } from "../types/adminTypes"
import { GroupFilters } from "../components/group-management/GroupFilters"
import { GroupTable } from "../components/group-management/GroupTable"

export const GroupManagementPage: React.FC = () => {
  const { toast } = useToast()
  const [groups, setGroups] = useState<AdminGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<GroupTypeFilter>("all")
  const [statusFilter, setStatusFilter] = useState<GroupStatusFilter>("all")
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Confirmation state
  const [pendingActionGroup, setPendingActionGroup] = useState<AdminGroup | null>(null)
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)

  const loadGroups = useCallback(async () => {
    setLoading(true)
    try {
      const data = await apiSimulate.fetchAdminGroups()
      setGroups(data)
    } catch {
      toast("Failed to load channels directory", "error")
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  const handleToggleGroupRestriction = async () => {
    if (!pendingActionGroup) return
    const targetId = pendingActionGroup.id
    const newStatus = pendingActionGroup.status === "active" ? "restricted" : "active"
    
    setActionLoadingId(targetId)
    setPendingActionGroup(null)
    
    try {
      const updated = await apiSimulate.updateGroupStatus(targetId, newStatus)
      setGroups(groups.map(g => g.id === targetId ? updated : g))
      toast(`Group "${updated.name}" is now ${newStatus}`, "success")
    } catch {
      toast("Failed to update group status", "error")
    } finally {
      setActionLoadingId(null)
    }
  }

  // Filter groups
  const filteredGroups = groups.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || g.type === typeFilter
    const matchesStatus = statusFilter === "all" || g.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  // Pagination calculation
  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage)
  const paginatedGroups = filteredGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSearchQueryChange = (val: string) => {
    setSearchQuery(val)
    setCurrentPage(1)
  }

  const handleTypeFilterChange = (val: GroupTypeFilter) => {
    setTypeFilter(val)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (val: GroupStatusFilter) => {
    setStatusFilter(val)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <GroupFilters
        searchQuery={searchQuery}
        setSearchQuery={handleSearchQueryChange}
        typeFilter={typeFilter}
        setTypeFilter={handleTypeFilterChange}
        statusFilter={statusFilter}
        setStatusFilter={handleStatusFilterChange}
      />

      {/* Table Container */}
      <GroupTable
        loading={loading}
        paginatedGroups={paginatedGroups}
        filteredGroupsCount={filteredGroups.length}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        actionLoadingId={actionLoadingId}
        onToggleRestriction={setPendingActionGroup}
        onPrevPage={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        onNextPage={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={pendingActionGroup !== null}
        title={pendingActionGroup?.status === "active" ? "Restrict Chat Room" : "Restore Chat Room"}
        message={
          pendingActionGroup?.status === "active"
            ? `Are you sure you want to restrict the group "${pendingActionGroup.name}"? Restricted groups are locked, preventing active chat rooms or notifications.`
            : `Are you sure you want to restore the group "${pendingActionGroup?.name}"? Users will be able to access the room and chat again.`
        }
        variant={pendingActionGroup?.status === "active" ? "warning" : "success"}
        confirmText={pendingActionGroup?.status === "active" ? "Restrict Room" : "Restore Access"}
        onConfirm={handleToggleGroupRestriction}
        onCancel={() => setPendingActionGroup(null)}
      />
    </div>
  )
}
