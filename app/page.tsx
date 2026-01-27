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
  const [featuredProducts, categories] = await Promise.all([
    prisma.product.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
    prisma.category.findMany({
      take: 5,
    }),
  ]);

  // Aesthetic Images for Categories
  const categoryImages: Record<string, string> = {
    "Books": "/categories/book.png",
    "Book": "/categories/book.png",
    "Stationery": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop",
    "Pencil": "/categories/pencil.png",
    "Pencils": "/categories/pencil.png",
    "Bags": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    "Accessories": "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=800&auto=format&fit=crop",
    "Game": "/categories/game.png",
    "Games": "/categories/game.png",
    "Quran Pak": "/categories/quran.png",
    "Default": "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop"
  };

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
                        <span className="tracking-[0.2em] uppercase text-[10px] font-bold text-primary-800">Established 1995</span>
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
                            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop" 
                            alt="Featured Book" 
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent"></div>
                         <div className="absolute bottom-6 left-6 text-white font-serif">
                             <p className="text-sm uppercase tracking-widest mb-1 text-accent-gold">Featured</p>
                             <p className="text-2xl">The Art of Design</p>
                         </div>
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

        {/* Horizontal Scroll Section: Featured */}
        {featuredProducts.length > 0 && <ScrollSection featuredProducts={featuredProducts.slice(0, 5)} />}

        {/* Bento Grid Categories */}
        {categories.length > 0 && (
          <section id="collections" className="pt-0 pb-32 px-4 bg-accent-cream relative">
            <div className="container mx-auto">
               <div className="text-center mb-24">
                  <span className="text-accent-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Departments</span>
                  <h2 className="text-6xl font-serif text-primary-950">Our Collections</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-[300px_300px] gap-4">
                  {categories.slice(0, 5).map((category, i) => {
                      const bgImage = categoryImages[category.name] || categoryImages["Default"];
                      const isLarge = i === 0 || i === 3; // Make 1st and 4th item large
                      
                      return (
                        <Link 
                            key={category.id} 
                            href={`/products?category=${category.name}`}
                            className={`group relative rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary-900/20 transition-all duration-700
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
                                    ${isLarge ? 'text-5xl' : 'text-3xl'}
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

        {/* Product Grid (Remaining Items) */}
        {featuredProducts.length > 5 && (
            <section className="py-32 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-serif text-center mb-16">More Treasures</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.slice(5).map((product) => (
                           <div key={product.id} className="group">
                                <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-4 relative">
                                    {product.mainImageUrl ? (
                                        <img src={product.mainImageUrl} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300"><BookOpen/></div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                       <Link href={`/products/${product.id}`} className="px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-accent-gold transition-colors">
                                          View Item
                                       </Link>
                                    </div>
                                </div>
                                <h4 className="text-lg font-serif">{product.title}</h4>
                                <p className="text-gray-500">${product.price.toFixed(2)}</p>
                           </div>
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
