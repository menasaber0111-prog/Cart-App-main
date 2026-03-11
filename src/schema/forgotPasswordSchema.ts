import * as zod from 'zod'

export const ForgotPasswordSchema = zod.object({
  email: zod.string().email('Invalid email format').min(1, 'Email is required')
})
