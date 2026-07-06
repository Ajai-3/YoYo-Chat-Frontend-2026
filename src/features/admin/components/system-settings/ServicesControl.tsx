import React from "react"
import * as Icons from "lucide-react"
import { type LucideIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ServiceControlRow } from "../ServiceControlRow"
import type { SystemServiceStatus, LucideIconKey } from "../../types/adminTypes"

interface ServicesControlProps {
  services: SystemServiceStatus
  onToggle: (key: keyof SystemServiceStatus) => void
}

const serviceMetadata: Record<string, { title: string; description: string; icon: string }> = {
  authService: {
    title: "User Authentication Service",
    description: "Controls user sign ups, logins, and validations",
    icon: "Users"
  },
  chatService: {
    title: "WebSocket Connection Core",
    description: "Governs live chat channels, group notifications, and online states",
    icon: "MessageSquare"
  },
  fileUploadService: {
    title: "Media Storage & File Upload API",
    description: "Controls uploading image messages, user avatars, and custom backgrounds",
    icon: "Cloud"
  }
}

export const ServicesControl: React.FC<ServicesControlProps> = ({ services, onToggle }) => {
  return (
    <Card className="border border-border/80 bg-card/30 backdrop-blur-md shadow-xl">
      <CardHeader className="pb-3 border-b border-border/50 bg-card/10">
        <CardTitle className="text-lg flex items-center gap-2.5">
          <Icons.Settings className="h-5 w-5 text-rose-500" />
          Services Status Control
        </CardTitle>
        <CardDescription>
          Temporarily shut down or resume key infrastructure API components
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        {(Object.keys(services) as Array<keyof SystemServiceStatus>).map((key) => {
          const meta = serviceMetadata[key] || {
            title: key.replace(/([A-Z])/g, " $1").trim().replace(/^\w/, (c) => c.toUpperCase()),
            description: "System administrative microservice status controller",
            icon: "Settings"
          }
          
          // Get the dynamic icon component or fallback to Settings
          const IconComponent = (Icons[meta.icon as LucideIconKey] || Icons.Settings) as LucideIcon

          return (
            <ServiceControlRow
              key={key}
              icon={IconComponent}
              title={meta.title}
              description={meta.description}
              isActive={services[key]}
              onToggle={() => onToggle(key)}
            />
          )
        })}
      </CardContent>
    </Card>
  )
}
