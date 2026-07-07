import React from "react"
import { User, Contact, Camera, Save, Info } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProfileInfoCardProps {
  newAdminAvatarUrl: string
  newAdminUsername: string
  setNewAdminUsername: (val: string) => void
  newAdminDisplayName: string
  setNewAdminDisplayName: (val: string) => void
  onUpdateProfile: (e: React.FormEvent) => void
  fileRef: React.RefObject<HTMLInputElement | null>
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({
  newAdminAvatarUrl,
  newAdminUsername,
  setNewAdminUsername,
  newAdminDisplayName,
  setNewAdminDisplayName,
  onUpdateProfile,
  fileRef,
  onAvatarChange
}) => {
  return (
    <Card className="border border-border/85 bg-card/30 backdrop-blur-md shadow-xl flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3 border-b border-border/50 bg-card/10">
          <div className="flex gap-3 items-center">
            <div className="p-3 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 shrink-0">
              <User className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Profile Information</CardTitle>
              <CardDescription>Update your public profile and how it appears in the Lead Console</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-5 flex flex-col items-center">
          {/* Avatar circle area */}
          <div className="relative mb-4">
            <img
              src={newAdminAvatarUrl}
              alt="Admin Avatar Preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg bg-card"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center border-2 border-background shadow-md hover:bg-blue-500 active:scale-95 transition-all"
              aria-label="Change photo"
            >
              <Camera className="size-4" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAvatarChange}
            />
          </div>

          <div className="w-full space-y-4">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider block">Admin Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={newAdminUsername}
                  onChange={(e) => setNewAdminUsername(e.target.value)}
                  className="w-full h-11 pl-4 pr-10 rounded-lg border border-border bg-card/45 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 dark:bg-[#121214]"
                  required
                />
                <User className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-rose-500/60" />
              </div>
            </div>

            {/* Display Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider block">Display Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={newAdminDisplayName}
                  onChange={(e) => setNewAdminDisplayName(e.target.value)}
                  className="w-full h-11 pl-4 pr-10 rounded-lg border border-border bg-card/45 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 dark:bg-[#121214]"
                  required
                />
                <Contact className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-rose-500/60" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={onUpdateProfile}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold h-11 rounded-lg flex items-center justify-center gap-2 transition-all mt-6 shadow-md shadow-blue-600/10"
          >
            <Save className="h-4.5 w-4.5" />
            Save Profile Details
          </Button>
        </CardContent>
      </div>

      <div className="px-6 pb-6">
        {/* Info alert footer */}
        <div className="flex gap-3 items-center p-3 rounded-lg border border-blue-500/10 bg-blue-500/5 text-muted-foreground text-xs">
          <Info className="h-4.5 w-4.5 text-blue-400 shrink-0" />
          <div>
            <p className="font-bold text-foreground">Your profile information helps identify you across the platform</p>
            <p className="mt-0.5">Changes may take a few moments to reflect</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
