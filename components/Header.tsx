'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { ShoppingCart, BookOpen, Sparkles } from 'lucide-react';

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="text-white shadow-lg sticky top-0 z-50" style={{background: 'linear-gradient(135deg, #3C096C 0%, #9D4EDD 50%, #CDB4DB 100%)'}}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-white" />
            <span className="text-2xl font-black text-white" style={{fontStyle: 'italic'}}>Zubair Book Center</span>
          </Link>

          {/* Navigation - Right Side */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-lg font-bold text-white hover:text-[#FFE5D9] transition-colors duration-300" style={{fontStyle: 'italic'}}>
                HOME
              </Link>
              <Link href="/products" className="text-lg font-bold text-white hover:text-[#FFE5D9] transition-colors duration-300" style={{fontStyle: 'italic'}}>
                INFO
              </Link>
              <Link href="/products?category=Books" className="text-lg font-bold text-white hover:text-[#FFE5D9] transition-colors duration-300" style={{fontStyle: 'italic'}}>
                ABOUT
              </Link>
              <Link href="/products?category=Stationery" className="text-lg font-bold text-white hover:text-[#FFE5D9] transition-colors duration-300" style={{fontStyle: 'italic'}}>
                CONTACT
              </Link>
              <Link href="/products?category=Bags" className="text-lg font-bold text-white hover:text-[#FFE5D9] transition-colors duration-300" style={{fontStyle: 'italic'}}>
                FAQ
              </Link>
            </nav>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-white/10 rounded-full transition-all duration-300"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8A5B] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
