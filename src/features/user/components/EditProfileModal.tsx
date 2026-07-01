import React, { useState, useRef } from 'react'
import { X, Camera, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/features/chat/data/mockData'
import { ImageCropper } from '@/components/ImageCropper'

interface EditProfileModalProps {
  onClose: () => void
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose }) => {
  const [displayName, setDisplayName] = useState(currentUser.display_name)
  const [username, setUsername]     = useState(currentUser.username)
  const [bio, setBio]               = useState('Software Engineer | Always learning 🚀')
  const [avatarPreview, setAvatarPreview] = useState<string>(currentUser.avatar_url)
  const [saved, setSaved]           = useState(false)
  const [cropperImage, setCropperImage] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setCropperImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => { setSaved(false); onClose() }, 900)
  }

  return (
    <>
      {cropperImage && (
        <ImageCropper
          imageSrc={cropperImage}
          cropShape="round"
          onCropComplete={(croppedImage) => {
            setAvatarPreview(croppedImage)
            setCropperImage(null)
          }}
          onClose={() => setCropperImage(null)}
        />
      )}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
      <div
        className="w-full max-w-md bg-card rounded-3xl shadow-2xl border border-border overflow-hidden"
      >
        {/* Header */}
        <div className="h-14 px-5 flex items-center justify-between border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Edit Profile</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg"
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-0 right-0 h-8 w-8 bg-brand text-brand-foreground rounded-full flex items-center justify-center border-2 border-background shadow-md hover:bg-brand/90 active:scale-95 transition-all"
                aria-label="Change photo"
              >
                <Camera className="size-4" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="text-xs text-brand font-medium hover:underline"
            >
              Change photo
            </button>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Display Name
              </label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="h-11 rounded-xl border-border bg-background focus:border-brand/40 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="h-11 pl-7 rounded-xl border-border bg-background focus:border-brand/40 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Bio <span className="normal-case text-muted-foreground/60">(optional)</span>
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell people about yourself..."
                rows={3}
                maxLength={160}
                className="w-full px-3.5 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-brand/40 transition-colors"
              />
              <p className="text-[10px] text-muted-foreground/60 text-right">{bio.length}/160</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl border-border text-foreground hover:bg-accent/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-11 rounded-xl bg-brand text-brand-foreground hover:bg-brand/90 border-none shadow-lg shadow-brand/20 active:scale-95 transition-all gap-2"
            >
              {saved ? <><Check className="size-4" /> Saved</> : 'Save changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
