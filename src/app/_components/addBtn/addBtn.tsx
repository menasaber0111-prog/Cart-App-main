'use client'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { addToCart } from '@/servises/cart/add-prod-cart'
import {  useMutation, useQueryClient  } from '@tanstack/react-query'

import React from 'react'
import toast from 'react-hot-toast'


// to cart
export default function AddBtn({productId}:{productId:string}) {
   const queryClient = useQueryClient()
    const {data , error  , isPending , mutate:addProductToCart} = useMutation({
        mutationFn:addToCart,
        onSuccess:(data)=>{
          toast.success(data?.message)
          queryClient.invalidateQueries({
            queryKey:['get-cart'] })
        },
        onError:()=>{
            toast.error('Login first')
        }
    })
    console.log(data);

  

    
  return <>
  

   
   <CardFooter className="flex justify-between">
        <Button onClick={()=>{addProductToCart(productId)}}  >Add to cart </Button>
      </CardFooter>
  
  
  </>
   
  }

