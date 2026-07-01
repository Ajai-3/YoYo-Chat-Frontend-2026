import React from "react"
import { useTheme } from "@/context/ThemeContext"
import { Sun, Moon } from "lucide-react"

import logoImg from "@/assets/logo.png"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  imageUrl: string
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, imageUrl }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-500 p-4 md:p-8">
      {/* Background glowing decorations */}
      <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] rounded-full bg-brand/20 blur-[130px] dark:bg-brand/10 pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[130px] dark:bg-primary/10 pointer-events-none animate-pulse [animation-delay:2s]" />

      {/* Floating Theme Toggle Switch */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/60 backdrop-blur-md text-foreground hover:bg-accent/20 transition-all duration-300 shadow-sm"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="size-5 text-brand" /> : <Sun className="size-5 text-yellow-400" />}
        </button>
      </div>

      {/* Large Box Wrapper */}
      <div className="w-full max-w-4xl z-10 flex flex-col md:flex-row border border-border bg-card/30 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 min-h-[550px]">
        {/* Left Side: Illustration / Banner */}
        <div className="hidden md:flex relative md:w-[45%] flex-col items-center justify-center p-8 bg-gradient-to-b from-brand/10 to-primary/10 border-r border-border min-h-[500px]">
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
          
          {/* Logo Header */}
          <div className="absolute top-6 left-8">
            <img src={logoImg} alt="YoYo Chat" className="h-10 object-contain" />
          </div>

          {/* Hero Image */}
          <div className="w-full max-w-[240px] md:max-w-[280px] flex items-center justify-center mt-8">
            <img 
              src={imageUrl} 
              alt="auth illustration" 
              className="w-full h-auto object-contain mix-blend-screen drop-shadow-[0_10px_20px_rgba(var(--brand),0.15)] dark:drop-shadow-[0_15px_30px_rgba(255,255,255,0.05)]"
            />
          </div>
          
          <div className="mt-6 text-center px-4 hidden md:block">
            <p className="text-sm font-semibold tracking-wide uppercase text-brand/80">Connect instantly</p>
            <p className="text-xs text-muted-foreground mt-1">Join the futuristic, seamless chat experience.</p>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="w-full md:w-[55%] p-6 sm:p-8 md:p-12 flex flex-col bg-card/20 min-h-[500px] md:min-h-0">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-6 md:hidden">
            <img src={logoImg} alt="YoYo Chat" className="h-10 object-contain" />
          </div>

          <div className="w-full max-w-sm sm:max-w-md mx-auto flex-1 flex flex-col justify-center">
            <div className="flex flex-col space-y-2 mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
