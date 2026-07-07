import * as Icons from "lucide-react"

export interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalGroups: number
  reportedMessages: number
  systemUptime: string
  cpuUsage: number
  memoryUsage: number
  cpuHistory: number[]
  memoryHistory: number[]
}

export type UserRole = "user" | "moderator" | "admin"
export type UserStatus = "active" | "suspended" | "banned" | "deleted"

export interface AdminUser {
  id: string
  username: string
  fullName: string
  email: string
  role: UserRole
  status: UserStatus
  suspendedUntil?: string
  isOnline: boolean
  joinedDate: string
  messageCount: number
  lastActive: string
  avatar?: string
}

export type GroupType = "public" | "private"
export type GroupStatus = "active" | "restricted"

export interface AdminGroup {
  id: string
  name: string
  type: GroupType
  membersCount: number
  status: GroupStatus
  createdDate: string
}

export interface SystemServiceStatus {
  authService: boolean
  chatService: boolean
  fileUploadService: boolean
}

// Filter types
export type UserStatusFilter = "all" | "active" | "suspended" | "banned" | "deleted"
export type UserRoleFilter = "all" | UserRole

export type GroupTypeFilter = "all" | GroupType
export type GroupStatusFilter = "all" | GroupStatus

// Icon helper type
export type LucideIconKey = keyof typeof Icons
