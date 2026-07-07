import React from "react"
import { useNavigate } from "react-router-dom"
import { Shield, Key, AlertOctagon, RefreshCw, Eye, ArrowLeft } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const AdminSecurityBestPracticesPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/admin/profile")}
          className="flex items-center gap-2 text-xs"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Button>
        <h1 className="text-xl font-bold tracking-tight text-foreground">Security Best Practices</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-border/80 bg-card/30 backdrop-blur-md shadow-xl">
          <CardHeader>
            <div className="flex gap-3 items-center">
              <div className="p-3 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 shrink-0">
                <Key className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-md">Password Security & Rotation</CardTitle>
                <CardDescription>Rules governing administrative passwords</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3.5 text-sm text-muted-foreground">
            <p>
              Ensure your administrative password is at least 12 characters long, containing uppercase letters, lowercase letters, numbers, and symbols.
            </p>
            <div className="flex items-start gap-2.5 p-3 rounded-lg border border-amber-500/10 bg-amber-500/5 text-xs text-amber-500">
              <AlertOctagon className="h-4.5 w-4.5 shrink-0" />
              <span>Passwords should be updated every 90 days. Avoid reuse of recent passwords.</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/80 bg-card/30 backdrop-blur-md shadow-xl">
          <CardHeader>
            <div className="flex gap-3 items-center">
              <div className="p-3 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-500 shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-md">Console Secret Key Control</CardTitle>
                <CardDescription>Secret API configurations security</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3.5 text-sm text-muted-foreground">
            <p>
              The administrative secret key coordinates multi-factor validations and overrides system blocks. Keep this key offline or stored within encrypted password managers.
            </p>
            <div className="flex items-start gap-2.5 p-3 rounded-lg border border-rose-500/10 bg-rose-500/5 text-xs text-rose-500">
              <AlertOctagon className="h-4.5 w-4.5 shrink-0" />
              <span>Never publish code commits containing hardcoded administrative secret keys.</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/80 bg-card/30 backdrop-blur-md shadow-xl">
          <CardHeader>
            <div className="flex gap-3 items-center">
              <div className="p-3 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-500 shrink-0">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-md">Session Auditing & Rotation</CardTitle>
                <CardDescription>Manage active user sessions safely</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3.5 text-sm text-muted-foreground">
            <p>
              In case of suspicious active socket payloads or spam, admins can trigger system-wide force logouts using the Emergency Panel.
            </p>
            <div className="flex items-start gap-2.5 p-3 rounded-lg border border-blue-500/10 bg-blue-500/5 text-xs text-blue-500">
              <RefreshCw className="h-4.5 w-4.5 shrink-0 animate-spin" />
              <span>Rotating active sockets forces all accounts to safely verify their encryption tunnels.</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/80 bg-card/30 backdrop-blur-md shadow-xl">
          <CardHeader>
            <div className="flex gap-3 items-center">
              <div className="p-3 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 shrink-0">
                <Eye className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-md">Access Control Guidelines</CardTitle>
                <CardDescription>Privileges and logging oversight</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3.5 text-sm text-muted-foreground">
            <p>
              Always adhere to the principle of least privilege. Assign Moderator roles instead of full Admin permissions unless global system-level toggling is required.
            </p>
            <div className="flex items-start gap-2.5 p-3 rounded-lg border border-emerald-500/10 bg-emerald-500/5 text-xs text-emerald-500">
              <Eye className="h-4.5 w-4.5 shrink-0" />
              <span>Review audit logs to identify unexpected configuration updates.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
