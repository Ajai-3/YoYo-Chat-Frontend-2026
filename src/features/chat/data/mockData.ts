export interface User {
  id: string
  username: string
  email: string
  display_name: string
  avatar_url: string
  status: "active" | "suspended" | "deleted"
  created_at: string
  updated_at: string
}

export interface Conversation {
  _id: string
  type: "direct" | "group"
  createdBy: string
  createdAt: string
  name?: string
}

export interface ConversationMember {
  _id: string
  conversationId: string
  userId: string
  role: "admin" | "member"
  joinedAt: string
  leftAt: string | null
}

export interface Attachment {
  url: string
  mimeType: string
  size: number // in bytes
  name: string
}

export interface Message {
  _id: string
  conversationId: string
  senderId: string
  type: "text" | "image" | "file" | "system"
  content: string
  attachments?: Attachment[]
  status: "sent" | "delivered" | "read"
  createdAt: string
  replyToContent?: string
  editedAt?: string
  deletedAt?: string
}

export interface ConversationView {
  _id: string // conversationId
  type: "direct" | "group"
  name?: string // Group name, or other user's display_name for direct chats
  avatar_url?: string // Group avatar or other user's avatar
  participants: { userId: string; role: "admin" | "member" }[]
  lastMessageAt: string
  lastMessagePreview: string
  unreadCount: number
}

// Current Logged-in User
export const currentUser: User = {
  id: "user-alex",
  username: "alex_dev",
  email: "alex@yoyo.chat",
  display_name: "Alex",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
  status: "active",
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z"
}

// Other Users
export const mockUsers: User[] = [
  {
    id: "user-emma",
    username: "emma_t",
    email: "emma@yoyo.chat",
    display_name: "Emma Thompson",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
    status: "active",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z"
  },
  {
    id: "user-noah",
    username: "noah_w",
    email: "noah@yoyo.chat",
    display_name: "Noah Williams",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    status: "active",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z"
  },
  {
    id: "user-sophia",
    username: "sophia_l",
    email: "sophia@yoyo.chat",
    display_name: "Sophia Lee",
    avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80",
    status: "active",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z"
  },
  {
    id: "user-liam",
    username: "liam_j",
    email: "liam@yoyo.chat",
    display_name: "Liam Johnson",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
    status: "active",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z"
  },
  {
    id: "user-olivia",
    username: "olivia_p",
    email: "olivia@yoyo.chat",
    display_name: "Olivia Team",
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&h=256&q=80",
    status: "active",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z"
  },
  {
    id: "user-jake",
    username: "jake_d",
    email: "jake@yoyo.chat",
    display_name: "Jake Squad",
    avatar_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&h=256&q=80",
    status: "active",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z"
  },
  {
    id: "user-daniel",
    username: "daniel_m",
    email: "daniel@yoyo.chat",
    display_name: "Daniel Movie",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80",
    status: "active",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z"
  }
]

// Conversations list matching db schema
export const mockConversations: Conversation[] = [
  {
    _id: "conv-emma",
    type: "direct",
    createdBy: "user-emma",
    createdAt: "2026-06-30T10:00:00Z"
  },
  {
    _id: "conv-product",
    type: "group",
    createdBy: "user-olivia",
    createdAt: "2026-06-30T09:00:00Z",
    name: "Product Team"
  },
  {
    _id: "conv-noah",
    type: "direct",
    createdBy: "user-alex",
    createdAt: "2026-06-30T08:00:00Z"
  },
  {
    _id: "conv-design",
    type: "group",
    createdBy: "user-jake",
    createdAt: "2026-06-30T07:00:00Z",
    name: "Design Squad"
  },
  {
    _id: "conv-sophia",
    type: "direct",
    createdBy: "user-sophia",
    createdAt: "2026-06-29T15:00:00Z"
  },
  {
    _id: "conv-movie",
    type: "group",
    createdBy: "user-daniel",
    createdAt: "2026-06-29T12:00:00Z",
    name: "Movie Night"
  },
  {
    _id: "conv-liam",
    type: "direct",
    createdBy: "user-liam",
    createdAt: "2026-06-28T14:00:00Z"
  },
  {
    _id: "conv-family",
    type: "group",
    createdBy: "user-alex",
    createdAt: "2026-06-28T10:00:00Z",
    name: "Family Group"
  }
]

