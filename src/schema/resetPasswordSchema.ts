import * as zod from 'zod'

export const ResetPasswordSchema = zod.object({
  newPassword: zod.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: zod.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})
