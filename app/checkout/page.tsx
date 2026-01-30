'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';
import { CheckCircle, Sparkles, ArrowRight, User, Phone, MapPin, ShieldCheck, CreditCard } from 'lucide-react';
import { FadeIn } from '@/components/ScrollSection';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
  });

  if (items.length === 0) {
    if (typeof window !== 'undefined') router.push('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: getTotalPrice(),
        }),
      });

      if (res.ok) {
        const order = await res.json();
        clearCart();
        toast.success('Order placed successfully!');
        router.push(`/order-success?orderId=${order.id}`);
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to place order');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-accent-cream text-primary-950 selection:bg-accent-gold selection:text-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20 max-w-6xl">
        <FadeIn>
            <div className="text-center mb-16">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-100 bg-white/60 backdrop-blur-md mb-4 shadow-sm">
                    <Sparkles className="w-3 h-3 text-accent-gold" />
                    <span className="tracking-[0.2em] uppercase text-[10px] font-bold text-primary-800">Secure Checkout</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-serif text-primary-950 mb-4">Finalize Order</h1>
                <div className="w-16 h-1 bg-accent-gold mx-auto"></div>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2}>
                <div className="bg-white rounded-3xl p-8 shadow-xl shadow-primary-900/5 border border-white/50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-900 via-accent-gold to-primary-900"></div>
                    
                    <h2 className="text-2xl font-serif text-primary-950 mb-8 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-950 text-white text-sm font-sans font-bold shadow-lg shadow-primary-900/30">1</span>
                        Delivery Details
                    </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                            <User className="w-4 h-4 text-accent-gold" /> Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.customerName}
                            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all outline-none text-primary-950 font-serif"
                            placeholder="e.g. Zubair Khan"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                            <Phone className="w-4 h-4 text-accent-gold" /> Phone Number
                        </label>
                        <input
                            type="tel"
                            required
                            value={formData.customerPhone}
                            onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all outline-none text-primary-950 font-serif"
                            placeholder="e.g. +92 300 1234567"
                        />
                    </div>

                    <div className="space-y-2">
                         <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wider">
                            <MapPin className="w-4 h-4 text-accent-gold" /> Delivery Address
                        </label>
                        <textarea
                            required
                            rows={4}
                            value={formData.customerAddress}
                            onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-accent-gold focus:border-accent-gold transition-all outline-none text-primary-950 font-serif resize-none"
                            placeholder="Street address, City, Province"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary-950 text-white py-5 rounded-full hover:bg-primary-900 hover:scale-[1.01] transition-all duration-300 shadow-lg shadow-primary-950/20 font-serif text-lg font-bold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3 group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {loading ? 'Processing...' : 'Place Order'}
                                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </span>
                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        </button>
                        
                        <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Your data is encrypted and secure</span>
                        </div>
                    </div>
                </form>
                </div>
            </FadeIn>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 relative">
             <FadeIn delay={0.4} className="sticky top-24">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-gray-200/50 border border-white/60">
                  <h2 className="text-2xl font-serif text-primary-950 mb-6 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-gold/20 text-primary-900 text-sm font-sans font-bold">2</span>
                        Order Summary
                  </h2>
                  
                  <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide pr-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center group">
                         {/* Mini Image */}
                         <div className="w-12 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img src={item.image || ''} alt="" className="object-cover w-full h-full" />
                         </div>
                         
                         <div className="flex-grow">
                             <div className="flex justify-between items-start">
                                 <span className="font-serif text-primary-950 font-medium leading-tight group-hover:text-accent-gold transition-colors block max-w-[180px] truncate">
                                    {item.name}
                                 </span>
                                 <span className="text-sm font-bold text-gray-500">{formatPrice(item.price * item.quantity)}</span>
                             </div>
                             <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                         </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-gray-200 my-6"></div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 uppercase tracking-wider font-bold text-xs">Subtotal</span>
                      <span className="font-serif text-lg">{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 uppercase tracking-wider font-bold text-xs">Shipping</span>
                      <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Free</span>
                    </div>
                    
                     <div className="bg-primary-50/50 p-4 rounded-2xl flex justify-between items-end mt-4">
                        <span className="text-primary-900 font-serif text-xl">Total</span>
                        <div className="text-right">
                           <span className="block text-3xl font-serif text-primary-600 leading-none">{formatPrice(getTotalPrice())}</span>
                           <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Inc. Taxes</span>
                        </div>
                    </div>
                  </div>

                   <div className="mt-8 flex gap-3 justify-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                      <CreditCard className="w-6 h-6" /> {/* Placeholder for payment icons */}
                      <div className="w-8 h-5 bg-gray-300 rounded"></div>
                      <div className="w-8 h-5 bg-gray-300 rounded"></div>
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
