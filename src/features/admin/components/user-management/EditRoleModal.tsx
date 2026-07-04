import React from "react"
import { X, Check } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import type { AdminUser } from "../../data/mockAdminData"

interface EditRoleModalProps {
  user: AdminUser | null
  onClose: () => void
  onRoleSelect: (userId: string, newRole: "user" | "moderator" | "admin") => void
  actionLoadingId: string | null
}

export const EditRoleModal: React.FC<EditRoleModalProps> = ({
  user,
  onClose,
  onRoleSelect,
  actionLoadingId
}) => {
  if (!user) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-sm bg-card border-border/80 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
        <CardHeader>
          <CardTitle>Modify Permissions</CardTitle>
          <CardDescription>
            Assign administrative and moderator roles to @{user.username}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            {(["user", "moderator", "admin"] as const).map((r) => (
              <button
                key={r}
                onClick={() => onRoleSelect(user.id, r)}
                disabled={actionLoadingId === user.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all text-sm font-semibold capitalize ${
                  user.role === r
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border hover:bg-accent/40 text-foreground"
                }`}
              >
                <span>{r}</span>
                {user.role === r && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
