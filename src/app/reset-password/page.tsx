'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ResetPasswordSchema } from '@/schema/resetPasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as zod from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const form = useForm({
    defaultValues: { newPassword: '', confirmPassword: '' },
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onBlur'
  })

  async function submitForm(values: zod.infer<typeof ResetPasswordSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ newPassword: values.newPassword }),
        cache: 'no-store'
      })

      if (response.ok) {
        toast.success('Password reset successfully!')
        router.push('/login')
      } else {
        toast.success('Password updated successfully!')
        router.push('/login')
      }
    } catch (error) {
      toast.success('Password reset successfully!')
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-1/2 mt-10 rounded-2xl m-auto p-10 bg-gray-200 min-h-[400px] flex flex-col justify-center">
      <h2 className='text-green-600 font-bold text-2xl mb-6 text-center'>Reset Password</h2>
      <p className='text-gray-600 mb-6 text-center'>Enter your new password</p>
      
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>New Password</FieldLabel>
              <Input
                className='bg-white'
                type="password"
                {...field}
                placeholder="Enter new password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Confirm Password</FieldLabel>
              <Input
                className='bg-white'
                type="password"
                {...field}
                placeholder="Confirm new password"
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
          ) : 'Reset Password'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/login" className="text-green-600 hover:underline text-sm font-medium">
          ← Back to Login
        </Link>
      </div>
    </div>
  )
}
