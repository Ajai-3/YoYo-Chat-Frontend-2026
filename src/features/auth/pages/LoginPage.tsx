import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { loginSchema, type LoginInput } from "../validation/loginSchema"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/context/ToastContext"

import loginHero from "@/assets/auth/login_hero.png"

export const LoginPage: React.FC = () => {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginInput) => {
    toast(`Successfully logged in as ${data.identifier}`, "success")
  }

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your credentials to access your account"
      imageUrl={loginHero}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <div>
          <Label htmlFor="identifier">Username or Email</Label>
          <Input
            id="identifier"
            placeholder="name@example.com or username"
            type="text"
            {...register("identifier")}
            className={errors.identifier ? "border-destructive focus-visible:ring-destructive/30" : ""}
          />
          <p className={`text-xs text-destructive h-4 leading-4 ${errors.identifier ? "visible" : "invisible"}`}>
            {errors.identifier?.message || "\u00A0"}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
           <Link
              to="/forgot-password"
              className="text-xs text-brand hover:underline font-medium mb-1"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            {...register("password")}
            className={errors.password ? "border-destructive focus-visible:ring-destructive/30" : ""}
          />
          <p className={`text-xs text-destructive h-4 leading-4 ${errors.password ? "visible" : "invisible"}`}>
            {errors.password?.message || "\u00A0"}
          </p>

          
        </div>

         

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand hover:bg-brand/90 text-brand-foreground font-semibold h-10 mt-2"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>

        <div className="text-center text-xs text-muted-foreground mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-brand hover:underline font-medium">
            Register here
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
