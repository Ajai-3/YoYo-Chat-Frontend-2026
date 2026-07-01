import React from "react"
import { useTheme } from "@/context/ThemeContext"
import { Header } from "../components/Header"
import { Hero } from "../components/Hero"
import { Features } from "../components/Features"
import { Experience } from "../components/Experience"
import { CTA } from "../components/CTA"
import { Footer } from "../components/Footer"

export const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      {/* Background glowing decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand/20 blur-[130px] dark:bg-brand/10 pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[130px] dark:bg-primary/10 pointer-events-none animate-pulse [animation-delay:2s]" />

      {/* Header */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <Hero />

      {/* Features Grid Section */}
      <Features />

      {/* Experience Section */}
      <Experience />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  )
}
