'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Schema} from '@/schema/RejesterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { log } from 'console'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as zod from 'zod'

export default function Register() {
  const router = useRouter()
  
  // Loading state زي الـ login
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    resolver: zodResolver(Schema)
  })

  async function submitForm(values: zod.infer<typeof Schema>) {
    setIsLoading(true)
    console.log(values);
    
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json'
      }
    })

    const payload = await response.json()
    console.log(payload);
    
    if (payload.message === 'success') {
      toast.success('Registration successful!')
      router.push('/login')
    } else {
      toast.error('Account Already Exists')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-green-300 to-emerald-500 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Character with 50% Off */}
      <div className="absolute top-20 left-10 w-64 h-96 animate-float">
        <div className="relative">
          <svg className="w-full h-full" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      {/* Gift Box Bottom Right */}
      <div className="absolute bottom-20 right-20 w-24 h-24">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="30" width="80" height="50" rx="8" fill="#EC4899" stroke="#BE185D" strokeWidth="3"/>
          <rect x="40" y="10" width="20" height="25" fill="#FCD34D" stroke="#D97706" strokeWidth="2"/>
          <circle cx="50" cy="55" r="15" fill="#10B981"/>
          <circle cx="50" cy="55" r="8" fill="white"/>
        </svg>
      </div>

      {/* Main Register Container */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 animate-slide-up">
        {/* FreshCart Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
           Register Now
          </h1>
          <p className="text-gray-600 font-medium text-lg">Your one-stop shop for fresh products</p>
        </div>

        {/* Register Title */}
        <div className="text-center mb-8 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create your account</h2>
          <p className="text-sm text-gray-500">Join us and start shopping fresh products</p>
        </div>

        {/* Original Form - Unchanged Structure */}
        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">
          {/* Name Field */}
          <div>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    className='bg-white/80 backdrop-blur-sm border-gray-300 hover:border-emerald-400 focus:border-emerald-500 h-14 text-lg'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your full name"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          {/* Email Field */}
          <div>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    className='bg-white/80 backdrop-blur-sm border-gray-300 hover:border-emerald-400 focus:border-emerald-500 h-14 text-lg'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          {/* Password Field */}
          <div>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    type='password'
                    className='bg-white/80 backdrop-blur-sm border-gray-300 hover:border-emerald-400 focus:border-emerald-500 h-14 text-lg'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Create a password"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          {/* Re-password Field */}
          <div>
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <Input
                    type='password'
                    className='bg-white/80 backdrop-blur-sm border-gray-300 hover:border-emerald-400 focus:border-emerald-500 h-14 text-lg'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm your password"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          {/* Phone Field */}
          <div>
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                  <Input
                    className='bg-white/80 backdrop-blur-sm border-gray-300 hover:border-emerald-400 focus:border-emerald-500 h-14 text-lg'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your phone number"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          {/* Submit Button with Loading */}
          <Button 
            disabled={isLoading} 
            type='submit' 
            className='my-2 w-full h-14 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-lg font-bold shadow-lg'
          >
            {isLoading ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            ) : 'Create Account'}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
