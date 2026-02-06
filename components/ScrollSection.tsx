"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ScrollSection({ categories }: { categories: any[] }) {
  return (
    <section className="py-24 bg-accent-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif text-primary-950 mb-4">
              Curated <span className="text-accent-gold italic">Collections</span>
            </h2>
             <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our hand-picked selection of premium items, selected just for you.
            </p>
            <div className="w-24 h-1 bg-accent-gold mx-auto mt-6"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {categories.map((category, index) => (
                <FadeIn key={category.id} delay={index * 0.1}>
                    <Link href={`/products?category=${category.name}`}>
                        <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                                {/* Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{
                                backgroundImage: `url(${category.imageUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"})`,
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8">
                                <span className="text-accent-gold text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 font-bold translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    Explore
                                </span>
                                <h3 className="text-lg md:text-2xl font-serif text-white mb-1 md:mb-2 leading-tight">{category.name}</h3>
                                <div className="flex items-center justify-between mt-1 md:mt-2">
                                    <p className="text-white/90 text-sm md:text-lg font-medium">Collection</p>
                                    <div
                                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-accent-gold border border-white/30 transition-colors"
                                    >
                                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </FadeIn>
            ))}
        </div>

        {/* Footer Button */}
        <div className="mt-16 text-center">
             <Link href="#collections" className="inline-flex items-center gap-2 px-10 py-4 bg-primary-950 text-white rounded-full font-serif text-lg hover:bg-primary-900 transition-all hover:scale-105 shadow-xl">
                 View All Categories <ArrowRight className="w-5 h-5"/>
             </Link>
        </div>
      </div>
    </section>
  );
}

export function HeroParallax() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Can add Client Side Parallax logic here later if needed */}
        </div>
    )
}

export function FadeIn({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
