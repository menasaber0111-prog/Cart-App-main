'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/schema/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as zod from 'zod'

export default function Login() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get('callback-url')

  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState('')

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur'
  })

  async function submitForm(values: zod.infer<typeof LoginSchema>) {
    setisLoading(true)
    setError('')

    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (response?.ok) {
      toast.success('Login successful')
      router.push(callbackUrl ?? '/products')
    } else {
      setError(response?.error || 'Invalid email or password')
      toast.error('Invalid email or password')
    }

    setisLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-green-300 to-emerald-500 flex items-center justify-center p-6 relative overflow-hidden">

      <div className="absolute top-20 left-10 w-64 h-96 animate-float">
        <div className="relative">
          <svg className="w-full h-full" viewBox="0 0 200 400" fill="none">
            <path d="M50 200 Q100 150 150 200 Q120 250 80 280 Q50 300 50 320 L50 380" fill="#10B981" stroke="#059669" strokeWidth="4"/>
            <path d="M80 180 Q100 160 120 180 Q110 200 100 220" fill="#F59E0B" stroke="#D97706" strokeWidth="3"/>
            <circle cx="100" cy="140" r="25" fill="#FB923C" stroke="#EA580C" strokeWidth="3"/>
            <circle cx="85" cy="130" r="8" fill="white"/>
            <circle cx="115" cy="130" r="8" fill="white"/>
            <circle cx="85" cy="130" r="4" fill="#1F2937"/>
            <circle cx="115" cy="130" r="4" fill="#1F2937"/>
            <path d="M90 250 L110 260 L95 280" fill="#FCD34D"/>
          </svg>

          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm w-20 h-20 flex items-center justify-center border-4 border-white">
            50%<br/>OFF
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 right-20 w-24 h-24">
        <svg viewBox="0 0 100 100" fill="none">
          <rect x="10" y="30" width="80" height="50" rx="8" fill="#EC4899" stroke="#BE185D" strokeWidth="3"/>
          <rect x="40" y="10" width="20" height="25" fill="#FCD34D" stroke="#D97706" strokeWidth="2"/>
          <circle cx="50" cy="55" r="15" fill="#10B981"/>
          <circle cx="50" cy="55" r="8" fill="white"/>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 animate-slide-up">

        <div className="text-center mb-8">
          <h1 className="text-4xl py-3 md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
            Login Now
          </h1>
          <p className="text-gray-600 font-medium text-lg">
            Your one-stop shop for fresh products
          </p>
        </div>

        <div className="text-center mb-8 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Login to continue your shopping experience
          </h2>
          <p className="text-sm text-gray-500">Enter your email</p>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  className='bg-white/80 border-gray-300 hover:border-emerald-400 focus:border-emerald-500 h-14 text-lg'
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  type='password'
                  className='bg-white/80 border-gray-300 hover:border-emerald-400 focus:border-emerald-500 h-14 text-lg'
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button
            disabled={isLoading}
            type='submit'
            className='my-2 w-full h-14 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-lg font-bold shadow-lg'
          >
            {isLoading ? (
              <svg className="size-6 animate-spin" viewBox="0 0 24 24">
                <path d="M12 4V1m0 22v-3m8-8h3M1 12h3m15.364 6.364l2.121 2.121M4.515 4.515l2.121 2.121m12.728 0l2.121-2.121M4.515 19.485l2.121-2.121"/>
              </svg>
            ) : 'Submit'}
          </Button>

        </form>

        <div className="mt-8 text-center">
          <Link
            href="/forgot-password"
            className="text-emerald-600 hover:text-emerald-700 hover:underline text-sm font-medium block"
          >
            Forgot Password?
          </Link>
        </div>

      </div>
    </div>
  )
}