// Conversation Members list matching db schema
export const mockMembers: ConversationMember[] = [
  // Emma Chat
  { _id: "m1", conversationId: "conv-emma", userId: "user-alex", role: "admin", joinedAt: "2026-06-30T10:00:00Z", leftAt: null },
  { _id: "m2", conversationId: "conv-emma", userId: "user-emma", role: "member", joinedAt: "2026-06-30T10:00:00Z", leftAt: null },
  // Product Team
  { _id: "m3", conversationId: "conv-product", userId: "user-alex", role: "member", joinedAt: "2026-06-30T09:00:00Z", leftAt: null },
  { _id: "m4", conversationId: "conv-product", userId: "user-olivia", role: "admin", joinedAt: "2026-06-30T09:00:00Z", leftAt: null },
  // Noah
  { _id: "m5", conversationId: "conv-noah", userId: "user-alex", role: "admin", joinedAt: "2026-06-30T08:00:00Z", leftAt: null },
  { _id: "m6", conversationId: "conv-noah", userId: "user-noah", role: "member", joinedAt: "2026-06-30T08:00:00Z", leftAt: null },
  // Design Squad
  { _id: "m7", conversationId: "conv-design", userId: "user-alex", role: "member", joinedAt: "2026-06-30T07:00:00Z", leftAt: null },
  { _id: "m8", conversationId: "conv-design", userId: "user-jake", role: "admin", joinedAt: "2026-06-30T07:00:00Z", leftAt: null },
  // Sophia
  { _id: "m9", conversationId: "conv-sophia", userId: "user-alex", role: "member", joinedAt: "2026-06-29T15:00:00Z", leftAt: null },
  { _id: "m10", conversationId: "conv-sophia", userId: "user-sophia", role: "admin", joinedAt: "2026-06-29T15:00:00Z", leftAt: null },
  // Movie Night
  { _id: "m11", conversationId: "conv-movie", userId: "user-alex", role: "member", joinedAt: "2026-06-29T12:00:00Z", leftAt: null },
  { _id: "m12", conversationId: "conv-movie", userId: "user-daniel", role: "admin", joinedAt: "2026-06-29T12:00:00Z", leftAt: null },
  // Liam
  { _id: "m13", conversationId: "conv-liam", userId: "user-alex", role: "member", joinedAt: "2026-06-28T14:00:00Z", leftAt: null },
  { _id: "m14", conversationId: "conv-liam", userId: "user-liam", role: "admin", joinedAt: "2026-06-28T14:00:00Z", leftAt: null },
  // Family Group
  { _id: "m15", conversationId: "conv-family", userId: "user-alex", role: "admin", joinedAt: "2026-06-28T10:00:00Z", leftAt: null }
]

