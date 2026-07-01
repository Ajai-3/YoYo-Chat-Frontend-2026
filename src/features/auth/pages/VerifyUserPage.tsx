import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { verifyUserSchema, type VerifyUserInput } from "../validation/verifyUserSchema"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/context/ToastContext"

import verifyUserHero from "@/assets/auth/verify_user_hero.png"
import verificationSucess from "@/assets/auth/verification_sucess.png"

export const VerifyUserPage: React.FC = () => {
  const { toast } = useToast()
  const [success, setSuccess] = useState(false)
  const [heroImage, setHeroImage] = useState(verifyUserHero)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyUserInput>({
    resolver: zodResolver(verifyUserSchema),
  })

  const onSubmit = (_data: VerifyUserInput) => {
    toast("Account verified and password created successfully!", "success")
    setSuccess(true)
    setHeroImage(verificationSucess)
  }

  return (
    <AuthLayout
      title={success ? "Account Verified!" : "Verify Account"}
      subtitle={success ? "Your password has been successfully configured" : "Complete your registration by setting up your password"}
      imageUrl={heroImage}
    >
      {success ? (
        <div className="space-y-6 text-center md:text-left">
          <div className="p-4 text-sm text-green-600 bg-green-500/10 border border-green-500/20 rounded-xl dark:text-green-400 dark:bg-green-500/5">
            Verification completed successfully! You can now log in to your account.
          </div>
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-brand hover:bg-brand/90 text-brand-foreground font-semibold h-10"
          >
            Sign In / Login
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
          <div>
            <Label htmlFor="password">Create Password</Label>
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
            <Label htmlFor="confirmPassword">Confirm Password</Label>
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
            {isSubmitting ? "Verifying..." : "Verify & Create Account"}
          </Button>

          <div className="text-center text-xs text-muted-foreground mt-4">
            <Link to="/register" className="text-brand hover:underline font-medium">
              Back to registration
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  )
}
