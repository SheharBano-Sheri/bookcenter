"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ScrollSection({ featuredProducts }: { featuredProducts: any[] }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Adjust the mapping to ensure it scrolls enough but not too fast
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={targetRef} className="relative h-[130vh] bg-accent-cream">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-10 md:px-20">
          {/* Intro Text Card */}
          <div className="relative h-[60vh] w-[400px] shrink-0 flex flex-col justify-center">
            <h2 className="text-6xl md:text-7xl font-serif text-primary-950 mb-6 leading-tight">
              Curated <br /> <span className="text-accent-gold italic hover-underline-animation cursor-pointer">Collections</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-sm">
              Explore our hand-picked selection of premium items, presented in a horizontal journey.
            </p>
            <div className="w-24 h-1 bg-accent-gold"></div>
          </div>

          {/* Product Cards in Horizontal Scroll */}
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative h-[60vh] w-[350px] md:w-[450px] shrink-0 overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${product.mainImageUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"})`,
                }}
              >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <span className="text-accent-gold text-xs uppercase tracking-widest mb-2 block font-bold">
                        {product.category?.name}
                    </span>
                    <h3 className="text-3xl font-serif text-white mb-2 leading-none">{product.title}</h3>
                    <p className="text-white/80 mb-6 text-lg font-medium">${product.price.toFixed(2)}</p>
                    <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-950 rounded-full font-medium hover:bg-accent-gold hover:text-white transition-colors"
                    >
                    View Details
                    </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* End Card */}
           <div className="relative h-[60vh] w-[300px] shrink-0 flex items-center justify-center">
              <Link href="/products" className="group w-40 h-40 rounded-full border border-primary-200 bg-white flex items-center justify-center text-primary-950 hover:bg-primary-950 hover:text-white transition-all hover:scale-110 shadow-xl">
                 <span className="text-xl font-serif italic group-hover:no-underline underline decoration-accent-gold underline-offset-4">View All</span>
              </Link>
           </div>
        </motion.div>
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
