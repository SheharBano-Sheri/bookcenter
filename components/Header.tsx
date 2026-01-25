'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { ShoppingCart, Search, BookOpen } from 'lucide-react';

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold hover:opacity-90 transition">
            <BookOpen className="w-8 h-8" />
            <span>Book Center</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link href="/products" className="hover:text-blue-200 transition">
              Products
            </Link>
            <Link href="/products?category=Books" className="hover:text-blue-200 transition">
              Books
            </Link>
            <Link href="/products?category=Stationery" className="hover:text-blue-200 transition">
              Stationery
            </Link>
            <Link href="/products?category=Bags" className="hover:text-blue-200 transition">
              Bags
            </Link>
          </nav>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
