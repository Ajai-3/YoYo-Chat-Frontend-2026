import { z } from "zod"

export const adminLoginSchema = z.object({
  identifier: z
    .string()
    .min(3, { message: "Admin Username or Email must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  secretKey: z
    .string()
    .min(4, { message: "Admin security secret key must be at least 4 characters" }),
})

export type AdminLoginInput = z.infer<typeof adminLoginSchema>
