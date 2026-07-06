import React, { useState, useEffect } from "react"
import { ShieldAlert } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/context/ToastContext"
import { ConfirmationModal } from "../components/ConfirmationModal"
import { apiSimulate, type SystemServiceStatus } from "../data/mockAdminData"
import { ServicesControl } from "../components/system-settings/ServicesControl"
import { EmergencyPanel } from "../components/system-settings/EmergencyPanel"
import { SystemOverview } from "../components/system-settings/SystemOverview"
import { MaintenanceControl } from "../components/system-settings/MaintenanceControl"

export const SystemSettingsPage: React.FC = () => {
  const { toast } = useToast()
  
  // Configurations States
  const [services, setServices] = useState<SystemServiceStatus>({
    authService: true,
    chatService: true,
    fileUploadService: true,
  })
  
  const [isMaintenance, setIsMaintenance] = useState(() => {
    return localStorage.getItem("system_maintenance") === "true"
  })
  
  const [confirmForceLogout, setConfirmForceLogout] = useState(false)
  const [forceLogoutPassword, setForceLogoutPassword] = useState("")
  const [forceLogoutSecretKey, setForceLogoutSecretKey] = useState("")
  
  const [confirmMaintenance, setConfirmMaintenance] = useState(false)
  const [maintenancePassword, setMaintenancePassword] = useState("")
  const [maintenanceSecretKey, setMaintenanceSecretKey] = useState("")

  const [pendingServiceToggle, setPendingServiceToggle] = useState<keyof SystemServiceStatus | null>(null)

  useEffect(() => {
    // Load initial configurations
    const loadConfig = async () => {
      // In realistic scenario, read active states
    }
    loadConfig()
  }, [])

  const handleToggleService = async () => {
    if (!pendingServiceToggle) return
    const key = pendingServiceToggle
    setPendingServiceToggle(null)
    try {
      const updated = await apiSimulate.toggleService(key)
      setServices(updated)
      toast(`System state for "${String(key)}" updated successfully`, "success")
    } catch {
      toast("Failed to toggle service status", "error")
    }
  }

  const handleForceLogoutUsers = async () => {
    const storedSecret = localStorage.getItem("admin_secret_key") || "YOYO-ADMIN-2026"
    
    if (forceLogoutPassword !== "adminpassword" || forceLogoutSecretKey !== storedSecret) {
      toast("Authentication Failed: Invalid admin password or secret key!", "error")
      return
    }

    setConfirmForceLogout(false)
    setForceLogoutPassword("")
    setForceLogoutSecretKey("")
    try {
      await apiSimulate.forceLogoutAllUsers()
      toast("Forcefully terminated all active user sessions successfully", "success")
    } catch {
      toast("Failed to force sign out user sessions", "error")
    }
  }

  const handleToggleMaintenance = () => {
    const storedSecret = localStorage.getItem("admin_secret_key") || "YOYO-ADMIN-2026"
    
    if (maintenancePassword !== "adminpassword" || maintenanceSecretKey !== storedSecret) {
      toast("Authentication Failed: Invalid admin password or secret key!", "error")
      return
    }

    const nextState = !isMaintenance
    setIsMaintenance(nextState)
    localStorage.setItem("system_maintenance", String(nextState))
    
    setConfirmMaintenance(false)
    setMaintenancePassword("")
    setMaintenanceSecretKey("")
    
    toast(`Maintenance mode ${nextState ? "ACTIVATED" : "DEACTIVATED"} successfully`, "success")
  }

  const blockedCount = Object.values(services).filter((val) => !val).length
  const operationalStatus = blockedCount === 3 ? "Critical" : blockedCount > 0 ? "Degraded" : "Operational"

  return (
    <div className="space-y-6">

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* Left Area - Service Status Control & Emergency Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Services Control Card */}
          <ServicesControl
            services={services}
            onToggle={(key) => setPendingServiceToggle(key)}
          />

          {/* Emergency Action Panel */}
          <EmergencyPanel
            onExecuteForceLogout={() => setConfirmForceLogout(true)}
          />
        </div>

        {/* Right Area - System Overview & Maintenance Mode */}
        <div className="space-y-6">
          {/* System Overview Card */}
          <SystemOverview
            blockedCount={blockedCount}
            operationalStatus={operationalStatus}
          />

          {/* Maintenance Mode Card */}
          <MaintenanceControl
            isMaintenance={isMaintenance}
            onToggleClick={() => setConfirmMaintenance(true)}
          />
        </div>
      </div>

      {/* Warning Alert Banner Footer */}
      <div className="flex items-center gap-2.5 p-3 rounded-xl border border-border/80 bg-card/10 text-muted-foreground text-xs leading-relaxed">
        <ShieldAlert className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
        <span>Use these controls with caution. Changes can impact system availability and user experience.</span>
      </div>

      {/* Force Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmForceLogout}
        title="Force Sign Out All Users"
        message="WARNING: This action terminates the live WebSocket connections of ALL connected users. Active chats will be broken, forcing users back to the landing or login screen immediately. Authenticate using administration credentials below."
        variant="danger"
        confirmText="Confirm Terminate Sessions"
        onConfirm={handleForceLogoutUsers}
        onCancel={() => {
          setConfirmForceLogout(false)
          setForceLogoutPassword("")
          setForceLogoutSecretKey("")
        }}
      >
        <div className="space-y-3 pt-2">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Admin Password</label>
            <Input
              type="password"
              placeholder="Enter administrative password"
              value={forceLogoutPassword}
              onChange={(e) => setForceLogoutPassword(e.target.value)}
              className="bg-card text-foreground border-border text-sm dark:bg-[#121214] mt-1"
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Admin Secret Key</label>
            <Input
              type="text"
              placeholder="e.g. YOYO-ADMIN-2026"
              value={forceLogoutSecretKey}
              onChange={(e) => setForceLogoutSecretKey(e.target.value)}
              className="bg-card text-foreground border-border text-sm font-mono dark:bg-[#121214] mt-1"
              required
            />
          </div>
        </div>
      </ConfirmationModal>

      {/* Maintenance Mode Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmMaintenance}
        title={isMaintenance ? "Deactivate Maintenance Mode" : "Activate Maintenance Mode"}
        message={isMaintenance 
          ? "Are you sure you want to deactivate Maintenance Mode? This will allow all users to sign in and use the application again." 
          : "Are you sure you want to activate Maintenance Mode? This will restrict regular client access to the application immediately. Authenticate using administration credentials below."
        }
        variant={isMaintenance ? "success" : "warning"}
        confirmText={isMaintenance ? "Deactivate Maintenance" : "Activate Maintenance"}
        onConfirm={handleToggleMaintenance}
        onCancel={() => {
          setConfirmMaintenance(false)
          setMaintenancePassword("")
          setMaintenanceSecretKey("")
        }}
      >
        <div className="space-y-3 pt-2">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Admin Password</label>
            <Input
              type="password"
              placeholder="Enter administrative password"
              value={maintenancePassword}
              onChange={(e) => setMaintenancePassword(e.target.value)}
              className="bg-card text-foreground border-border text-sm dark:bg-[#121214] mt-1"
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Admin Secret Key</label>
            <Input
              type="text"
              placeholder="e.g. YOYO-ADMIN-2026"
              value={maintenanceSecretKey}
              onChange={(e) => setMaintenanceSecretKey(e.target.value)}
              className="bg-card text-foreground border-border text-sm font-mono dark:bg-[#121214] mt-1"
              required
            />
          </div>
        </div>
      </ConfirmationModal>

      {/* Service Toggle Modal */}
      <ConfirmationModal
        isOpen={pendingServiceToggle !== null}
        title={pendingServiceToggle ? `Toggle Security Block: ${String(pendingServiceToggle)}` : ""}
        message={`Are you sure you want to toggle the block state for "${pendingServiceToggle ? String(pendingServiceToggle) : ""}"? Disabling this service blocks key parts of the user application.`}
        variant="warning"
        confirmText="Confirm Toggle State"
        onConfirm={handleToggleService}
        onCancel={() => setPendingServiceToggle(null)}
      />
    </div>
  )
}
