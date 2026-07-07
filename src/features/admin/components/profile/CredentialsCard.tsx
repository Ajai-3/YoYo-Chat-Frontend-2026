import React from "react"
import { Shield, Lock, Key, EyeOff, Eye, ShieldCheck, AlertTriangle } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CredentialsCardProps {
  newAdminPassword: string
  setNewAdminPassword: (val: string) => void
  newSecretKey: string
  setNewSecretKey: (val: string) => void
  showPassword: boolean
  setShowPassword: (val: boolean) => void
  onUpdateCredentials: (e: React.FormEvent) => void
}

export const CredentialsCard: React.FC<CredentialsCardProps> = ({
  newAdminPassword,
  setNewAdminPassword,
  newSecretKey,
  setNewSecretKey,
  showPassword,
  setShowPassword,
  onUpdateCredentials
}) => {
  return (
    <Card className="border border-border/85 bg-card/30 backdrop-blur-md shadow-xl flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3 border-b border-border/50 bg-card/10">
          <div className="flex gap-3 items-center">
            <div className="p-3 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 shrink-0">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Security Settings</CardTitle>
              <CardDescription>Update your console password and administrative credentials</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-5">
          {/* Password Input with eye toggle */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider block">New Console Password</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="w-full h-11 pl-4 pr-10 rounded-lg border border-border bg-card/45 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 dark:bg-[#121214]"
                />
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-rose-500/60" />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="h-11 w-11 border border-border bg-card/45 hover:bg-accent/40 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0 transition-all"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          {/* Password Strength segments bar */}
          {newAdminPassword.length > 0 && (
            <div className="flex items-center gap-3 py-1">
              <div className="flex gap-1.5 items-center text-xs font-bold text-emerald-500">
                <ShieldCheck className="h-4 w-4" />
                <span>Strong Password</span>
              </div>
              <div className="flex-1 flex gap-1 h-1.5 max-w-[200px]">
                <div className="flex-1 bg-emerald-500 rounded-full" />
                <div className="flex-1 bg-emerald-500 rounded-full" />
                <div className="flex-1 bg-emerald-500 rounded-full" />
                <div className="flex-1 bg-emerald-500/20 rounded-full" />
              </div>
            </div>
          )}

          {/* Secret Key Input */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground font-bold uppercase tracking-wider block">New Administrative Secret Key</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. YOYO-KEYS-2026"
                value={newSecretKey}
                onChange={(e) => setNewSecretKey(e.target.value)}
                className="w-full h-11 pl-4 pr-10 rounded-lg border border-border bg-card/45 text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand/30 dark:bg-[#121214]"
              />
              <Key className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-rose-500/60" />
            </div>
            <p className="text-[10px] text-muted-foreground tracking-wide">Use a unique key to improve system security and access control</p>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={onUpdateCredentials}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold h-11 rounded-lg flex items-center justify-center gap-2 transition-all mt-6 shadow-md shadow-blue-600/10"
          >
            <ShieldCheck className="h-4.5 w-4.5" />
            Apply Security Settings
          </Button>
        </CardContent>
      </div>

      <div className="px-6 pb-6">
        {/* Caution alert footer */}
        <div className="flex gap-3 items-center p-3 rounded-lg border border-rose-500/10 bg-rose-500/5 text-muted-foreground text-xs">
          <AlertTriangle className="h-4.5 w-4.5 text-rose-400 shrink-0" />
          <div>
            <p className="font-bold text-foreground">These changes affect your ability to access the console</p>
            <p className="mt-0.5">Ensure you have backup credentials before saving</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
