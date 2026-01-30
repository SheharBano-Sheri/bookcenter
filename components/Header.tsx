'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { ShoppingCart, BookOpen, ChevronDown, Menu, X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Categorized data for the Mega Menu
const MEGA_MENU_CATEGORIES = [
  {
    title: "Stationery & School",
    items: [
        "School Book", "Notebook", "Register", "Writing Copy",
        "Pencil", "Ink Pen", "Ball Pen", "Gel pen",
        "Eraser", "Sharpener", "Geometry set", "Scale",
        "Calculator", "Scientific Calculator", "Clip Board"
    ]
  },
  {
    title: "Art & Craft",
    items: [
        "Art And Craft", "Canvas", "Paint Brush", "Oil Colour",
        "Poster Colour", "Water Colour", "Crayon",
        "Glitter", "Clay", "Color Palette",
        "Glue Stick", "UHU Glue", "Glue Gun",
        "Ribbon", "Foam Punch"
    ]
  },
  {
    title: "Office Supplies",
    items: [
        "Office file", "File folder", "Binder File",
        "Stapler Machine", "Stapler Pin", "Punch machine",
        "Paper clip", "Whiteboard", "White Board Marker",
        "Notice Board", "Stamp", "Calculator", "Tape"
    ]
  },
  {
    title: "Lifestyle & Gifts",
    items: [
        "Birthday Item", "Gift Box", "Party poper",
        "Watch", "Wall Clock", "Alarm Clock",
        "Water bottle", "Lunch Box", "Mug",
        "Bag", "Backpack", "Wallet/Pouch"
    ]
  },
  {
    title: "Islamic & Books",
    items: [
        "Quran Pak", "Religious Book", "Islamic Book",
        "Sapara", "Tasbeeh", "Wooden Rahal",
        "Dictionary", "Novel Book", "General Books"
    ]
  }
];

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isHoveringCategories, setIsHoveringCategories] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-primary-950/95 backdrop-blur-md border-b border-white/10 shadow-xl transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-accent-gold/10 rounded-lg group-hover:bg-accent-gold/20 transition-colors">
                 <BookOpen className="w-6 h-6 text-accent-gold" />
            </div>
            <span className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight">
              Zubair <span className="text-accent-gold italic">Book Center</span>
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-10">
            
            {/* Home Link */}
            <Link 
                href="/" 
                className="text-white/90 hover:text-accent-gold font-medium text-sm tracking-wide uppercase transition-colors"
            >
              Home
            </Link>

            {/* Products Link */}
            <Link 
                href="/products" 
                className="text-white/90 hover:text-accent-gold font-medium text-sm tracking-wide uppercase transition-colors"
            >
              Products
            </Link>

            {/* Categories Mega Menu Trigger */}
            <div 
                className="" 
                onMouseEnter={() => setIsHoveringCategories(true)}
                onMouseLeave={() => setIsHoveringCategories(false)}
            >
                <button 
                    className={`flex items-center space-x-1 font-medium text-sm tracking-wide uppercase transition-colors py-4
                        ${isHoveringCategories ? 'text-accent-gold' : 'text-white/90'}
                    `}
                >
                    <span>Categories</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isHoveringCategories ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                    {isHoveringCategories && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 top-full w-full bg-white shadow-2xl border-t border-gray-100 z-[100]"
                        >
                           <div className="container mx-auto px-6 py-8">
                                <div className="grid grid-cols-5 gap-8 relative">
                                     {/* Decorative Background Element */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                                    {MEGA_MENU_CATEGORIES.map((section, idx) => (
                                        <div key={idx} className="space-y-4 relative z-10">
                                            <h3 className="font-serif font-bold text-primary-950 text-lg border-b border-accent-gold/20 pb-2">
                                                {section.title}
                                            </h3>
                                            <ul className="space-y-2">
                                                {section.items.map((item, i) => (
                                                    <li key={i}>
                                                        <Link 
                                                            href={`/products?category=${encodeURIComponent(item)}`}
                                                            className="text-gray-600 hover:text-accent-gold hover:translate-x-1 transition-all duration-200 text-sm block"
                                                        >
                                                            {item}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                    
                                    {/* "View All" Link at bottom */}
                                    <div className="col-span-5 pt-4 mt-2 border-t border-gray-100 text-center">
                                        <Link href="/products" className="text-primary-950 hover:text-accent-gold font-medium text-sm flex items-center justify-center gap-2 group">
                                            View All Categories 
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </Link>
                                    </div>
                                </div>
                           </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <Link
              href="/cart"
              className="relative p-2 text-white/90 hover:text-accent-gold transition-colors group"
            >
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-gold text-primary-950 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>

          
            {/* Mobile Menu Button */}
             <button 
                className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50 relative"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
             >
               {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl md:hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="flex flex-col p-4 bg-white">
              <Link 
                href="/"
                className="px-4 py-3 text-lg font-medium text-primary-950 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products"
                className="px-4 py-3 text-lg font-medium text-primary-950 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              
              <div className="px-4 py-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Categories</h3>
                <div className="space-y-1">
                  {MEGA_MENU_CATEGORIES.map((section, idx) => (
                    <div key={idx} className="border-b border-gray-50 last:border-0">
                      <button
                        onClick={() => setExpandedCategory(expandedCategory === section.title ? null : section.title)}
                        className="flex items-center justify-between w-full py-3 text-left text-primary-950 font-medium hover:text-accent-gold transition-colors"
                      >
                        {section.title}
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${expandedCategory === section.title ? 'rotate-90 text-accent-gold' : 'text-gray-400'}`} />
                      </button>
                      <AnimatePresence>
                        {expandedCategory === section.title && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-gray-50 rounded-lg"
                          >
                            {section.items.map((item, i) => (
                              <li key={i}>
                                <Link
                                  href={`/products?category=${encodeURIComponent(item)}`}
                                  className="block px-4 py-2 text-sm text-gray-600 hover:text-accent-gold pl-8"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
