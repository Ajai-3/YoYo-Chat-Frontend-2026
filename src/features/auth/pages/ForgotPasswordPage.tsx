import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { forgotPasswordSchema, type ForgotPasswordInput } from "../validation/forgotPasswordSchema"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/context/ToastContext"

import forgotPasswordHero from "@/assets/auth/forgot_password_hero.png"

export const ForgotPasswordPage: React.FC = () => {
  const { toast } = useToast()
  const [isSent, setIsSent] = useState(() => {
    const savedTimer = localStorage.getItem("forgot_password_timer")
    return savedTimer ? parseInt(savedTimer) > Date.now() : false
  })
  const [countdown, setCountdown] = useState(() => {
    const savedTimer = localStorage.getItem("forgot_password_timer")
    if (savedTimer) {
      const remaining = Math.ceil((parseInt(savedTimer) - Date.now()) / 1000)
      return remaining > 0 ? remaining : 0
    }
    return 0
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: localStorage.getItem("forgot_password_email") || ""
    }
  })

  useEffect(() => {
    if (countdown <= 0) return

    const timer = setInterval(() => {
      const savedTimer = localStorage.getItem("forgot_password_timer")
      if (savedTimer) {
        const remaining = Math.ceil((parseInt(savedTimer) - Date.now()) / 1000)
        if (remaining > 0) {
          setCountdown(remaining)
        } else {
          setCountdown(0)
          localStorage.removeItem("forgot_password_timer")
          localStorage.removeItem("forgot_password_email")
        }
      } else {
        setCountdown(0)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

  const onSubmit = (data: ForgotPasswordInput) => {
    setIsSent(true)
    const duration = 30
    const targetTime = Date.now() + duration * 1000
    localStorage.setItem("forgot_password_timer", targetTime.toString())
    localStorage.setItem("forgot_password_email", data.email)
    setCountdown(duration)
    toast(`Reset link sent to ${data.email}`, "success")
  }

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive a password reset link"
      imageUrl={forgotPasswordHero}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            {...register("email")}
            disabled={isSubmitting || countdown > 0}
            className={errors.email ? "border-destructive focus-visible:ring-destructive/30" : ""}
          />
          <p className={`text-xs text-destructive h-4 leading-4 ${errors.email ? "visible" : "invisible"}`}>
            {errors.email?.message || "\u00A0"}
          </p>
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting || countdown > 0}
          className="w-full bg-brand hover:bg-brand/90 text-brand-foreground font-semibold h-10"
        >
          {isSubmitting ? "Sending..." : countdown > 0 ? `Resend Link (${countdown}s)` : isSent ? "Resend Link" : "Send Reset Link"}
        </Button>
        
        <div className="text-center text-xs text-muted-foreground mt-4">
          Remember your password?{" "}
          <Link to="/login" className="text-brand hover:underline font-medium">
            Back to sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
