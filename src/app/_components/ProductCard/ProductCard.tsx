'use client';

import { useState } from 'react';
import { ProductItem } from "@/types/productinterface"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import AddBtn from "../addBtn/addBtn"
import { FavoriteHeart } from '../heartBtn/FavoriteHeart';


export function ProductCard({prod}:{prod:ProductItem}) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault(); // منع الـ Link navigation
    e.stopPropagation();
    
    setWishlistLoading(true);
    
    try {
      const method = isInWishlist ? 'DELETE' : 'POST';
      
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          product_id: prod._id 
        }),
      });

      if (response.ok) {
        setIsInWishlist(!isInWishlist);
      }
    } catch (error) {
      console.error('خطأ في الـ wishlist:', error);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 group">
      <Link href={`/productdetails/${prod._id}`} className="block">
        <Image 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          src={prod.imageCover}
          alt={prod.title}
          width={200}
          height={300}
        />
        <CardHeader>
          <CardTitle>{prod.title.split(' ').slice(0,2).join(' ')}</CardTitle>
          <CardDescription className="my-3">
            <div className="flex justify-between">
              <span>{prod.price} EGP</span>
              <span className="flex items-center gap-1">
                {prod.ratingsAverage} 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </span>
            </div>
          </CardDescription>
        </CardHeader>
      </Link>
      
      <CardFooter className="p-4 pt-0 border-t">
        <div className="flex justify-between items-center w-full">
          <AddBtn productId={prod._id}/>  
          <FavoriteHeart productId={prod._id}  />
        </div>
      </CardFooter>
    </Card>
  )
}
