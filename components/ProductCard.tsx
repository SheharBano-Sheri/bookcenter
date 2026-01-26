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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
      <Link href={`/products/${id}`}>
        <div className="relative h-64 bg-gray-100">
          {mainImageUrl ? (
            <Image
              src={mainImageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-4xl">📚</span>
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
          {originalPrice && originalPrice > price && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              SALE
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        {categoryName && (
          <p className="text-xs text-blue-600 font-semibold mb-1">{categoryName}</p>
        )}
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            {originalPrice && originalPrice > price ? (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</span>
                <span className="text-2xl font-bold text-red-600">{formatPrice(price)}</span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-blue-600">{formatPrice(price)}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
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
