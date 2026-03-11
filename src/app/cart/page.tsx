'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { CartResponse } from '@/types/cart-response'
import { deleteCartItem } from '@/servises/cart/delete-cart-item'
import {clearCart } from '@/servises/cart/clear-cart'
import {updateCartItem } from  '@/servises/cart/update-cart-item'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react' // أضف icons
import cartImg from '../../assets/image/cart.png'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Cart() {
  const { status } = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const { data: cartData, isLoading, isError, error } = useQuery<CartResponse>({
    queryKey: ['get-cart'],
    queryFn: async () => {
      const res = await fetch('/api/cart')
      if (!res.ok) throw new Error('Failed to fetch cart')
      return await res.json()
    },
    retry: 1, // قلل retries
    staleTime: 5 * 60 * 1000, // 5 min cache
  })

  // Mutations مع loading states
  const deleteMutation = useMutation({
    mutationFn: (productId: string) => deleteCartItem(productId),
    onSuccess: () => {
      toast.success('Product deleted')
      queryClient.invalidateQueries({ queryKey: ['get-cart'] })
    },
    onError: (err) => toast.error(err.message || 'Error deleting product'),
  })

  const clearMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success('Cart cleared')
      queryClient.invalidateQueries({ queryKey: ['get-cart'] })
    },
    onError: (err) => toast.error(err.message || 'Error clearing cart'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ productId, count }: { productId: string; count: number }) =>
      updateCartItem({ productId, count }),
    onSuccess: () => {
      toast.success('Product updated')
      queryClient.invalidateQueries({ queryKey: ['get-cart'] })
    },
    onError: (err) => toast.error(err.message || 'Error updating product'),
  })

  const handleUpdate = (productId: string, count: number) => {
    if (count < 1) {
      toast.error('Minimum quantity is 1')
      return
    }
    updateMutation.mutate({ productId, count })
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (status === 'unauthenticated' || isError) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-red-500">{error?.message || 'Error loading cart or unauthorized'}</p>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    )
  }

  const totalItems = cartData?.numOfCartItems ?? 0
  const totalPrice = cartData?.data?.totalCartPrice ?? 0

  return (
    <div className="container mx-auto py-8 px-4">
      {totalItems > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Table */}
          <div className="lg:w-3/4">
            <div className="overflow-x-auto shadow-lg rounded-xl border">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Image</th>
                    <th className="px-6 py-4 text-left font-semibold">Product</th>
                    <th className="px-6 py-4 text-left font-semibold">Qty</th>
                    <th className="px-6 py-4 text-left font-semibold">Price</th>
                    <th className="px-6 py-4 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.data?.products.map((prod) => (
                    <tr key={prod._id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <img
                          src={prod.product.imageCover}
                          alt={prod.product.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium max-w-md truncate">
                        {prod.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdate(prod.product._id, prod.count - 1)}
                            disabled={updateMutation.isPending || deleteMutation.isPending}
                          >
                            -
                          </Button>
                          <span className="w-12 text-center font-semibold">{prod.count}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdate(prod.product._id, prod.count + 1)}
                            disabled={updateMutation.isPending || deleteMutation.isPending}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-green-600">
                        {prod.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMutation.mutate(prod.product._id)}
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.variables === prod.product._id ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-1" />
                          ) : (
                            'Delete'
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button 
              onClick={() => clearMutation.mutate()} 
              variant="outline" 
              className="mt-6 w-full"
              disabled={clearMutation.isPending}
            >
              {clearMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Clearing...
                </>
              ) : (
                'Clear Cart'
              )}
            </Button>
          </div>

          {/* Summary */}
          <div className="lg:w-1/4 space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Order Summary
              </h2>
              <div className="space-y-3 text-lg">
                <div>
                  Items: <span className="font-bold text-green-600">{totalItems}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 border-t pt-3">
                  Total: <span className="text-green-600">{totalPrice.toLocaleString()} EGP</span>
                </div>
              </div>
              <Button asChild className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                <Link href={`/checkout/${cartData.cartId}`}>
                  Proceed to Checkout →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <Image src={cartImg} width={300} height={300} alt="Empty cart" className="opacity-75" />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
            <p className="text-gray-500">Add some products to get started</p>
            <Button asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
