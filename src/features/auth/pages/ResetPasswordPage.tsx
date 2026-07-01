import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { resetPasswordSchema, type ResetPasswordInput } from "../validation/resetPasswordSchema"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/context/ToastContext"

import resetPasswordHero from "@/assets/auth/reset_password_hero.png"

export const ResetPasswordPage: React.FC = () => {
  const { toast } = useToast()
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = (_data: ResetPasswordInput) => {
    toast("Password reset successfully!", "success")
    setSuccess(true)
    setTimeout(() => {
      navigate("/login")
    }, 2500)
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter and confirm your new password to reset your credentials"
      imageUrl={resetPasswordHero}
    >
      {success ? (
        <div className="space-y-4">
          <div className="p-3 text-xs text-green-600 bg-green-500/10 border border-green-500/20 rounded-md dark:text-green-400 dark:bg-green-500/5">
            Password reset successfully! Redirecting you to login...
          </div>
          <Link to="/login" className="block text-center text-xs text-brand hover:underline font-medium mt-4">
            Go to login page now
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
          <div>
            <Label htmlFor="password">New Password</Label>
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
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="••••••••"
              {...register("confirmPassword")}
              className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive/30" : ""}
            />
            <p className={`text-xs text-destructive h-4 leading-4 ${errors.confirmPassword ? "visible" : "invisible"}`}>
              {errors.confirmPassword?.message || "\u00A0"}
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand hover:bg-brand/90 text-brand-foreground font-semibold h-10 mt-2"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>

          <div className="text-center text-xs text-muted-foreground mt-4">
            <Link to="/login" className="text-brand hover:underline font-medium">
              Cancel and back to sign in
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  )
}
