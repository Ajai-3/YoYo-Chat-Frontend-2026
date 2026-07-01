import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { registerSchema, type RegisterInput } from "../validation/registerSchema"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/context/ToastContext"

import registerHero from "@/assets/auth/register_hero.png"

export const RegisterPage: React.FC = () => {
  const { toast } = useToast()
  const [isSent, setIsSent] = useState(() => {
    const savedTimer = localStorage.getItem("register_timer")
    return savedTimer ? parseInt(savedTimer) > Date.now() : false
  })
  const [countdown, setCountdown] = useState(() => {
    const savedTimer = localStorage.getItem("register_timer")
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
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: localStorage.getItem("register_name") || "",
      username: localStorage.getItem("register_username") || "",
      email: localStorage.getItem("register_email") || "",
    }
  })

  useEffect(() => {
    if (countdown <= 0) return

    const timer = setInterval(() => {
      const savedTimer = localStorage.getItem("register_timer")
      if (savedTimer) {
        const remaining = Math.ceil((parseInt(savedTimer) - Date.now()) / 1000)
        if (remaining > 0) {
          setCountdown(remaining)
        } else {
          setCountdown(0)
          localStorage.removeItem("register_timer")
          localStorage.removeItem("register_name")
          localStorage.removeItem("register_username")
          localStorage.removeItem("register_email")
        }
      } else {
        setCountdown(0)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

  const onSubmit = (data: RegisterInput) => {
    setIsSent(true)
    const duration = 30
    const targetTime = Date.now() + duration * 1000
    localStorage.setItem("register_timer", targetTime.toString())
    localStorage.setItem("register_name", data.name)
    localStorage.setItem("register_username", data.username)
    localStorage.setItem("register_email", data.email)
    setCountdown(duration)
    toast(`Verification link sent to ${data.email}`, "success")
  }

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Fill in your details to register"
      imageUrl={registerHero}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            type="text"
            {...register("name")}
            disabled={isSubmitting || countdown > 0}
            className={errors.name ? "border-destructive focus-visible:ring-destructive/30" : ""}
          />
          <p className={`text-xs text-destructive h-4 leading-4 ${errors.name ? "visible" : "invisible"}`}>
            {errors.name?.message || "\u00A0"}
          </p>
        </div>

        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="johndoe"
            type="text"
            {...register("username")}
            disabled={isSubmitting || countdown > 0}
            className={errors.username ? "border-destructive focus-visible:ring-destructive/30" : ""}
          />
          <p className={`text-xs text-destructive h-4 leading-4 ${errors.username ? "visible" : "invisible"}`}>
            {errors.username?.message || "\u00A0"}
          </p>
        </div>

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
          className="w-full bg-brand hover:bg-brand/90 text-brand-foreground font-semibold h-10 mt-2"
        >
          {isSubmitting ? "Registering..." : countdown > 0 ? `Resend Link (${countdown}s)` : isSent ? "Resend Link" : "Register"}
        </Button>

        <div className="text-center text-xs text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-brand hover:underline font-medium">
            Sign in instead
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
