import React, { useState, useEffect } from "react"
import { 
  X, 
  UserPlus, 
  Search, 
  BellOff, 
  LogOut, 
  ShieldAlert,
  Users,
} from "lucide-react"
import { type ConversationView, mockUsers, currentUser } from "../data/mockData"
import { ImageZoomLightbox } from "@/components/ImageZoomLightbox"
import { ParticipantItem } from "./ParticipantItem"
import { CHAT_THEMES } from "../data/themeConfig"

interface ChatInfoPanelProps {
  conversation: ConversationView
  onClose: () => void
  onThemeChange?: (themeId: string) => void
  activeThemeId?: string
}

const resolveUser = (userId: string) => {
  if (userId === currentUser.id) return { ...currentUser, isSelf: true }
  const found = mockUsers.find((u) => u.id === userId)
  return found ? { ...found, isSelf: false } : null
}

const isOnline = (userId: string) => {
  const onlineIds = ["user-emma", "user-olivia", "user-noah", "user-sophia", "user-jake"]
  return onlineIds.includes(userId)
}

const roleLabel = (role: "admin" | "member", isOwner: boolean) => {
  if (isOwner) return "Owner"
  if (role === "admin") return "Admin"
  return null
}

export const ChatInfoPanel: React.FC<ChatInfoPanelProps> = ({ 
  conversation, 
  onClose,
  onThemeChange,
  activeThemeId,
}) => {
  const isGroup = conversation.type === "group"
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  useEffect(() => {
    if (!zoomedImage) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoomedImage(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [zoomedImage]);

  const ownerParticipant = conversation.participants.find((p) => p.role === "admin")

  const renderGroupAvatar = () => (
    <div className="w-20 h-20 rounded-full bg-brand/20 text-brand flex items-center justify-center shadow-sm mb-3 flex-shrink-0">
      <Users className="size-9" />
    </div>
  )

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      {zoomedImage && (
        <ImageZoomLightbox imageUrl={zoomedImage} onClose={() => setZoomedImage(null)} />
      )}

      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between shrink-0 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Chat info</h2>
        <button 
          onClick={onClose}
          className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          {isGroup || !conversation.avatar_url
            ? renderGroupAvatar()
            : (
              <button
                onClick={() => conversation.avatar_url && setZoomedImage(conversation.avatar_url)}
                className="rounded-full ring-2 ring-transparent hover:ring-brand/40 transition-all duration-200 active:scale-95 mb-3"
                aria-label="View profile photo"
              >
                <img 
                  src={conversation.avatar_url} 
                  alt={conversation.name}
                  className="w-20 h-20 rounded-full object-cover shadow-sm"
                />
              </button>
            )
          }
          <h3 className="text-lg font-semibold text-foreground text-center leading-tight">{conversation.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {isGroup ? `${conversation.participants.length} members` : '● Online'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-5">
          {isGroup && (
            <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
              <div className="h-11 w-11 flex items-center justify-center rounded-full bg-accent/10 text-muted-foreground group-hover:bg-accent/20 group-hover:text-foreground transition-all">
                <UserPlus className="size-5" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">Add</span>
            </div>
          )}
          
          <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
            <div className="h-11 w-11 flex items-center justify-center rounded-full bg-accent/10 text-muted-foreground group-hover:bg-accent/20 group-hover:text-foreground transition-all">
              <Search className="size-5" />
            </div>
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">Search</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
            <div className="h-11 w-11 flex items-center justify-center rounded-full bg-accent/10 text-muted-foreground group-hover:bg-accent/20 group-hover:text-foreground transition-all">
              <BellOff className="size-5" />
            </div>
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">Mute</span>
          </div>

          {isGroup ? (
            <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
              <div className="h-11 w-11 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 group-hover:bg-red-500/20 transition-all">
                <LogOut className="size-5" />
              </div>
              <span className="text-xs font-medium text-red-500">Leave</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
              <div className="h-11 w-11 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 group-hover:bg-red-500/20 transition-all">
                <ShieldAlert className="size-5" />
              </div>
              <span className="text-xs font-medium text-red-500">Block</span>
            </div>
          )}
        </div>

        <div className="h-px bg-border w-full" />

        {/* About Section */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">About</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isGroup 
              ? "This is where we discuss product updates, features, feedback, and sprint plans." 
              : "Software Engineer | Always learning 🚀"}
          </p>
          {isGroup && ownerParticipant && (
            <p className="text-xs text-muted-foreground/70">
              Created by {resolveUser(ownerParticipant.userId)?.display_name ?? "Unknown"} on Jan 10, 2024
            </p>
          )}
        </div>

        {/* Theme Selector Section (Only for Direct Chats) */}
        {!isGroup && (
          <>
            <div className="h-px bg-border w-full" />
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Chat Theme</h4>
              <div className="grid grid-cols-4 gap-3">
                {CHAT_THEMES.map((theme) => {
                  const isActive = activeThemeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => onThemeChange?.(theme.id)}
                      style={{ backgroundImage: `url(${theme.bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                      className={`h-11 w-11 rounded-xl relative flex items-center justify-center shadow-md active:scale-90 transition-all border border-white/20 hover:border-white/40 ${
                        isActive ? 'ring-2 ring-brand ring-offset-2 ring-offset-card' : ''
                      }`}
                      title={theme.name}
                      aria-label={`Select ${theme.name} theme`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-black/45 rounded-xl flex items-center justify-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-white shadow-sm" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {isGroup && (
          <>
            <div className="h-px bg-border w-full" />

            {/* Members List */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">
                Members ({conversation.participants.length})
              </h4>
              <div className="space-y-2">
                {conversation.participants.map((p) => {
                  const user = resolveUser(p.userId)
                  if (!user) return null
                  const online = isOnline(p.userId)
                  const isOwner = ownerParticipant?.userId === p.userId
                  const label = roleLabel(p.role, isOwner)

                  return (
                    <ParticipantItem
                      key={p.userId}
                      user={user}
                      online={online}
                      isOwner={isOwner}
                      label={label}
                      onZoomImage={setZoomedImage}
                    />
                  )
                })}
              </div>
              <button className="text-sm font-medium text-brand hover:underline">
                View all members
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
