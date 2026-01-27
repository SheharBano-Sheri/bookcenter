'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { FadeIn } from '@/components/ScrollSection';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-accent-cream text-primary-950 selection:bg-accent-gold selection:text-white">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-4 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-3xl pointer-events-none"></div>

          <FadeIn>
            <div className="text-center space-y-8 relative z-10">
              <div className="relative inline-block">
                 <div className="absolute inset-0 bg-white/50 blur-xl rounded-full"></div>
                 <ShoppingBag className="w-20 h-20 text-primary-200 relative z-10 animate-float mx-auto" strokeWidth={1} />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-serif text-primary-950">Your Cart is Empty</h2>
                <div className="w-16 h-1 bg-accent-gold mx-auto"></div>
                <p className="text-gray-500 text-lg font-serif italic max-w-md mx-auto">
                  "A room without books is like a body without a soul."
                </p>
              </div>

              <Link
                href="/products"
                className="group inline-flex items-center gap-2 px-8 py-3 bg-primary-950 text-white rounded-full font-serif text-lg hover:scale-105 transition-transform shadow-xl"
              >
                Start Your Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-accent-cream text-primary-950 selection:bg-accent-gold selection:text-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        <FadeIn delay={0.1}>
            <div className="text-center mb-12">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-100 bg-white/60 backdrop-blur-md mb-4 shadow-sm">
                    <Sparkles className="w-3 h-3 text-accent-gold" />
                    <span className="tracking-[0.2em] uppercase text-[10px] font-bold text-primary-800">Your Selection</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-serif text-primary-950 mb-4">Shopping Cart</h1>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item, index) => (
              <FadeIn key={item.id} delay={0.2 + (index * 0.05)}>
                <div className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-black/5 hover:border-accent-gold/40 relative overflow-hidden">
                    
                    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
                        {/* Product Image - Compact Size */}
                        <div className="relative w-24 h-32 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 shadow-inner group-hover:shadow-md transition-all duration-300">
                        {item.image ? (
                            <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <BookOpen className="w-8 h-8 opacity-50" />
                            </div>
                        )}
                        </div>

                        {/* Product Info & Controls */}
                        <div className="flex-grow flex flex-col justify-between w-full sm:w-auto text-center sm:text-left py-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-serif text-xl text-primary-950 mb-1 leading-tight group-hover:text-primary-700 transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-400 font-medium text-xs tracking-widest uppercase">Premium Edition</p> 
                                </div>
                                
                                {/* Remove Button (Desktop) */}
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="hidden sm:block text-gray-300 hover:text-red-400 transition-colors p-1"
                                    title="Remove item"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 sm:mt-0">
                                <div className="flex items-center space-x-2 bg-gray-50 rounded-full p-1 border border-gray-100">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-primary-950 hover:text-white transition-colors shadow-sm disabled:opacity-50"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="font-serif text-lg text-primary-950 w-8 text-center tabular-nums">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        disabled={item.quantity >= item.stock}
                                        className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-primary-950 hover:text-white transition-colors shadow-sm disabled:opacity-50"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>

                                <div className="text-right">
                                    <p className="font-serif text-lg font-bold text-primary-950">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Mobile Remove Button */}
                         <button
                            onClick={() => removeItem(item.id)}
                            className="sm:hidden text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center gap-1"
                        >
                            <Trash2 className="w-3 h-3" /> Remove
                        </button>
                    </div>
                </div>
              </FadeIn>
            ))}
            
            <FadeIn delay={0.4}>
                <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-950 transition-colors group mt-2 text-sm">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-serif italic">Continue Browsing</span>
                </Link>
            </FadeIn>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 relative">
             <FadeIn delay={0.5} className="sticky top-24">
                <div className="bg-white rounded-2xl p-6 shadow-xl shadow-primary-900/5 border border-white/50 relative overflow-hidden">
                    <h2 className="text-2xl font-serif text-primary-950 mb-6">Summary</h2>
                    
                    <div className="space-y-3 mb-6 text-gray-600">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-sans tracking-wide">Subtotal</span>
                            <span className="font-serif text-lg text-primary-950">{formatPrice(getTotalPrice())}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-sans tracking-wide">Shipping</span>
                            <span className="text-accent-gold font-bold text-xs uppercase tracking-widest">Complimentary</span>
                        </div>
                        <div className="border-t border-dashed border-gray-200 my-4"></div>
                        <div className="flex justify-between items-end">
                            <span className="font-serif text-xl text-primary-950">Total</span>
                            <span className="font-serif text-3xl text-primary-950">{formatPrice(getTotalPrice())}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push('/checkout')}
                        className="w-full bg-primary-950 text-white py-4 rounded-full hover:bg-primary-900 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-primary-950/20 font-serif text-lg flex items-center justify-center gap-2 group"
                    >
                        Checkout
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-2 text-primary-950/40">
                         <Sparkles className="w-3 h-3" />
                         <span className="text-[10px] uppercase tracking-widest font-bold">Secure Payment</span>
                    </div>
                </div>
             </FadeIn>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
