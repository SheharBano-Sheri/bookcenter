import Link from "next/link";
import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollSection, FadeIn } from "@/components/ScrollSection";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";

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
  // STRICT REQUIREMENT: Only 4 specific categories: Bag, Stationery, Canva, Water Bottle.
  
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
          targetName: "Canva",
          alts: ["Canva", "Canvas", "Art", "Painting"],
          img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop" // Aesthetic Art/Canvas
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
        {/* Hero Section: Zubair Book Center */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
           {/* Background Parallax Layer */}
           <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-accent-cream z-10"></div>
              <img 
                src="https://t4.ftcdn.net/jpg/15/95/21/47/360_F_1595214791_DWUs5KZDRhkXHlsFVCmFSlSK4WNW5HlZ.jpg" 
                alt="Library Background" 
                className="w-full h-50 object-cover opacity-100 animate-scale-slow"
              />
           </div>

           <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <FadeIn>
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary-100 bg-white/60 backdrop-blur-md mb-8 shadow-sm">
                        <Sparkles className="w-4 h-4 text-accent-gold" />
                        <span className="tracking-[0.2em] uppercase text-[10px] font-bold text-primary-800">Since 1995</span>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium tracking-tight mb-6 text-primary-950 leading-[0.9]">
                        Zubair <br /> Book Center
                    </h1>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <p className="text-xl md:text-2xl text-gray-500 font-light max-w-lg mb-10 leading-relaxed font-serif italic lg:mx-0 mx-auto">
                        "Curating knowledge, culture, and craftsmanship for the discerning mind."
                    </p>
                </FadeIn>

                <FadeIn delay={0.6}>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                        <Link href="/products" className="group px-10 py-4 bg-primary-950 text-white rounded-full font-serif text-lg hover:scale-105 transition-transform shadow-2xl flex items-center justify-center gap-3">
                            Start Exploring <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                        </Link>
                        <Link href="#collections" className="px-10 py-4 bg-white border border-gray-200 text-primary-950 rounded-full font-serif text-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                            Our Collections
                        </Link>
                    </div>
                </FadeIn>
              </div>

              {/* Floating Hero Image */}
              <div className="relative order-1 lg:order-2 flex justify-center perspective-1000">
                  <FadeIn delay={0.5} className="relative z-10">
                     <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 ease-out border-[8px] border-white">
                        <img 
                            src="/welcomeimg.png" 
                            alt="Featured Book" 
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent"></div>
                         {/* <div className="absolute bottom-6 left-6 text-white font-serif">
                             <p className="text-sm uppercase tracking-widest mb-1 text-accent-gold">Featured</p>
                             <p className="text-2xl">The Art of Design</p>
                         </div> */}
                     </div>
                  </FadeIn>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-10 right-10 w-24 h-24 bg-accent-gold/20 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-300/30 rounded-full blur-3xl"></div>
              </div>
           </div>
        </section>

        {/* Marquee Separator */}
        <div className="relative py-8 bg-primary-950 overflow-hidden transform -skew-y-2 origin-top-left z-20">
             <div className="flex whitespace-nowrap animate-marquee text-white/20 select-none">
                {[...Array(8)].map((_, i) => (
                    <span key={i} className="text-4xl font-serif italic mx-8">
                        LITERATURE • STATIONERY • ART • ACADEMIA •
                    </span>
                ))}
             </div>
        </div>


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
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[300px_300px] gap-4">
                  {categories.slice(0, 4).map((category, i) => {
                    const bgImage = categoryImages[category.name] || categoryImages["Default"];
                    const isLarge = i === 0 || i === 3; 

                    return (
                      <Link 
                        key={category.id} 
                        href={`/products?category=${category.name}`}
                        className={`group relative rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary-900/20 transition-all duration-700
                            /* Added min-height for mobile so items aren't squashed */
                            min-h-[300px]
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
