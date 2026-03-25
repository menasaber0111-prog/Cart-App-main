'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import imgLogo from '../../../assets/image/freshcart-logo.svg'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { DropdownMenuBasic } from '../dropDown/DropDown'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CartResponse } from '@/types/cart-interface'
import { ShoppingBag } from 'lucide-react'

export default function Navbar() {
  const queryClient = useQueryClient();
  
  const {isLoading: cartLoading, isError: cartError, data: cartData, refetch: refetchCartData} = useQuery<CartResponse>({
    queryKey: ['cart-navbar'],
    queryFn: async () => {
      const resp = await fetch('/api/cart', { credentials: 'include' })
      if (!resp.ok) throw new Error('Failed to fetch cart');
      const payload = await resp.json()
      return payload
    },
    staleTime: 0,
    refetchOnWindowFocus: false
  });
  
  const {status, data: session} = useSession();
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (status === 'authenticated') {
        refetchCartData();
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [status, refetchCartData]);
  
  function logout(){
    signOut({ callbackUrl: '/login' })
  }
  
  const [isOpen, setisOpen] = useState(false)
  function toggleNav(){
    setisOpen(!isOpen)
  }
  
  let path = [
    {href: '/', content: 'Home'},
    {href: '/categories', content: 'Category'},
    {href: '/brands', content: 'Brands'},
  ]
  
  let authPath = [
    {href: '/login', content: 'Login'},
    {href: '/register', content: 'Register'}
  ]

  const updateCartCount = async () => {
    await queryClient.invalidateQueries({ queryKey: ['cart-navbar'] });
    await refetchCartData();
  };

  const cartItemCount = cartData?.numOfCartItems || 0;

  return <>
    <nav className="bg-neutral-primary bg-gray-200 py-2  ">
      <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap md:gap-16 items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse  pt-4">
          <Image width={200} height={100} src={imgLogo} alt="logo" />
        </a>
        <button 
          onClick={toggleNav}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" />
          </svg>
        </button>
        <div className={`${!isOpen && 'hidden'} w-full md:flex justify-between`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            {path.map((elem) => (
              <li key={elem.content}>
                <Link 
                  href={elem.href}
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                >
                  {elem.content}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="font-medium flex justify-center items-center flex-col p-4 md:p-0 mt-4 rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            {status === 'authenticated' ? (
              <>
                <li>HI, {session?.user?.name}</li>
                
                {/* Cart بس */}
                <li className='relative'>
                  <Link href='/cart' onClick={updateCartCount}>
                    {cartItemCount > 0 && (
                      <span className='w-[25px] h-[25px] flex justify-center items-center absolute bg-green-500 start-2 -top-[18px] rounded-full text-white text-xs font-bold'>
                        {cartItemCount}
                      </span>
                    )}
                    <ShoppingBag className="size-6 text-gray-700 hover:text-green-500 transition-colors" />
                  </Link>
                </li>


                <DropdownMenuBasic logout={logout}/>
              </>
            ) : (
              authPath.map((elem) => (
                <li key={elem.content}>
                  <Link
                    href={elem.href}
                    className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                  >
                    {elem.content}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  </>
}
