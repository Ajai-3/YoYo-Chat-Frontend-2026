import type { AdminStats, AdminUser, AdminGroup, SystemServiceStatus } from "../types/adminTypes"
export type { AdminStats, AdminUser, AdminGroup, SystemServiceStatus }

// Initial mock datasets
let mockUsers: AdminUser[] = [
  {
    id: "usr-1",
    username: "john_doe",
    fullName: "John Doe",
    email: "john.doe@yoyo.chat",
    role: "user",
    status: "active",
    isOnline: true,
    joinedDate: "2026-01-15",
    messageCount: 1450,
    lastActive: "Just now",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
  },
  {
    id: "usr-2",
    username: "sarah_connor",
    fullName: "Sarah Connor",
    email: "sarah.c@yoyo.chat",
    role: "moderator",
    status: "active",
    isOnline: true,
    joinedDate: "2026-02-10",
    messageCount: 3820,
    lastActive: "Just now",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    id: "usr-3",
    username: "tony_stark",
    fullName: "Tony Stark",
    email: "tony@starkindustries.com",
    role: "user",
    status: "suspended",
    suspendedUntil: "2026-07-15",
    isOnline: false,
    joinedDate: "2026-03-01",
    messageCount: 502,
    lastActive: "2026-06-28 12:10",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: "usr-4",
    username: "bruce_banner",
    fullName: "Bruce Banner",
    email: "hulk@avengers.org",
    role: "user",
    status: "active",
    isOnline: false,
    joinedDate: "2026-03-12",
    messageCount: 220,
    lastActive: "2026-07-05 09:15",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  {
    id: "usr-5",
    username: "natasha_romanoff",
    fullName: "Natasha Romanoff",
    email: "natasha@shield.gov",
    role: "moderator",
    status: "active",
    isOnline: true,
    joinedDate: "2025-12-01",
    messageCount: 5120,
    lastActive: "Just now",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
  {
    id: "usr-6",
    username: "steve_rogers",
    fullName: "Steve Rogers",
    email: "cap@avengers.org",
    role: "user",
    status: "banned",
    isOnline: false,
    joinedDate: "2026-01-05",
    messageCount: 890,
    lastActive: "2026-07-02 15:20",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  },
  {
    id: "usr-7",
    username: "wanda_maximoff",
    fullName: "Wanda Maximoff",
    email: "wanda.m@yoyo.chat",
    role: "user",
    status: "deleted",
    isOnline: false,
    joinedDate: "2026-04-20",
    messageCount: 130,
    lastActive: "Account Deleted",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  },
]

let mockGroups: AdminGroup[] = [
  { id: "grp-1", name: "Avengers Main HQ", type: "private", membersCount: 12, status: "active", createdDate: "2026-01-01" },
  { id: "grp-2", name: "Design & UX System", type: "public", membersCount: 142, status: "active", createdDate: "2026-02-15" },
  { id: "grp-3", name: "Spam Linkers", type: "public", membersCount: 8, status: "restricted", createdDate: "2026-03-20" },
  { id: "grp-4", name: "Random Off-Topic", type: "public", membersCount: 382, status: "active", createdDate: "2026-01-10" },
  { id: "grp-5", name: "Executive Suite Only", type: "private", membersCount: 4, status: "active", createdDate: "2026-04-01" },
  { id: "grp-6", name: "Frontend Masters", type: "public", membersCount: 95, status: "active", createdDate: "2026-04-10" },
  { id: "grp-7", name: "Backend Core Labs", type: "private", membersCount: 18, status: "active", createdDate: "2026-04-18" },
  { id: "grp-8", name: "Meme Central Station", type: "public", membersCount: 512, status: "active", createdDate: "2026-05-01" },
  { id: "grp-9", name: "Project Delivery Team", type: "private", membersCount: 9, status: "active", createdDate: "2026-05-05" },
  { id: "grp-10", name: "Security Audit Logs", type: "private", membersCount: 3, status: "restricted", createdDate: "2026-05-12" },
  { id: "grp-11", name: "Vibe Check Room", type: "public", membersCount: 220, status: "active", createdDate: "2026-05-20" },
  { id: "grp-12", name: "Crypto Talk Global", type: "public", membersCount: 115, status: "restricted", createdDate: "2026-06-01" },
  { id: "grp-13", name: "AI Explorers Circle", type: "public", membersCount: 340, status: "active", createdDate: "2026-06-15" },
  { id: "grp-14", name: "DevOps & Cloud Pipelines", type: "private", membersCount: 14, status: "active", createdDate: "2026-06-22" },
  { id: "grp-15", name: "System Administrators", type: "private", membersCount: 6, status: "active", createdDate: "2026-07-01" },
]

let mockStats: AdminStats = {
  totalUsers: 1420,
  activeUsers: 3, // Currently online users based on isOnline
  totalGroups: 15,
  reportedMessages: 5,
  systemUptime: "14 days, 6 hours",
  cpuUsage: 42,
  memoryUsage: 53,
  cpuHistory: [18, 48, 22, 68, 35, 58, 28, 42],
  memoryHistory: [38, 52, 41, 62, 45, 59, 42, 53],
}

let serviceStatus: SystemServiceStatus = {
  authService: true,
  chatService: true,
  fileUploadService: true,
}

// Simulated API calls
export const apiSimulate = {
  fetchAdminStats: async (): Promise<AdminStats> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Dynamic chart fluctuations
        const onlineCount = mockUsers.filter(u => u.isOnline && u.status === "active").length
        const cpu = Math.floor(Math.random() * 60) + 15  // CPU range 15% to 75%
        const mem = Math.floor(Math.random() * 35) + 35  // Memory range 35% to 70%
        
        mockStats.cpuHistory = [...mockStats.cpuHistory.slice(1), cpu]
        mockStats.memoryHistory = [...mockStats.memoryHistory.slice(1), mem]
        
        resolve({
          ...mockStats,
          cpuUsage: cpu,
          memoryUsage: mem,
          activeUsers: onlineCount,
          totalUsers: mockUsers.length,
          totalGroups: mockGroups.length,
        })
      }, 400)
    })
  },

  fetchAdminUsers: async (): Promise<AdminUser[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockUsers])
      }, 500)
    })
  },

  updateUserStatus: async (
    userId: string, 
    status: "active" | "suspended" | "banned", 
    suspendedUntil?: string
  ): Promise<AdminUser> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex((u) => u.id === userId)
        if (userIndex !== -1) {
          mockUsers[userIndex] = { 
            ...mockUsers[userIndex], 
            status, 
            suspendedUntil: status === "suspended" ? suspendedUntil : undefined,
            isOnline: status !== "active" ? false : mockUsers[userIndex].isOnline
          }
          resolve(mockUsers[userIndex])
        } else {
          reject(new Error("User not found"))
        }
      }, 500)
    })
  },

  updateUserRole: async (userId: string, role: "user" | "moderator" | "admin"): Promise<AdminUser> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex((u) => u.id === userId)
        if (userIndex !== -1) {
          mockUsers[userIndex] = { ...mockUsers[userIndex], role }
          resolve(mockUsers[userIndex])
        } else {
          reject(new Error("User not found"))
        }
      }, 500)
    })
  },

  createUser: async (user: Omit<AdminUser, "id" | "joinedDate" | "messageCount" | "lastActive" | "isOnline">): Promise<AdminUser> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: AdminUser = {
          ...user,
          id: `usr-${Math.floor(Math.random() * 10000)}`,
          joinedDate: new Date().toISOString().split("T")[0],
          isOnline: true,
          messageCount: 0,
          lastActive: "Just now",
        }
        mockUsers.unshift(newUser)
        resolve(newUser)
      }, 500)
    })
  },

  // Groups actions
  fetchAdminGroups: async (): Promise<AdminGroup[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockGroups])
      }, 500)
    })
  },

  updateGroupStatus: async (groupId: string, status: "active" | "restricted"): Promise<AdminGroup> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const grpIdx = mockGroups.findIndex(g => g.id === groupId)
        if (grpIdx !== -1) {
          mockGroups[grpIdx] = { ...mockGroups[grpIdx], status }
          resolve(mockGroups[grpIdx])
        } else {
          reject(new Error("Group not found"))
        }
      }, 500)
    })
  },

  // Service toggles
  fetchServicesStatus: async (): Promise<SystemServiceStatus> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...serviceStatus }), 300)
    })
  },

  toggleService: async (serviceKey: keyof SystemServiceStatus): Promise<SystemServiceStatus> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        serviceStatus[serviceKey] = !serviceStatus[serviceKey]
        resolve({ ...serviceStatus })
      }, 400)
    })
  },

  forceLogoutAllUsers: async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Disconnect everyone online
        mockUsers = mockUsers.map(u => ({ ...u, isOnline: false }))
        resolve(true)
      }, 800)
    })
  }
}