// Mock Messages matching db schema
export const mockMessages: Message[] = [
  // Emma Chat
  {
    _id: "msg-e1",
    conversationId: "conv-emma",
    senderId: "user-emma",
    type: "text",
    content: "Hey Alex! 👋",
    status: "read",
    createdAt: "2026-06-30T21:40:00Z"
  },
  {
    _id: "msg-e2",
    conversationId: "conv-emma",
    senderId: "user-emma",
    type: "text",
    content: "Are we still on for tonight?",
    status: "read",
    createdAt: "2026-06-30T21:40:10Z"
  },
  {
    _id: "msg-e3",
    conversationId: "conv-emma",
    senderId: "user-alex",
    type: "text",
    content: "Hey Emma! 😊",
    status: "read",
    createdAt: "2026-06-30T21:40:30Z"
  },
  {
    _id: "msg-e4",
    conversationId: "conv-emma",
    senderId: "user-alex",
    type: "text",
    content: "Yes! Can't wait 🎉",
    status: "read",
    createdAt: "2026-06-30T21:41:00Z"
  },
  {
    _id: "msg-e5",
    conversationId: "conv-emma",
    senderId: "user-alex",
    type: "file",
    content: "Figma-Design-System.fig",
    attachments: [
      {
        name: "Figma-Design-System.fig",
        url: "#",
        mimeType: "application/octet-stream",
        size: 25690112 // ~24.5 MB
      }
    ],
    status: "read",
    createdAt: "2026-06-30T21:41:15Z"
  },
  {
    _id: "msg-e6",
    conversationId: "conv-emma",
    senderId: "user-emma",
    type: "file", // voice message
    content: "Sent a voice message",
    attachments: [
      {
        name: "Voice Message.mp3",
        url: "voice",
        mimeType: "audio/mpeg",
        size: 921600 // mock voice message size
      }
    ],
    status: "read",
    createdAt: "2026-06-30T21:41:45Z"
  },

  // Product Team
  {
    _id: "msg-p1",
    conversationId: "conv-product",
    senderId: "user-olivia",
    type: "text",
    content: "Olivia: Can you share the figma file?",
    status: "delivered",
    createdAt: "2026-06-30T21:35:00Z"
  },

  // Noah Williams
  {
    _id: "msg-n1",
    conversationId: "conv-noah",
    senderId: "user-noah",
    type: "text",
    content: "Awesome! Thanks",
    status: "read",
    createdAt: "2026-06-30T20:22:00Z"
  },

  // Design Squad
  {
    _id: "msg-d1",
    conversationId: "conv-design",
    senderId: "user-jake",
    type: "text",
    content: "Jake: New mockups are here 🚀",
    status: "delivered",
    createdAt: "2026-06-30T19:10:00Z"
  },

  // Sophia Lee
  {
    _id: "msg-s1",
    conversationId: "conv-sophia",
    senderId: "user-sophia",
    type: "text",
    content: "Let's catch up tomorrow",
    status: "read",
    createdAt: "2026-06-29T18:00:00Z"
  },

  // Movie Night
  {
    _id: "msg-m1",
    conversationId: "conv-movie",
    senderId: "user-daniel",
    type: "text",
    content: "Daniel: Who's in for Inception?",
    status: "read",
    createdAt: "2026-06-29T17:00:00Z"
  },

  // Liam Johnson
  {
    _id: "msg-l1",
    conversationId: "conv-liam",
    senderId: "user-liam",
    type: "text",
    content: "Sent a voice message",
    status: "read",
    createdAt: "2026-06-28T16:00:00Z"
  },

  // Family Group
  {
    _id: "msg-f1",
    conversationId: "conv-family",
    senderId: "user-daniel", // mock sibling/parent sender ID
    type: "text",
    content: "Mom: Dinner at 7 PM 🍽️",
    status: "read",
    createdAt: "2026-06-28T15:00:00Z"
  }
]

