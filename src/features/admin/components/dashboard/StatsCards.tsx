import React from "react"
import { Users, Activity, MessageSquare, ShieldAlert } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { AdminStats } from "../../data/mockAdminData"

interface StatsCardsProps {
  stats: AdminStats | null
  loading: boolean
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, loading }) => {
  if (loading || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse bg-card/40 border-border/50 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-muted rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const statItems = [
    {
      title: "Total Accounts",
      value: stats.totalUsers,
      description: "Registered profiles",
      icon: Users,
      color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-500",
    },
    {
      title: "Live Users Online",
      value: stats.activeUsers,
      description: "Active websocket tunnels",
      icon: Activity,
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-500",
      showLiveDot: true,
    },
    {
      title: "Active Groups",
      value: stats.totalGroups,
      description: "Discussion channels",
      icon: MessageSquare,
      color: "from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-500",
    },
    {
      title: "Reports Flagged",
      value: stats.reportedMessages,
      description: "Pending system moderation",
      icon: ShieldAlert,
      color: stats.reportedMessages > 0 
        ? "from-rose-500/20 to-orange-500/20 border-rose-500/30 text-rose-500" 
        : "from-gray-500/20 to-slate-500/20 border-gray-500/30 text-muted-foreground",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, idx) => {
        const Icon = item.icon
        return (
          <Card 
            key={idx} 
            className="relative overflow-hidden bg-card/40 border border-border/80 hover:border-border/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
          >
            {/* Gradient background glow */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-gradient-to-br ${item.color} opacity-20 blur-xl pointer-events-none`} />
            
            {/* Premium Dots Decoration Design */}
            <div className="absolute right-4 top-4 opacity-[0.06] pointer-events-none text-foreground select-none">
              <svg width="45" height="30" viewBox="0 0 45 30" fill="currentColor">
                <circle cx="5" cy="5" r="1.5" />
                <circle cx="15" cy="5" r="1.5" />
                <circle cx="25" cy="5" r="1.5" />
                <circle cx="35" cy="5" r="1.5" />
                
                <circle cx="5" cy="15" r="1.5" />
                <circle cx="15" cy="15" r="1.5" />
                <circle cx="25" cy="15" r="1.5" />
                <circle cx="35" cy="15" r="1.5" />
                
                <circle cx="5" cy="25" r="1.5" />
                <circle cx="15" cy="25" r="1.5" />
                <circle cx="25" cy="25" r="1.5" />
                <circle cx="35" cy="25" r="1.5" />
              </svg>
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <span className="text-sm font-medium text-muted-foreground tracking-wide">
                  {item.title}
                </span>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} border flex items-center gap-1.5`}>
                  {item.showLiveDot && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping absolute top-5 right-5" />
                  )}
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-foreground font-mono">
                  {item.value}
                </span>
                {item.showLiveDot && (
                  <span className="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 animate-pulse">
                    Live
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 font-medium">
                {item.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
