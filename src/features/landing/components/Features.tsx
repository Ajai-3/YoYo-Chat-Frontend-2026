import React from "react"
import { Zap, ShieldCheck, Sparkles, Smartphone, Users, MessageSquare } from "lucide-react"

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 border-t border-border bg-card/10 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-brand">Cutting-Edge Capabilities</h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Everything you expect from a premium messenger</p>
          <p className="text-muted-foreground text-lg">Designed for smooth interaction, rapid delivery, and complete privacy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-md hover:border-brand/35 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 space-y-4 group">
            <div className="h-12 w-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-all duration-300">
              <Zap className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Instant Real-Time Chat</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Send messages, receive instantly. Powered by ultra-low latency sockets keeping your conversations perfectly synchronised with no delays.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-md hover:border-brand/35 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 space-y-4 group">
            <div className="h-12 w-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-all duration-300">
              <ShieldCheck className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Privacy Protection</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Your conversations remain exclusively yours. Robust security practices ensure your metadata, texts, and user files are locked away.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-md hover:border-brand/35 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 space-y-4 group">
            <div className="h-12 w-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-all duration-300">
              <Sparkles className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Gorgeous Theme Support</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Switch themes smoothly between light and dark settings. Beautiful gradients and glowing glassmorphism accents provide visual delight.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-md hover:border-brand/35 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 space-y-4 group">
            <div className="h-12 w-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-all duration-300">
              <Smartphone className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Fully Responsive</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Stay connected on the move. Whether accessing through mobile phones, tablets, or computer desktops, the UI adapts beautifully.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-md hover:border-brand/35 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 space-y-4 group">
            <div className="h-12 w-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-all duration-300">
              <Users className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Group Interactions</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Create spaces to collaborate, chat, and keep up with communities, friends, or working colleagues without platform boundaries.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-md hover:border-brand/35 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 space-y-4 group">
            <div className="h-12 w-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-brand-foreground transition-all duration-300">
              <MessageSquare className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Rich Media Sharing</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Share files, pictures, links, and documents easily inside chat threads with fluid drop-zones and elegant image preview overlays.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
