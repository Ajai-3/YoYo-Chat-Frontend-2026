import React from "react"
import { Globe, MessageSquare, Server, Database, HardDrive, ChevronRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export const ServiceStatus: React.FC = () => {
  return (
    <Card className="bg-card/30 border-border/80 backdrop-blur-md shadow-xl overflow-hidden flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3 border-b border-border/50 bg-card/10">
          <CardTitle className="text-base font-bold text-foreground">Service Status</CardTitle>
          <CardDescription>Real-time health indicator check of microservices</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-card/25 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="p-3 pl-4">Service</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right pr-4">Uptime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                <tr className="hover:bg-card/20 transition-all">
                  <td className="p-3 pl-4">
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                      <span>User Authentication Service</span>
                    </div>
                  </td>
                  <td className="p-3 text-emerald-500 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span>Healthy</span>
                    </div>
                  </td>
                  <td className="p-3 text-right pr-4 font-mono font-bold text-muted-foreground">99.9%</td>
                </tr>
                <tr className="hover:bg-card/20 transition-all">
                  <td className="p-3 pl-4">
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      <MessageSquare className="h-3.5 w-3.5 text-brand shrink-0" />
                      <span>WebSocket Connection Core</span>
                    </div>
                  </td>
                  <td className="p-3 text-emerald-500 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span>Healthy</span>
                    </div>
                  </td>
                  <td className="p-3 text-right pr-4 font-mono font-bold text-muted-foreground">99.8%</td>
                </tr>
                <tr className="hover:bg-card/20 transition-all">
                  <td className="p-3 pl-4">
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      <Server className="h-3.5 w-3.5 text-violet-500 shrink-0" />
                      <span>Media Storage & File Upload API</span>
                    </div>
                  </td>
                  <td className="p-3 text-emerald-500 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span>Healthy</span>
                    </div>
                  </td>
                  <td className="p-3 text-right pr-4 font-mono font-bold text-muted-foreground">99.7%</td>
                </tr>
                <tr className="hover:bg-card/20 transition-all">
                  <td className="p-3 pl-4">
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      <Database className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                      <span>Database</span>
                    </div>
                  </td>
                  <td className="p-3 text-emerald-500 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span>Healthy</span>
                    </div>
                  </td>
                  <td className="p-3 text-right pr-4 font-mono font-bold text-muted-foreground">99.9%</td>
                </tr>
                <tr className="hover:bg-card/20 transition-all">
                  <td className="p-3 pl-4">
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      <HardDrive className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      <span>Redis Cache</span>
                    </div>
                  </td>
                  <td className="p-3 text-amber-500 font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>Degraded</span>
                    </div>
                  </td>
                  <td className="p-3 text-right pr-4 font-mono font-bold text-muted-foreground">98.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </div>
      <div className="p-3 border-t border-border/30 bg-card/20 flex justify-start">
        <button 
          type="button"
          className="text-xs text-brand hover:underline font-semibold flex items-center gap-1"
        >
          View all services <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </Card>
  )
}
