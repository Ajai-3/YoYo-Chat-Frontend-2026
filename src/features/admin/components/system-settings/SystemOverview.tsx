import React from "react"
import { LayoutDashboard, Lock, Activity } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface SystemOverviewProps {
  blockedCount: number
  operationalStatus: string
}

export const SystemOverview: React.FC<SystemOverviewProps> = ({
  blockedCount,
  operationalStatus
}) => {
  return (
    <Card className="border border-border/80 bg-card/30 backdrop-blur-md shadow-xl">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-md">System Overview</CardTitle>
        <CardDescription>Real-time status of critical services</CardDescription>
      </CardHeader>
      <CardContent className="divide-y divide-border/30 pt-3">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LayoutDashboard className="h-4.5 w-4.5" />
            <span>Total Services</span>
          </div>
          <span className="font-bold text-brand font-mono">3</span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4.5 w-4.5" />
            <span>Blocked Services</span>
          </div>
          <span className="font-bold text-rose-500 font-mono">
            {blockedCount}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="h-4.5 w-4.5" />
            <span>Operational Status</span>
          </div>
          <span 
            className={`text-xs font-bold px-2 py-0.5 rounded border uppercase ${
              operationalStatus === "Critical" 
                ? "bg-rose-500/10 text-rose-500 border-rose-500/20" 
                : operationalStatus === "Degraded" 
                ? "bg-amber-500/10 text-amber-500 border-amber-500/20" 
                : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            }`}
          >
            {operationalStatus}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
