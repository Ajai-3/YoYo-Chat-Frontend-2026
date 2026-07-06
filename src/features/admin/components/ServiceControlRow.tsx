import React from "react"
import { type LucideIcon, Check, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServiceControlRowProps {
  icon: LucideIcon
  title: string
  description: string
  isActive: boolean
  onToggle: () => void
  colorClass?: string
}

export const ServiceControlRow: React.FC<ServiceControlRowProps> = ({
  icon: Icon,
  title,
  description,
  isActive,
  onToggle,
  colorClass = "border-rose-500/25 bg-rose-500/10 text-rose-500"
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 border border-border/50 rounded-xl bg-card/25 hover:bg-card/40 transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-full border shrink-0 ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <Button
        size="sm"
        onClick={onToggle}
        className={`w-full sm:w-28 text-xs font-bold h-9 border flex items-center justify-center gap-1.5 rounded-lg transition-all shrink-0 ${
          isActive 
            ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10" 
            : "border-rose-500/30 text-rose-500 bg-rose-500/5 hover:bg-rose-500/10"
        }`}
      >
        {isActive ? (
          <>
            <Check className="h-3.5 w-3.5" />
            <span>Active</span>
          </>
        ) : (
          <>
            <Lock className="h-3.5 w-3.5" />
            <span>Blocked</span>
          </>
        )}
      </Button>
    </div>
  )
}
