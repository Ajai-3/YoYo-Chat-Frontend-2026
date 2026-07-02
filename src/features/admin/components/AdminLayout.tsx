import React, { useState, useEffect } from "react"
import { NavLink, Outlet, useNavigate, Navigate, useLocation } from "react-router-dom"
import { useTheme } from "@/context/ThemeContext"
import { useToast } from "@/context/ToastContext"
import { 
  Sun, 
  Moon, 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  KeyRound,
  Shield
} from "lucide-react"
import logoIcon from "@/assets/logo-icon.png"
import { ConfirmationModal } from "../components/ConfirmationModal"
import { apiSimulate, type AdminStats } from "../data/mockAdminData"

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { toast } = useToast()
  
  const location = useLocation()
  
  const getHeaderTitle = () => {
    const path = location.pathname
    if (path.endsWith("/admin/dashboard")) return "System Core Analytics"
    if (path.endsWith("/admin/users")) return "User Management Console"
    if (path.endsWith("/admin/groups")) return "Group Directory Control"
    if (path.endsWith("/admin/settings")) return "Global Settings Configuration"
    if (path.endsWith("/admin/profile")) return "Admin Settings & Profile"
    if (path.endsWith("/admin/security-best-practices")) return "Security Best Practices"
    return "YoYo Control Center"
  }

  const getHeaderIcon = () => {
    const path = location.pathname
    if (path.endsWith("/admin/dashboard")) return LayoutDashboard
    if (path.endsWith("/admin/users")) return Users
    if (path.endsWith("/admin/groups")) return MessageSquare
    if (path.endsWith("/admin/settings")) return Settings
    if (path.endsWith("/admin/profile")) return KeyRound
    if (path.endsWith("/admin/security-best-practices")) return Shield
    return Settings
  }

  // Guard check
  const token = localStorage.getItem("admin_token")
  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  const [adminName, setAdminName] = useState(() => localStorage.getItem("admin_user") || "admin_yoyo")
  const [adminDisplayName, setAdminDisplayName] = useState(() => localStorage.getItem("admin_display_name") || "YoYo Lead Admin")
  const [adminAvatarUrl, setAdminAvatarUrl] = useState(() => localStorage.getItem("admin_avatar_url") || "https://api.dicebear.com/7.x/pixel-art/svg?seed=admin")

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const [stats, setStats] = useState<AdminStats | null>(null)

  useEffect(() => {
    // Listen for avatar updates in localStorage
    const handleStorageChange = () => {
      setAdminName(localStorage.getItem("admin_user") || "admin_yoyo")
      setAdminDisplayName(localStorage.getItem("admin_display_name") || "YoYo Lead Admin")
      setAdminAvatarUrl(localStorage.getItem("admin_avatar_url") || "https://api.dicebear.com/7.x/pixel-art/svg?seed=admin")
    }
    window.addEventListener("storage", handleStorageChange)
    
    // Fetch stats for sidebar badges
    apiSimulate.fetchAdminStats().then(setStats).catch(() => {})

    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleLogout = () => {
    setConfirmLogout(false)
    localStorage.removeItem("admin_token")
    toast("Logged out of administrative portal successfully", "success")
    navigate("/admin/login")
  }

  const navItems = [
    { to: "/admin/dashboard", label: "Overview Stats", icon: LayoutDashboard },
    { to: "/admin/users", label: "User Management", icon: Users, count: stats?.totalUsers },
    { to: "/admin/groups", label: "Group Management", icon: MessageSquare, count: stats?.totalGroups, color: "text-violet-500 bg-violet-500/10 border-violet-500/20" },
    { to: "/admin/settings", label: "System Settings", icon: Settings },
    { to: "/admin/profile", label: "Admin Profile", icon: KeyRound }
  ]

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground transition-colors duration-500 flex">
      {/* Mobile Sidebar Overlay/Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/45 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 bg-card/45 backdrop-blur-xl border-r border-border transform transition-all duration-300 md:relative md:translate-x-0 shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="h-full flex flex-col justify-between p-4">
          <div className="space-y-6">
            {/* Header Brand */}
            <div className={`flex ${sidebarCollapsed ? "flex-col items-center gap-4" : "items-center justify-between"} w-full`}>
              <div className="flex items-center gap-3 overflow-hidden">
                <img src={logoIcon} alt="YoYo" className="h-9 w-9 object-contain shrink-0" />
                {!sidebarCollapsed && (
                  <div className="animate-in fade-in slide-in-from-left-2 duration-200">
                    <span className="font-extrabold tracking-wide bg-gradient-to-r from-brand via-violet-500 to-indigo-500 bg-clip-text text-transparent text-md">YoYo Admin</span>
                    <p className="text-[9px] uppercase font-extrabold tracking-widest text-muted-foreground">Management Panel</p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className={`hidden md:flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card/60 hover:bg-accent/40 text-muted-foreground hover:text-foreground shrink-0 transition-all active:scale-95`}
              >
                {sidebarCollapsed ? <ChevronRight className="h-4.5 w-4.5" /> : <ChevronLeft className="h-4.5 w-4.5" />}
              </button>
            </div>

            {/* Sidebar Navigation Menu */}
            <nav className="space-y-1.5 pt-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => 
                      `w-full flex items-center rounded-xl text-sm font-semibold transition-all duration-300 p-3.5 ${
                        sidebarCollapsed ? "justify-center" : "justify-between"
                      } ${
                        isActive
                          ? `bg-brand/10 text-brand ${sidebarCollapsed ? "" : "border-l-4 border-brand pl-2.5"}`
                          : "text-muted-foreground hover:bg-accent/45 hover:text-foreground"
                      }`
                    }
                    title={item.label}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0" />
                      {!sidebarCollapsed && <span className="animate-in fade-in duration-200">{item.label}</span>}
                    </div>
                    {!sidebarCollapsed && item.count !== undefined && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full animate-in fade-in duration-200 font-mono ${
                        item.color || "bg-brand/10 text-brand border border-brand/20"
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </NavLink>
                )
              })}
            </nav>
          </div>

          {/* Sidebar Footer details */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <button
              onClick={() => { navigate("/admin/profile"); setSidebarOpen(false) }}
              className={`flex ${sidebarCollapsed ? "justify-center" : "items-center gap-3"} px-1 overflow-hidden w-full text-left hover:bg-accent/20 p-2 rounded-xl transition-all`}
              title="View Profile Settings"
            >
              <img
                src={adminAvatarUrl}
                alt="Admin Avatar"
                className="h-8 w-8 rounded-full border border-brand/20 shrink-0 object-cover bg-card"
              />
              {!sidebarCollapsed && (
                <div className="truncate animate-in fade-in duration-200">
                  <p className="text-xs font-bold text-foreground">@{adminName}</p>
                  <p className="text-[9px] text-muted-foreground font-mono">{adminDisplayName}</p>
                </div>
              )}
            </button>

            <button
              onClick={() => setConfirmLogout(true)}
              className={`w-full flex items-center rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-500/10 transition-all duration-300 p-3.5 ${
                sidebarCollapsed ? "justify-center" : "gap-3"
              }`}
              title="Sign Out"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span className="animate-in fade-in duration-200">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header navbar */}
        <header className="h-16 border-b border-border bg-card/25 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg border border-border text-foreground bg-card/60"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="text-lg font-bold capitalize hidden sm:flex items-center gap-2.5">
              {React.createElement(getHeaderIcon(), { className: "h-5 w-5 text-brand shrink-0" })}
              {getHeaderTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="h-10 w-10 border border-border bg-card/50 hover:bg-accent/40 rounded-lg flex items-center justify-center text-foreground transition-all"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="size-5 text-brand" /> : <Sun className="size-5 text-yellow-400" />}
            </button>
          </div>
        </header>

        {/* Dynamic Outlet with 16px Padding */}
        <main className="p-4 flex-1 overflow-y-auto w-full mx-auto space-y-6 bg-background/30">
          <Outlet />
        </main>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmLogout}
        title="Admin Sign Out"
        message="Are you sure you want to end your administrative session? You will need to enter your secure access credentials to access the console again."
        variant="warning"
        confirmText="Sign Out Console"
        onConfirm={handleLogout}
        onCancel={() => setConfirmLogout(false)}
      />
    </div>
  )
}
