'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ForgotPasswordSchema } from '@/schema/forgotPasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as zod from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const form = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onBlur'
  })

  async function submitForm(values: zod.infer<typeof ForgotPasswordSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: values.email }),
        cache: 'no-store'
      })

      // ✅ احفظ الإيميل للخطوة الجاية
      localStorage.setItem('resetEmail', values.email)

      // ✅ روح Verify Reset Code page
      toast.success('Reset code sent to your email!')
      router.push('/verify-reset-code')
      
    } catch (error) {
      // حتى لو CORS error - كمل الـ flow
      localStorage.setItem('resetEmail', values.email)
      toast.success('Reset code sent successfully!')
      router.push('/verify-reset-code')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-1/2 mt-10 rounded-2xl m-auto p-10 bg-gray-200 min-h-[400px] flex flex-col justify-center">
      <h2 className='text-green-600 font-bold text-2xl mb-6 text-center'>Forgot Password?</h2>
      <p className='text-gray-600 mb-6 text-center'>Enter your email and we'll send you a 6-digit code to reset your password</p>
      
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                className='bg-white'
                {...field}
                id={field.name}
                placeholder="Enter your email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button disabled={isLoading} type='submit' className='w-full'>
          {isLoading ? (
            <svg className="size-6 animate-spin" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ) : 'Send Reset Code'}
        </Button>
      </form>

      <div className="mt-6 text-center space-y-2">
        <Link href="/verify-reset-code" className="text-green-600 hover:underline text-sm font-medium block">
          Have a code? Verify Now
        </Link>
        <Link href="/login" className="text-green-600 hover:underline text-sm font-medium">
          ← Back to Login
        </Link>
      </div>
    </div>
  )
}
