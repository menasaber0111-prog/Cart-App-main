'use client';

import * as React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FavoriteHeartProps {
  productId: string;
  className?: string;
}

export function FavoriteHeart({ productId, className }: FavoriteHeartProps) {
  const [isFavorite, setIsFavorite] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(`favorite_${productId}`) === 'true';
    }
    return false;
  });
  
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`favorite_${productId}`, isFavorite.toString());
    }
  }, [isFavorite, productId]);

  const toggleFavorite = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsFavorite(!isFavorite);
      setIsLoading(false);
    }, 200);
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite();
      }}
      disabled={isLoading}
      className={cn(
        'p-2 rounded-full hover:bg-red-100 transition-all duration-200 hover:scale-110',
        'flex items-center justify-center relative',
        className
      )}
      aria-label={isFavorite ? '[Favorite]' : 'unFavorite'}
    >
      <Heart 
        className={cn(
          'w-5 h-5 transition-all duration-200',
          isFavorite 
            ? 'fill-red-500 text-red-500 scale-110 shadow-md' 
            : 'text-gray-400 hover:text-red-400 hover:scale-105'
        )}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
          <div className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
}
