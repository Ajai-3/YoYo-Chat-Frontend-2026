import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import loginHero from "@/assets/auth/login_hero.png"

export const Hero: React.FC = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-brand to-primary bg-clip-text text-transparent">
            Connect Instantly, Chat Seamlessly
          </h1>

          <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-muted-foreground leading-relaxed">
            Experience the next generation of messaging. YoYo Chat combines cutting-edge performance with a stunning user interface to keep you connected with the people who matter most.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link 
              to="/register" 
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand px-8 text-base font-semibold text-brand-foreground hover:bg-brand/90 transition-all shadow-xl hover:shadow-brand/30 shadow-transparent gap-2 group"
            >
              Start Chatting Free
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#features" 
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card/40 backdrop-blur-md px-8 text-base font-medium text-foreground hover:bg-accent/20 transition-all gap-2"
            >
              Explore Features
            </a>
          </div>

          {/* Micro Stats */}
          <div className="pt-8 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 border-t border-border/50">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">99.9%</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Uptime SLA</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">&lt; 50ms</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Latency Delivery</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">100%</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Secure Encryption</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand/10 to-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative w-full max-w-[380px] md:max-w-[440px] animate-float">
            <img 
              src={loginHero} 
              alt="YoYo Chat Application Preview" 
              className="w-full h-auto object-contain mix-blend-screen drop-shadow-[0_20px_40px_rgba(var(--brand),0.25)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
