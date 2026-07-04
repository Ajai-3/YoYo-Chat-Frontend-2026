import React from "react"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { ShadcnDatePicker } from "../ShadcnDatePicker"
import { ConfirmationModal } from "../ConfirmationModal"
import type { AdminUser } from "../../data/mockAdminData"

interface SuspensionModalProps {
  isOpen: boolean
  pendingAction: {
    user: AdminUser
    action: "activate" | "suspend" | "ban"
  } | null
  suspensionDuration: string
  setSuspensionDuration: (val: string) => void
  customSuspensionDate: string
  setCustomSuspensionDate: (val: string) => void
  onConfirm: () => void
  onCancel: () => void
}

export const SuspensionModal: React.FC<SuspensionModalProps> = ({
  isOpen,
  pendingAction,
  suspensionDuration,
  setSuspensionDuration,
  customSuspensionDate,
  setCustomSuspensionDate,
  onConfirm,
  onCancel
}) => {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      title={
        pendingAction?.action === "activate" ? "Activate User Profile" :
        pendingAction?.action === "suspend" ? "Temporarily Suspend Account" : "Permanently Ban Account"
      }
      message={
        pendingAction?.action === "activate"
          ? `Are you sure you want to reactivate @${pendingAction?.user?.username}? This will restore access to send messages and connect to chat server tunnels.`
          : pendingAction?.action === "suspend"
          ? `Select the duration for temporarily suspending @${pendingAction?.user?.username}. While suspended, they will be disconnected and unable to log in.`
          : `Are you sure you want to permanently BAN @${pendingAction?.user?.username}? This action is permanent and cannot be reversed by moderators.`
      }
      variant={
        pendingAction?.action === "activate" ? "success" :
        pendingAction?.action === "suspend" ? "warning" : "danger"
      }
      confirmText={
        pendingAction?.action === "activate" ? "Reactivate User" :
        pendingAction?.action === "suspend" ? "Suspend Account" : "Permanently Ban"
      }
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      {pendingAction?.action === "suspend" && (
        <div className="space-y-3 pt-1">
          <Label htmlFor="suspensionRange" className="text-xs font-bold text-muted-foreground uppercase">Suspension Window</Label>
          <Select
            value={suspensionDuration}
            onChange={setSuspensionDuration}
            options={[
              { value: "1 hour", label: "1 Hour" },
              { value: "24 hours", label: "24 Hours (1 Day)" },
              { value: "7 days", label: "7 Days (1 Week)" },
              { value: "30 days", label: "30 Days (1 Month)" },
              { value: "custom", label: "Custom Date Picker" }
            ]}
            className="w-full md:w-full"
          />

          {suspensionDuration === "custom" && (
            <div className="flex gap-2 items-center animate-in slide-in-from-top-2 duration-150 mt-2">
              <ShadcnDatePicker
                value={customSuspensionDate}
                onChange={setCustomSuspensionDate}
                placeholder="Select suspension expiry date"
              />
            </div>
          )}
        </div>
      )}
    </ConfirmationModal>
  )
}