// Query Side view matching db schema
export const mockConversationView: ConversationView[] = [
  {
    _id: "conv-emma",
    type: "direct",
    name: "Emma Thompsonsdfffffffffffffsd",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
    participants: [
      { userId: "user-alex", role: "admin" },
      { userId: "user-emma", role: "member" }
    ],
    lastMessageAt: "2026-06-30T21:41:45Z",
    lastMessagePreview: "Sent a voice message",
    unreadCount: 2
  },
  {
    _id: "conv-product",
    type: "group",
    name: "Product Team",
    avatar_url: "", // generate logo icon
    participants: [
      { userId: "user-alex", role: "member" },
      { userId: "user-olivia", role: "admin" },
      { userId: "user-emma", role: "admin" },
      { userId: "user-noah", role: "member" },
      { userId: "user-liam", role: "member" },
      { userId: "user-sophia", role: "member" },
      { userId: "user-jake", role: "member" },
      { userId: "user-daniel", role: "member" },
    ],
    lastMessageAt: "2026-06-30T21:35:00Z",
    lastMessagePreview: "Olivia: Can you share the figma file?",
    unreadCount: 5
  },
  {
    _id: "conv-noah",
    type: "direct",
    name: "Noah Williams",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    participants: [
      { userId: "user-alex", role: "admin" },
      { userId: "user-noah", role: "member" }
    ],
    lastMessageAt: "2026-06-30T20:22:00Z",
    lastMessagePreview: "Awesome! Thanks",
    unreadCount: 0
  },
  {
    _id: "conv-design",
    type: "group",
    name: "Design Squad",
    avatar_url: "",
    participants: [
      { userId: "user-alex", role: "member" },
      { userId: "user-jake", role: "admin" },
      { userId: "user-olivia", role: "member" },
      { userId: "user-sophia", role: "member" },
    ],
    lastMessageAt: "2026-06-30T19:10:00Z",
    lastMessagePreview: "Jake: New mockups are here 🚀",
    unreadCount: 3
  },
  {
    _id: "conv-sophia",
    type: "direct",
    name: "Sophia Lee",
    avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80",
    participants: [
      { userId: "user-alex", role: "member" },
      { userId: "user-sophia", role: "admin" }
    ],
    lastMessageAt: "2026-06-29T18:00:00Z",
    lastMessagePreview: "Let's catch up tomorrow",
    unreadCount: 0
  },
  {
    _id: "conv-movie",
    type: "group",
    name: "Movie Night",
    avatar_url: "",
    participants: [
      { userId: "user-alex", role: "member" },
      { userId: "user-daniel", role: "admin" }
    ],
    lastMessageAt: "2026-06-29T17:00:00Z",
    lastMessagePreview: "Daniel: Who's in for Inception?",
    unreadCount: 0
  },
  {
    _id: "conv-liam",
    type: "direct",
    name: "Liam Johnson",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
    participants: [
      { userId: "user-alex", role: "member" },
      { userId: "user-liam", role: "admin" }
    ],
    lastMessageAt: "2026-06-28T16:00:00Z",
    lastMessagePreview: "Sent a voice message",
    unreadCount: 0
  },
  {
    _id: "conv-family",
    type: "group",
    name: "Family Group",
    avatar_url: "",
    participants: [
      { userId: "user-alex", role: "admin" }
    ],
    lastMessageAt: "2026-06-28T15:00:00Z",
    lastMessagePreview: "Mom: Dinner at 7 PM 🍽️",
    unreadCount: 0
  },
  {
    _id: "conv-marketing",
    type: "group",
    name: "Marketing Campaign",
    avatar_url: "",
    participants: [
      { userId: "user-alex", role: "member" },
      { userId: "user-emma", role: "admin" }
    ],
    lastMessageAt: "2026-06-27T18:30:00Z",
    lastMessagePreview: "Emma: Review the social assets",
    unreadCount: 2
  },
  {
    _id: "conv-coffee",
    type: "group",
    name: "Coffee Lovers ☕",
    avatar_url: "",
    participants: [
      { userId: "user-alex", role: "member" },
      { userId: "user-noah", role: "member" }
    ],
    lastMessageAt: "2026-06-26T09:15:00Z",
    lastMessagePreview: "Noah: Anyone up for espresso?",
    unreadCount: 0
  },
  {
    _id: "conv-tech",
    type: "group",
    name: "Tech Geeks Hub",
    avatar_url: "",
    participants: [
      { userId: "user-alex", role: "member" },
      { userId: "user-liam", role: "member" }
    ],
    lastMessageAt: "2026-06-25T20:10:00Z",
    lastMessagePreview: "Liam: Check out the new build",
    unreadCount: 0
  }
]
