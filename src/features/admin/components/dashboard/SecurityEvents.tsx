import React from "react"
import { AlertTriangle, Info, ShieldCheck } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export const SecurityEvents: React.FC = () => {
  return (
    <Card className="bg-card/30 border-border/80 backdrop-blur-md shadow-xl overflow-hidden flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3 border-b border-border/50 bg-card/10 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base font-bold text-foreground">Recent Security Events</CardTitle>
            <CardDescription>System log monitoring signals</CardDescription>
          </div>
          <button type="button" className="text-xs text-brand hover:underline font-semibold font-mono">View all</button>
        </CardHeader>
        <CardContent className="p-4 space-y-3.5">
          {/* Event 1 */}
          <div className="flex items-center justify-between text-xs hover:bg-card/20 p-1.5 rounded-lg transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 shrink-0">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-foreground">Failed admin login attempt</p>
                <p className="text-[10px] text-muted-foreground font-mono mt-0.5">IP: 192.168.1.45</p>
              </div>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground font-mono">2m ago</span>
          </div>

          {/* Event 2 */}
          <div className="flex items-center justify-between text-xs hover:bg-card/20 p-1.5 rounded-lg transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-foreground">Unusual WebSocket connection rate</p>
                <p className="text-[10px] text-muted-foreground font-mono mt-0.5">IP: 203.0.113.12</p>
              </div>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground font-mono">15m ago</span>
          </div>

          {/* Event 3 */}
          <div className="flex items-center justify-between text-xs hover:bg-card/20 p-1.5 rounded-lg transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 shrink-0">
                <Info className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-foreground">API key created</p>
                <p className="text-[10px] text-muted-foreground font-mono mt-0.5">By admin_yoyo</p>
              </div>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground font-mono">1h ago</span>
          </div>

          {/* Event 4 */}
          <div className="flex items-center justify-between text-xs hover:bg-card/20 p-1.5 rounded-lg transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-foreground">User role updated</p>
                <p className="text-[10px] text-muted-foreground font-mono mt-0.5">user_123 &rarr; Moderator</p>
              </div>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground font-mono">3h ago</span>
          </div>

          {/* Event 5 */}
          <div className="flex items-center justify-between text-xs hover:bg-card/20 p-1.5 rounded-lg transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 shrink-0">
                <Info className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-foreground">System configuration updated</p>
                <p className="text-[10px] text-muted-foreground font-mono mt-0.5">By admin_yoyo</p>
              </div>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground font-mono">5h ago</span>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
