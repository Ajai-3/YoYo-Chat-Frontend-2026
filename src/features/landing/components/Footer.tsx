import React from "react"
import logoIcon from "@/assets/logo-icon.png"

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/80 bg-background py-12 text-center text-sm text-muted-foreground transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logoIcon} alt="YoYo Chat icon" className="h-8 w-8 object-contain" />
          <span className="font-bold text-foreground tracking-tight">YoYo Chat</span>
        </div>
        <p>© 2026 YoYo Chat. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#details" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#experience" className="hover:text-foreground transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
