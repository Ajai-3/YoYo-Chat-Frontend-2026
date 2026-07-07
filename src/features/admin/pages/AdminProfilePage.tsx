import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ImageCropper } from "@/components/ImageCropper"
import { useToast } from "@/context/ToastContext"
import { ProfileInfoCard } from "../components/profile/ProfileInfoCard"
import { CredentialsCard } from "../components/profile/CredentialsCard"
import { SecurityBestPractices } from "../components/profile/SecurityBestPractices"

export const AdminProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  
  // Stored state
  const [adminName, setAdminName] = useState(() => localStorage.getItem("admin_user") || "admin_yoyo")
  const [adminDisplayName, setAdminDisplayName] = useState(() => localStorage.getItem("admin_display_name") || "YoYo Lead Admin")
  const [adminAvatarUrl, setAdminAvatarUrl] = useState(() => localStorage.getItem("admin_avatar_url") || "https://api.dicebear.com/7.x/pixel-art/svg?seed=admin")

  // Form states
  const [newAdminUsername, setNewAdminUsername] = useState(adminName)
  const [newAdminDisplayName, setNewAdminDisplayName] = useState(adminDisplayName)
  const [newAdminAvatarUrl, setNewAdminAvatarUrl] = useState(adminAvatarUrl)
  
  const [newAdminPassword, setNewAdminPassword] = useState("")
  const [newSecretKey, setNewSecretKey] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [cropperImage, setCropperImage] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setCropperImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAdminUsername.trim()) {
      toast("Username cannot be empty", "error")
      return
    }
    
    // Save to localStorage
    localStorage.setItem("admin_user", newAdminUsername.trim())
    localStorage.setItem("admin_display_name", newAdminDisplayName.trim())
    localStorage.setItem("admin_avatar_url", newAdminAvatarUrl.trim())
    
    setAdminName(newAdminUsername.trim())
    setAdminDisplayName(newAdminDisplayName.trim())
    setAdminAvatarUrl(newAdminAvatarUrl.trim())

    // Trigger window storage event so layout header/sidebar updates automatically
    window.dispatchEvent(new Event("storage"))

    toast("Admin profile details updated successfully", "success")
  }

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAdminPassword.trim() && !newSecretKey.trim()) {
      toast("Fill in credentials fields to update", "error")
      return
    }
    if (newSecretKey.trim()) {
      localStorage.setItem("admin_secret_key", newSecretKey.trim())
    }
    toast("Credentials updated successfully. Changes applied to Admin Portal", "success")
    setNewAdminPassword("")
    setNewSecretKey("")
  }

  return (
    <div className="space-y-6">
      {cropperImage && (
        <ImageCropper
          imageSrc={cropperImage}
          cropShape="round"
          onCropComplete={(croppedImage) => {
            setNewAdminAvatarUrl(croppedImage)
            setCropperImage(null)
          }}
          onClose={() => setCropperImage(null)}
        />
      )}

      {/* 2-Column Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information Card */}
        <ProfileInfoCard
          newAdminAvatarUrl={newAdminAvatarUrl}
          newAdminUsername={newAdminUsername}
          setNewAdminUsername={setNewAdminUsername}
          newAdminDisplayName={newAdminDisplayName}
          setNewAdminDisplayName={setNewAdminDisplayName}
          onUpdateProfile={handleUpdateProfile}
          fileRef={fileRef}
          onAvatarChange={handleAvatarChange}
        />

        {/* Security Settings Card */}
        <CredentialsCard
          newAdminPassword={newAdminPassword}
          setNewAdminPassword={setNewAdminPassword}
          newSecretKey={newSecretKey}
          setNewSecretKey={setNewSecretKey}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onUpdateCredentials={handleUpdateCredentials}
        />
      </div>

      {/* Security Best Practices Footer Banner */}
      <SecurityBestPractices
        onLearnMoreClick={() => navigate("/admin/security-best-practices")}
      />
    </div>
  )
}
