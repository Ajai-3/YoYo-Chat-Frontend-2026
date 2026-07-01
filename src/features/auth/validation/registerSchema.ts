import { z } from "zod"

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
})

export type RegisterInput = z.infer<typeof registerSchema>
