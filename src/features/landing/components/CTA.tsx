import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export const CTA: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-t border-border relative bg-gradient-to-b from-transparent to-brand/5">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Ready to upgrade your messaging experience?
        </h2>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
          Get started today with YoYo Chat. No credit cards needed, no complex setups. Sign up and connect instantly.
        </p>
        <div className="flex justify-center">
          <Link 
            to="/register" 
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-brand px-10 text-lg font-semibold text-brand-foreground hover:bg-brand/90 transition-all shadow-xl hover:shadow-brand/35 shadow-transparent gap-2 active:scale-[0.98]"
          >
            Sign Up Now
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
