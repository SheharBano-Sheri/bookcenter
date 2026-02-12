import Link from "next/link";
import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollSection } from "@/components/ScrollSection";
import {
  ArrowRight,
} from "lucide-react";

import HeroCarousel from "@/components/HeroCarousel";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  /* Fetch Categories - Get enough to filter specifically */
  const [featuredProducts, allCategories] = await Promise.all([
    prisma.product.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
    prisma.category.findMany({
      take: 20, /* Fetch more to ensure we find required ones */
    }),
  ]);

  // Hero Images
  const heroImages = [
    "/P1.jpeg",
    "/P3.jpeg",
    "/P4.jpeg",
    "/P5.jpeg",
  ];

  // Aesthetic Images for Categories
  const categoryImages: Record<string, string> = {
    "Books": "/categories/book.png",
    "Book": "/categories/book.png",
    "Stationery": "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=800&auto=format&fit=crop", // Updated match
    "Stationary": "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=800&auto=format&fit=crop", // Updated match
    "Pencil": "/categories/pencil.png",
    "Pencils": "/categories/pencil.png",
    "Bags": "https://www.pngkey.com/png/detail/87-875146_school-bag-png-picture-waterproof-school-backpack-assorted.png", // Updated match
    "Bag": "https://www.pngkey.com/png/detail/87-875146_school-bag-png-picture-waterproof-school-backpack-assorted.png", // Updated match
    "Accessories": "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=800&auto=format&fit=crop", // NEW: Product/Accessories
    "Game": "/categories/game.png",
    "Games": "/categories/game.png",
    "Quran Pak": "/categories/quran.png",
    "Default": "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?q=80&w=800&auto=format&fit=crop" // NEW: Abstract/Interior
  };

  // Filter Categories for "Curated Collections"
  // STRICT REQUIREMENT: Only 4 specific categories: Bag, Stationery, Canvas, Water Bottle.
  
  // Define strict items
  const forcedItems = [
      { 
          targetName: "Bag", 
          alts: ["Bag", "Bags"], 
          img: "https://www.pngkey.com/png/detail/87-875146_school-bag-png-picture-waterproof-school-backpack-assorted.png" // User defined
      },
      { 
          targetName: "Stationery", 
          alts: ["Stationery", "Stationary"], 
          img: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=800&auto=format&fit=crop" // User defined
      },
      {
          targetName: "Canvas",
          alts: ["Canvas", "Canva", "Art", "Painting"],
          img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop" // Aesthetic Art/Canvas
      },
      {
          targetName: "Water bottle",
          alts: ["Water Bottle", "Bottle", "Flask"],
          img: "https://www.happyhouse.com.pk/cdn/shop/files/All_Bottles.jpg?v=1747145409" // Aesthetic Water Bottle
      },
  ];

  // Resolve Items (Find in DB or Mock)
  // We strictly show these 4.
  const curatedCategories = forcedItems.map(item => {
      // Find a matching category in DB just to get an ID if possible
      const match = allCategories.find(c => item.alts.includes(c.name));
      
      return {
          id: match?.id || `static-${item.targetName.toLowerCase().replace(/\s+/g, '-')}`, 
          name: item.targetName, 
          imageUrl: item.img, 
      };
  });

  // Keep original categories for the Bento Grid (Our Collections)
  const categories = allCategories; 


  return (
    <div className="min-h-screen flex flex-col bg-accent-cream text-gray-00 selection:bg-accent-gold selection:text-white overflow-x-hidden">
      <Header />

      <main className="flex-grow">
        {/* Marquee Separator */}
        <div className="relative py-4 bg-primary-950 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee text-white select-none">
            {[...Array(16)].map((_, i) => (
              <span
                key={i}
                className="text-sm md:text-base font-serif italic mx-4"
              >
                LITERATURE • STATIONERY • ART • ACADEMIA •
              </span>
            ))}
          </div>
        </div>



        {/* Hero Section: Zubair Book Center */}
        <section className="relative w-full">
            <HeroCarousel images={heroImages} />
        </section>

        {/* Marquee Separator */}
        


        {/* Horizontal Scroll Section: Curated Collections (Now Categories) */}
        {curatedCategories.length > 0 && <ScrollSection categories={curatedCategories} />}

        {/* Bento Grid Categories */}
        {categories.length > 0 && (
          <section id="collections" className="pt-0 pb-32 px-4 bg-accent-cream relative">
            <div className="container mx-auto">
               <div className="text-center mb-24">
                  <span className="text-accent-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Departments</span>
                  <h2 className="text-6xl font-serif text-primary-950">Our Collections</h2>
               </div>
                <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-[300px_300px] gap-4">
                  {categories.slice(0, 4).map((category, i) => {
                    const bgImage = categoryImages[category.name] || categoryImages["Default"];
                    const isLarge = i === 0 || i === 3; 

                    return (
                      <Link 
                        key={category.id} 
                        href={`/products?category=${category.name}`}
                        className={`group relative rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary-900/20 transition-all duration-700
                            /* Added min-height for mobile so items aren't squashed */
                            min-h-[200px] md:min-h-[300px]
                            ${isLarge ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'}
                        `}
                      >
                        {/* Background Image */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                          style={{ backgroundImage: `url(${bgImage})` }}
                        ></div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        
                        {/* Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                          <h3 className={`font-serif text-white mb-2 leading-none group-hover:text-accent-gold transition-colors
                              /* Adjusted text size for mobile vs desktop */
                              ${isLarge ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}
                          `}>
                              {category.name}
                          </h3>
                          <div className="h-px w-12 bg-white/50 group-hover:w-full transition-all duration-500"></div>
                        </div>
                        
                        {/* Hover Reveal Button */}
                        <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
            </div>
          </section>
        )}

        {/* Product Grid (More Treasures) */}
        {featuredProducts.length > 0 && (
            <section className="py-24 bg-[#FDFBF7]"> 
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-serif text-primary-950 mb-4">
                          More <span className="text-accent-gold italic">Treasures</span>
                        </h2>
                        <div className="w-24 h-1 bg-accent-gold mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {featuredProducts.map((product) => (
                           <ProductCard 
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                mainImageUrl={product.mainImageUrl}
                                stock={product.stock}
                                categoryName={product.category?.name}
                                available={true} 
                           />
                        ))}
                    </div>
                </div>
            </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
