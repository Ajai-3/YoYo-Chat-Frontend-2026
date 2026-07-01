import React, { useState } from "react"
import { 
  X, 
  User, 
  Bell, 
  Sun, 
  Lock, 
  HelpCircle, 
  Info, 
  Trash2, 
  LogOut,
  ChevronRight,
  Pencil
} from "lucide-react"
import { currentUser } from "@/features/chat/data/mockData"
import { EditProfileModal } from "./EditProfileModal"

interface SettingsPanelProps {
  onClose: () => void
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [showEditProfile, setShowEditProfile] = useState(false)

  const menuItems = [
    { icon: User, label: "Account" },
    { icon: Bell, label: "Notifications" },
    { icon: Sun, label: "Appearance" },
    { icon: Lock, label: "Privacy & Security" },
    { icon: HelpCircle, label: "Help & Support" },
    { icon: Info, label: "About" },
  ]

  return (
    <>
      {showEditProfile && (
        <EditProfileModal onClose={() => setShowEditProfile(false)} />
      )}

      <div className="flex flex-col h-full bg-card text-card-foreground">
        {/* Header */}
        <div className="h-16 px-6 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-foreground">Settings</h2>
          <button 
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-6">
          
          {/* Profile Section */}
          <div className="flex flex-col items-center pt-4 pb-2">
            <div className="relative mb-4">
              <img 
                src={currentUser.avatar_url} 
                alt={currentUser.display_name}
                className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-md"
              />
              <button
                onClick={() => setShowEditProfile(true)}
                className="absolute bottom-0 right-0 h-8 w-8 bg-brand text-brand-foreground rounded-full flex items-center justify-center border-2 border-background shadow-sm hover:bg-brand/90 active:scale-95 transition-all"
                aria-label="Edit profile"
              >
                <Pencil className="size-4" />
              </button>
            </div>
            <h3 className="text-lg font-semibold text-foreground">{currentUser.display_name}</h3>
            <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            <button
              onClick={() => setShowEditProfile(true)}
              className="mt-2 text-xs text-brand font-medium hover:underline"
            >
              Edit profile
            </button>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <button 
                key={index}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-accent/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/5 rounded-lg text-muted-foreground group-hover:text-foreground transition-colors">
                    <item.icon className="size-5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="size-4 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
              </button>
            ))}
          </div>

          <div className="h-px bg-border/50 w-full" />

          {/* Destructive Actions */}
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Trash2 className="size-5" />
              </div>
              <span className="text-sm font-medium">Delete Account</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <LogOut className="size-5" />
              </div>
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>

        </div>
      </div>
    </>
  )
}
