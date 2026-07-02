import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, Link } from "react-router-dom"
import { AuthLayout } from "../../auth/layout/AuthLayout"
import { adminLoginSchema, type AdminLoginInput } from "../validation/adminLoginSchema"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/context/ToastContext"

import adminHero from "@/assets/auth/verify_user_hero.png"

export const AdminLoginPage: React.FC = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      identifier: "admin_yoyo",
      password: "adminpassword",
      secretKey: "YOYO-ADMIN-2026",
    },
  })

  const onSubmit = (data: AdminLoginInput) => {
    // Check credentials against admin defaults or just simulate validation
    if (
      (data.identifier === "admin" || data.identifier === "admin_yoyo" || data.identifier === "admin@yoyo.chat") &&
      data.password === "adminpassword" &&
      data.secretKey === "YOYO-ADMIN-2026"
    ) {
      localStorage.setItem("admin_token", "yoyo_admin_secure_session_2026")
      localStorage.setItem("admin_user", data.identifier)
      toast("Admin authenticated successfully", "success")
      navigate("/admin/dashboard")
    } else {
      toast("Invalid admin credentials or secret key", "error")
    }
  }

  return (
    <AuthLayout
      title="Admin Portal"
      subtitle="Verify your identity and secure key to manage the console"
      imageUrl={adminHero}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <div>
          <Label htmlFor="identifier">Admin Username or Email</Label>
          <Input
            id="identifier"
            placeholder="admin or admin@yoyo.chat"
            type="text"
            {...register("identifier")}
            className={errors.identifier ? "border-destructive focus-visible:ring-destructive/30" : ""}
          />
          <p className={`text-xs text-destructive h-4 leading-4 ${errors.identifier ? "visible" : "invisible"}`}>
            {errors.identifier?.message || "\u00A0"}
          </p>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
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
          <Label htmlFor="secretKey">Admin Secret Key</Label>
          <Input
            id="secretKey"
            type="text"
            placeholder="YOYO-XXXX-XXXX"
            {...register("secretKey")}
            className={errors.secretKey ? "border-destructive focus-visible:ring-destructive/30" : "font-mono tracking-wider"}
          />
          <p className={`text-xs text-destructive h-4 leading-4 ${errors.secretKey ? "visible" : "invisible"}`}>
            {errors.secretKey?.message || "\u00A0"}
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand hover:bg-brand/90 text-brand-foreground font-semibold h-10 mt-2"
        >
          {isSubmitting ? "Authenticating..." : "Access Control Panel"}
        </Button>

        <div className="text-center text-xs text-muted-foreground mt-4">
          Looking for customer chat?{" "}
          <Link to="/login" className="text-brand hover:underline font-medium">
            User Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
