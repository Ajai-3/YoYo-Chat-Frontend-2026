import React, { useState, useEffect } from "react"
import { useToast } from "@/context/ToastContext"
import { apiSimulate, type AdminStats } from "../data/mockAdminData"
import { ServiceStatus } from "../components/dashboard/ServiceStatus"
import { SecurityEvents } from "../components/dashboard/SecurityEvents"
import { StatsCards } from "../components/dashboard/StatsCards"

export const DashboardOverviewPage: React.FC = () => {
  const { toast } = useToast()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)

  const fetchStats = async () => {
    setStatsLoading(true)
    try {
      const data = await apiSimulate.fetchAdminStats()
      setStats(data)
    } catch {
      toast("Failed to query live dashboard statistics", "error")
    } finally {
      setStatsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    // Poll stats occasionally
    const interval = setInterval(() => {
      apiSimulate.fetchAdminStats().then(setStats).catch(() => {})
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">

      <StatsCards  stats={stats} loading={statsLoading} />


            {/* Service Status & Recent Security Events Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {/* Service Status Card */}
        <ServiceStatus />

        {/* Recent Security Events Card */}
        <SecurityEvents />
      </div>
    </div>
  )
}
