import React from "react"
import { Shield, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"

interface SecurityBestPracticesProps {
  onLearnMoreClick: () => void
}

export const SecurityBestPractices: React.FC<SecurityBestPracticesProps> = ({ onLearnMoreClick }) => {
  return (
    <Card className="border border-border/80 bg-card/30 backdrop-blur-md shadow-lg p-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-3.5 items-center">
          <div className="p-2.5 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 shrink-0">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Security Best Practices</p>
            <p className="text-xs text-muted-foreground mt-0.5">Use strong passwords, rotate keys regularly, and never share your admin credentials.</p>
          </div>
        </div>
        <button 
          type="button"
          onClick={onLearnMoreClick}
          className="flex items-center gap-1.5 px-4 py-2 border border-rose-500/30 hover:bg-rose-500/10 rounded-lg text-rose-500 hover:text-rose-400 font-semibold text-xs transition-all w-full sm:w-auto justify-center"
        >
          <span>Learn More</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </Card>
  )
}
