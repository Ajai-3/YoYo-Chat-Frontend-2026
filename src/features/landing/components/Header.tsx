import React from "react"
import { Link } from "react-router-dom"
import { Sun, Moon } from "lucide-react"
import logoImg from "@/assets/logo.png"
import logoIcon from "@/assets/logo-icon.png"

interface HeaderProps {
  theme: string
  toggleTheme: () => void
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/60 backdrop-blur-md transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoIcon} alt="YoYo Chat Icon" className="h-12 w-12 object-contain sm:hidden" />
          <img src={logoImg} alt="YoYo Chat" className="h-12 object-contain hidden sm:block" />
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#details" className="text-muted-foreground hover:text-foreground transition-colors">Why YoYo</a>
          <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">Experience</a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/60 backdrop-blur-md text-foreground hover:bg-accent/20 transition-all duration-300 shadow-sm"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="size-5 text-brand" /> : <Sun className="size-5 text-yellow-400" />}
          </button>

          <Link 
            to="/login" 
            className="hidden sm:inline-flex text-sm font-medium hover:text-brand transition-colors"
          >
            Sign In
          </Link>

          <Link 
            to="/register" 
            className="inline-flex h-10 items-center justify-center rounded-xl bg-brand px-6 text-sm font-semibold text-brand-foreground hover:bg-brand/90 transition-all shadow-lg hover:shadow-brand/20 shadow-transparent active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
