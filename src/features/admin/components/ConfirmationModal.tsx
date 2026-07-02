import React from "react"
import { AlertTriangle, ShieldAlert, CheckCircle, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ConfirmationModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: "danger" | "warning" | "success" | "info"
  onConfirm: () => void
  onCancel: () => void
  children?: React.ReactNode
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm Action",
  cancelText = "Cancel",
  variant = "info",
  onConfirm,
  onCancel,
  children
}) => {
  if (!isOpen) return null

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: ShieldAlert,
          iconClass: "text-rose-500 bg-rose-500/10 border-rose-500/20",
          buttonClass: "bg-rose-600 hover:bg-rose-500 text-white",
          borderClass: "border-rose-500/30",
        }
      case "warning":
        return {
          icon: AlertTriangle,
          iconClass: "text-amber-500 bg-amber-500/10 border-amber-500/20",
          buttonClass: "bg-amber-500 hover:bg-amber-400 text-black font-semibold",
          borderClass: "border-amber-500/30",
        }
      case "success":
        return {
          icon: CheckCircle,
          iconClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
          buttonClass: "bg-emerald-600 hover:bg-emerald-500 text-white",
          borderClass: "border-emerald-500/30",
        }
      case "info":
      default:
        return {
          icon: Info,
          iconClass: "text-brand bg-brand/10 border-brand/20",
          buttonClass: "bg-brand hover:bg-brand/90 text-brand-foreground",
          borderClass: "border-brand/30",
        }
    }
  }

  const styles = getVariantStyles()
  const IconComponent = styles.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <Card className={`w-full max-w-md bg-card/95 border ${styles.borderClass} shadow-2xl relative animate-in zoom-in-95 duration-200 backdrop-blur-xl`}>
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <CardHeader className="pt-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg border ${styles.iconClass}`}>
              <IconComponent className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">{title}</CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {message}
          </p>

          {children && (
            <div className="mt-2 p-3 bg-muted/30 border border-border/50 rounded-xl">
              {children}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="bg-transparent border-border hover:bg-accent/40 text-foreground"
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className={styles.buttonClass}
            >
              {confirmText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
