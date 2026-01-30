'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number | null;
  mainImageUrl: string | null;
  stock: number;
  categoryName?: string;
  available?: boolean;
}

export default function ProductCard({ 
  id, 
  title, 
  price, 
  originalPrice,
  mainImageUrl, 
  stock, 
  categoryName,
  available = true 
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  
  const isOutOfStock = !available || stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error('Product out of stock');
      return;
    }

    addItem({ id, name: title, price, image: mainImageUrl, stock });
    toast.success('Added to cart!');
  };

  return (
    <div className="group relative rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2" style={{backgroundColor: '#F5F3EF', border: '2px solid #D4AF37'}}>
      <Link href={`/products/${id}`}>
        <div className="relative h-64 overflow-hidden" style={{backgroundColor: '#FFF9F5'}}>
          {mainImageUrl ? (
            <Image
              src={mainImageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-6xl group-hover:scale-110 transition-transform duration-500">📚</span>
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-lg bg-black/50 px-6 py-3 rounded-full">Out of Stock</span>
            </div>
          )}
          {originalPrice && originalPrice > price && (
            <div className="absolute top-3 right-3 text-white px-4 py-2 rounded-full text-xs font-bold shadow-md animate-pulse" style={{backgroundColor: '#FF6B35'}}>
              🔥 SALE
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      
      <div className="p-5">
        {categoryName && (
          <span className="inline-block px-3 py-1 text-white text-xs font-semibold rounded-full mb-2" style={{backgroundColor: '#D4AF37'}}>
            {categoryName}
          </span>
        )}
        <Link href={`/products/${id}`}>
          <h3 className="font-bold text-lg mb-3 hover:opacity-70 transition line-clamp-2 min-h-[3.5rem]" style={{color: '#0f0720'}}>
            {title}
          </h3>
        </Link>
        
        <div className="flex items-end justify-between mt-4">
          <div>
            {originalPrice && originalPrice > price ? (
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 line-through">{formatPrice(originalPrice)}</span>
                <span className="text-2xl font-black" style={{color: '#FF6B35'}}>{formatPrice(price)}</span>
              </div>
            ) : (
              <span className="text-2xl font-black" style={{color: '#D4AF37'}}>{formatPrice(price)}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:cursor-not-allowed flex items-center space-x-2 font-semibold"
            style={{backgroundColor: isOutOfStock ? '#9CA3AF' : '#D4AF37'}}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
        
        {stock > 0 && stock < 10 && (
          <p className="text-xs text-orange-600 mt-2">Only {stock} left in stock!</p>
        )}
      </div>
    </div>
  );
}
