'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string | null;
  stock: number;
  category: string;
}

export default function ProductCard({ id, name, price, image, stock, category }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (stock <= 0) {
      toast.error('Product out of stock');
      return;
    }

    addItem({ id, name, price, image, stock });
    toast.success('Added to cart!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
      <Link href={`/products/${id}`}>
        <div className="relative h-64 bg-gray-100">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-4xl">📚</span>
            </div>
          )}
          {stock <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <p className="text-xs text-blue-600 font-semibold mb-1">{category}</p>
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition line-clamp-2">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">{formatPrice(price)}</span>
          <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
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
