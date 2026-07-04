import React, { useState, useEffect, useCallback } from "react"
import { useToast } from "@/context/ToastContext"
import { apiSimulate } from "../data/mockAdminData"
import type { AdminUser, UserStatusFilter, UserRoleFilter } from "../types/adminTypes"
import { UserFilters } from "../components/user-management/UserFilters"
import { UserTable } from "../components/user-management/UserTable"
import { AddUserModal } from "../components/user-management/AddUserModal"
import { EditRoleModal } from "../components/user-management/EditRoleModal"
import { SuspensionModal } from "../components/user-management/SuspensionModal"

export const UserManagementPage: React.FC = () => {
  const { toast } = useToast()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<UserStatusFilter>("all")
  const [roleFilter, setRoleFilter] = useState<UserRoleFilter>("all")
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  
  // Confirmation state
  const [pendingAction, setPendingAction] = useState<{
    user: AdminUser
    action: "activate" | "suspend" | "ban"
  } | null>(null)
  
  // Custom suspension duration variables
  const [suspensionDuration, setSuspensionDuration] = useState("1 hour")
  const [customSuspensionDate, setCustomSuspensionDate] = useState("")

  // Form states
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditRoleModal, setShowEditRoleModal] = useState<AdminUser | null>(null)
  
  const [newUsername, setNewUsername] = useState("")
  const [newFullName, setNewFullName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newRole, setNewRole] = useState<"user" | "moderator" | "admin">("user")
  const [submittingUser, setSubmittingUser] = useState(false)

  const loadUsers = useCallback(async () => {
    setLoading(true)
    try {
      const data = await apiSimulate.fetchAdminUsers()
      setUsers(data)
    } catch {
      toast("Failed to load secure database directory", "error")
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const executeStatusChange = async () => {
    if (!pendingAction) return
    const { user, action } = pendingAction
    setActionLoadingId(user.id)
    setPendingAction(null)

    let finalStatus: "active" | "suspended" | "banned" = "active"
    let suspendInfo: string | undefined = undefined

    if (action === "suspend") {
      finalStatus = "suspended"
      suspendInfo = suspensionDuration === "custom" ? customSuspensionDate : suspensionDuration
    } else if (action === "ban") {
      finalStatus = "banned"
    }

    try {
      const updated = await apiSimulate.updateUserStatus(user.id, finalStatus, suspendInfo)
      setUsers(users.map((u) => (u.id === user.id ? updated : u)))
      toast(`User @${updated.username} is now ${finalStatus}`, "success")
    } catch {
      toast("Failed to update user security status", "error")
    } finally {
      setActionLoadingId(null)
    }
  }

  const handleRoleChange = async (userId: string, newRole: "user" | "moderator" | "admin") => {
    if (!showEditRoleModal) return
    setActionLoadingId(userId)
    try {
      const updated = await apiSimulate.updateUserRole(userId, newRole)
      setUsers(users.map((u) => (u.id === userId ? updated : u)))
      toast(`User ${updated.username} authorization updated to ${newRole}`, "success")
      setShowEditRoleModal(null)
    } catch {
      toast("Failed to adjust authorization levels", "error")
    } finally {
      setActionLoadingId(null)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUsername || !newFullName || !newEmail) {
      toast("Fill in all credentials fields", "error")
      return
    }

    setSubmittingUser(true)
    try {
      const created = await apiSimulate.createUser({
        username: newUsername,
        fullName: newFullName,
        email: newEmail,
        role: newRole,
        status: "active",
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${newUsername}`,
      })
      setUsers([created, ...users])
      toast(`Registered user @${created.username} successfully`, "success")
      
      // Clear forms
      setNewUsername("")
      setNewFullName("")
      setNewEmail("")
      setNewRole("user")
      setShowAddModal(false)
    } catch {
      toast("Failed to register new user", "error")
    } finally {
      setSubmittingUser(false)
    }
  }

  // Filters logic
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  // Pagination calculation
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSearchQueryChange = (val: string) => {
    setSearchQuery(val)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (val: UserStatusFilter) => {
    setStatusFilter(val)
    setCurrentPage(1)
  }

  const handleRoleFilterChange = (val: UserRoleFilter) => {
    setRoleFilter(val)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      {/* Controls Card */}
      <UserFilters
        searchQuery={searchQuery}
        setSearchQuery={handleSearchQueryChange}
        statusFilter={statusFilter}
        setStatusFilter={handleStatusFilterChange}
        roleFilter={roleFilter}
        setRoleFilter={handleRoleFilterChange}
        onAddClick={() => setShowAddModal(true)}
      />

      {/* Users List Container */}
      <UserTable
        loading={loading}
        paginatedUsers={paginatedUsers}
        filteredUsersCount={filteredUsers.length}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        actionLoadingId={actionLoadingId}
        onEditRoleClick={setShowEditRoleModal}
        onStatusActionClick={(user, action) => setPendingAction({ user, action })}
        onPrevPage={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        onNextPage={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
      />

      {/* Reusable Action Confirmation Modal */}
      <SuspensionModal
        isOpen={pendingAction !== null}
        pendingAction={pendingAction}
        suspensionDuration={suspensionDuration}
        setSuspensionDuration={setSuspensionDuration}
        customSuspensionDate={customSuspensionDate}
        setCustomSuspensionDate={setCustomSuspensionDate}
        onConfirm={executeStatusChange}
        onCancel={() => setPendingAction(null)}
      />

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        newFullName={newFullName}
        setNewFullName={setNewFullName}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        newRole={newRole}
        setNewRole={setNewRole}
        submittingUser={submittingUser}
        onSubmit={handleCreateUser}
      />

      {/* Edit Role Modal */}
      <EditRoleModal
        user={showEditRoleModal}
        onClose={() => setShowEditRoleModal(null)}
        onRoleSelect={handleRoleChange}
        actionLoadingId={actionLoadingId}
      />
    </div>
  )
}
