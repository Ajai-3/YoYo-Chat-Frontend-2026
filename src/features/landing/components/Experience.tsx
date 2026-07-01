import React from "react"
import { ChevronRight } from "lucide-react"
import registerHero from "@/assets/auth/register_hero.png"

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 flex justify-center">
          <div className="relative w-full max-w-[380px] md:max-w-[440px] animate-float [animation-delay:1.5s]">
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 to-brand/10 rounded-full blur-3xl pointer-events-none" />
            <img 
              src={registerHero} 
              alt="YoYo Chat Account Configuration Preview" 
              className="w-full h-auto object-contain mix-blend-screen drop-shadow-[0_20px_40px_rgba(var(--brand),0.25)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-6 text-center lg:text-left">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-brand">Secure Onboarding</h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Register and verify accounts seamlessly</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We value your security from the very start. Our verified onboarding flows make sure accounts are registered safely, keeping spammers away and assuring a safe chat environment.
          </p>
          <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
            <li className="flex items-center gap-3 text-sm font-medium">
              <div className="size-5 rounded-full bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                <ChevronRight className="size-3" />
              </div>
              Verify email address for account authenticity
            </li>
            <li className="flex items-center gap-3 text-sm font-medium">
              <div className="size-5 rounded-full bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                <ChevronRight className="size-3" />
              </div>
              Robust validation schemas prevent weak credentials
            </li>
            <li className="flex items-center gap-3 text-sm font-medium">
              <div className="size-5 rounded-full bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                <ChevronRight className="size-3" />
              </div>
              Smooth, automated passcode/password recovery
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
