import React from "react"
import { ShieldAlert, UserX } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface EmergencyPanelProps {
  onExecuteForceLogout: () => void
}

export const EmergencyPanel: React.FC<EmergencyPanelProps> = ({ onExecuteForceLogout }) => {
  return (
    <Card className="border border-rose-500/20 bg-card/30 backdrop-blur-md shadow-xl">
      <CardHeader className="pb-3 border-b border-rose-500/20 bg-rose-500/5">
        <CardTitle className="text-lg text-rose-500 flex items-center gap-2.5">
          <ShieldAlert className="h-5 w-5 text-rose-500" />
          Emergency Action Panel
        </CardTitle>
        <CardDescription>
          Critical administration options for system lockouts or security breaches
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 border border-rose-500/30 rounded-xl bg-rose-500/5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-500 shrink-0">
              <UserX className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Force-Logout All Users</p>
              <p className="text-xs text-muted-foreground mt-0.5">Terminates all active user sessions instantly. Forces re-authentication.</p>
            </div>
          </div>
          <Button
            onClick={onExecuteForceLogout}
            className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs h-10 px-4 flex gap-2 items-center justify-center rounded-lg transition-all shrink-0 font-mono"
          >
            <UserX className="h-4 w-4" />
            Execute Force Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
