import Link from 'next/link';
import { prisma } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BookOpen, Package, ShoppingBag, Star } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch featured products and categories
  const [featuredProducts, categories] = await Promise.all([
    prisma.product.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    }),
    prisma.category.findMany({
      take: 4,
    }),
  ]);

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#F5F3EF'}}>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden" style={{backgroundColor: '#F5F3EF'}}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Illustration */}
              <div className="relative flex justify-center lg:justify-start">
                <div className="relative w-full max-w-md h-80">
                  {/* Modern Bookshelf Background */}
                  <div className="absolute inset-0 rounded-2xl" style={{background: 'linear-gradient(135deg, #F5F1E8 0%, #E8DCC8 100%)', boxShadow: 'inset 0 2px 20px rgba(0,0,0,0.1)'}}></div>
                  
                  {/* Wooden Shelf - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 z-10">
                    <div className="w-full h-3 rounded-b-2xl" style={{background: 'linear-gradient(180deg, #8B4513 0%, #5D2E0C 100%)', boxShadow: '0 4px 12px rgba(0,0,0,0.25)'}}></div>
                    <div className="w-full h-1 opacity-50" style={{background: 'linear-gradient(90deg, transparent 0%, #5D2E0C 50%, transparent 100%)'}}></div>
                  </div>

                  {/* Wooden Shelf - Top */}
                  <div className="absolute top-32 left-0 right-0 z-10">
                    <div className="w-full h-2" style={{background: 'linear-gradient(180deg, #8B4513 0%, #5D2E0C 100%)', boxShadow: '0 2px 8px rgba(0,0,0,0.2)'}}></div>
                  </div>

                  {/* Top Shelf Books */}
                  <div className="absolute top-12 left-4 z-20 flex items-end space-x-1">
                    {/* Book 1 - Burgundy */}
                    <div className="relative w-8 h-20 rounded-t-sm" style={{background: 'linear-gradient(180deg, #8B1538 0%, #5A0F28 100%)', boxShadow: '2px 0 8px rgba(0,0,0,0.3)', borderLeft: '1px solid #A01B42', borderRight: '1px solid #3D0A1C'}}>
                      <div className="absolute top-2 left-0 right-0 h-16 border-t border-white/10"></div>
                      <div className="absolute bottom-2 left-1 right-1 text-[8px] text-white/70 font-serif text-center">NOVELS</div>
                    </div>
                    {/* Book 2 - Navy */}
                    <div className="relative w-9 h-18 rounded-t-sm" style={{background: 'linear-gradient(180deg, #1E3A8A 0%, #0F1D47 100%)', boxShadow: '2px 0 8px rgba(0,0,0,0.3)', borderLeft: '1px solid #2B4BA8', borderRight: '1px solid #0A1228'}}>
                      <div className="absolute top-2 left-0 right-0 h-14 border-t border-white/10"></div>
                      <div className="absolute bottom-2 left-1 right-1 text-[8px] text-white/70 font-serif text-center">PHYSICS</div>
                    </div>
                    {/* Book 3 - Forest Green */}
                    <div className="relative w-8 h-20 rounded-t-sm" style={{background: 'linear-gradient(180deg, #065F46 0%, #033826 100%)', boxShadow: '2px 0 8px rgba(0,0,0,0.3)', borderLeft: '1px solid #097B5A', borderRight: '1px solid #022318'}}>
                      <div className="absolute top-2 left-0 right-0 h-16 border-t border-white/10"></div>
                      <div className="absolute bottom-2 left-1 right-1 text-[8px] text-white/70 font-serif text-center">BIOLOGY</div>
                    </div>
                    {/* Book 4 - Leather Brown */}
                    <div className="relative w-10 h-22 rounded-t-sm" style={{background: 'linear-gradient(180deg, #92400E 0%, #4A1F08 100%)', boxShadow: '2px 0 8px rgba(0,0,0,0.3)', borderLeft: '1px solid #B45309', borderRight: '1px solid #2E1205'}}>
                      <div className="absolute top-2 left-0 right-0 h-18 border-t border-white/10"></div>
                      <div className="absolute bottom-2 left-1 right-1 text-[8px] text-amber-200/80 font-serif text-center">HISTORY</div>
                    </div>
                    {/* Book 5 - Teal */}
                    <div className="relative w-8 h-19 rounded-t-sm" style={{background: 'linear-gradient(180deg, #0F766E 0%, #073B36 100%)', boxShadow: '2px 0 8px rgba(0,0,0,0.3)', borderLeft: '1px solid #14B8A6', borderRight: '1px solid #042522'}}>
                      <div className="absolute top-2 left-0 right-0 h-15 border-t border-white/10"></div>
                      <div className="absolute bottom-2 left-1 right-1 text-[8px] text-white/70 font-serif text-center">GEOGRAPHY</div>
                    </div>
                  </div>

                  {/* Bottom Shelf Books */}
                  <div className="absolute bottom-3 left-4 z-20 flex items-end space-x-1">
                    {/* Large Textbook */}
                    <div className="relative w-12 h-28 rounded-t-sm" style={{background: 'linear-gradient(180deg, #7C2D12 0%, #3C1408 100%)', boxShadow: '2px 0 10px rgba(0,0,0,0.4)', borderLeft: '1px solid #9A3412', borderRight: '1px solid #1C0A04'}}>
                      <div className="absolute top-3 left-0 right-0 h-24 border-t border-white/10"></div>
                      <div className="absolute top-4 left-1.5 right-1.5 space-y-0.5">
                        <div className="h-px bg-amber-200/20"></div>
                        <div className="h-px bg-amber-200/20"></div>
                        <div className="h-px bg-amber-200/20"></div>
                      </div>
                      <div className="absolute bottom-3 left-1 right-1 text-[9px] text-amber-200/70 font-bold text-center leading-tight">MATHEMATICS</div>
                    </div>
                    {/* Medium Book Purple */}
                    <div className="relative w-10 h-24 rounded-t-sm" style={{background: 'linear-gradient(180deg, #6B21A8 0%, #3B0764 100%)', boxShadow: '2px 0 10px rgba(0,0,0,0.4)', borderLeft: '1px solid #7E22CE', borderRight: '1px solid #1E0336'}}>
                      <div className="absolute top-2 left-0 right-0 h-20 border-t border-white/10"></div>
                      <div className="absolute bottom-2 left-1 right-1 text-[8px] text-purple-200/80 font-serif text-center">CHEMISTRY</div>
                    </div>
                    {/* Medium Book Emerald */}
                    <div className="relative w-9 h-26 rounded-t-sm" style={{background: 'linear-gradient(180deg, #047857 0%, #023B2C 100%)', boxShadow: '2px 0 10px rgba(0,0,0,0.4)', borderLeft: '1px solid #059669', borderRight: '1px solid #011F18'}}>
                      <div className="absolute top-2 left-0 right-0 h-22 border-t border-white/10"></div>
                      <div className="absolute bottom-2 left-1 right-1 text-[8px] text-emerald-200/80 font-serif text-center">ENGLISH</div>
                    </div>
                    {/* Slim Book Red */}
                    <div className="relative w-7 h-22 rounded-t-sm" style={{background: 'linear-gradient(180deg, #B91C1C 0%, #5F0E0E 100%)', boxShadow: '2px 0 10px rgba(0,0,0,0.4)', borderLeft: '1px solid #DC2626', borderRight: '1px solid #3A0606'}}>
                      <div className="absolute top-2 left-0 right-0 h-18 border-t border-white/10"></div>
                      <div className="absolute bottom-2 left-0.5 right-0.5 text-[7px] text-red-200/80 font-serif text-center">POETRY</div>
                    </div>
                  </div>

                  {/* Realistic Notebook */}
                  <div className="absolute bottom-3 right-4 z-20" style={{transform: 'rotate(-3deg)'}}>
                    <div className="relative w-24 h-16 rounded-sm shadow-lg" style={{background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', boxShadow: '0 4px 12px rgba(0,0,0,0.25)', border: '1px solid #F59E0B'}}>
                      <div className="absolute top-3 left-2 right-2 space-y-1.5">
                        <div className="h-px bg-blue-400/30"></div>
                        <div className="h-px bg-blue-400/30"></div>
                        <div className="h-px bg-blue-400/30"></div>
                        <div className="h-px bg-blue-400/30"></div>
                        <div className="h-px bg-blue-400/30"></div>
                      </div>
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-red-800 rounded-l-sm"></div>
                    </div>
                  </div>

                  {/* Stationery Cup */}
                  <div className="absolute top-14 right-6 z-20">
                    <div className="relative w-16 h-20">
                      <div className="absolute bottom-0 w-16 h-16 rounded-lg shadow-lg" style={{background: 'linear-gradient(180deg, #E5E7EB 0%, #9CA3AF 100%)', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid #6B7280'}}>
                        <div className="absolute inset-2 top-2 border-t-2 border-white/40"></div>
                      </div>
                      <div className="absolute bottom-14 left-2 w-2 h-10 rounded-full shadow-sm" style={{background: 'linear-gradient(180deg, #FCD34D 0%, #F59E0B 100%)', transform: 'rotate(-8deg)'}}></div>
                      <div className="absolute bottom-14 left-5 w-2 h-12 rounded-full shadow-sm" style={{background: 'linear-gradient(180deg, #3B82F6 0%, #1E40AF 100%)', transform: 'rotate(-2deg)'}}></div>
                      <div className="absolute bottom-14 left-8 w-2 h-11 rounded-full shadow-sm" style={{background: 'linear-gradient(180deg, #EF4444 0%, #B91C1C 100%)', transform: 'rotate(4deg)'}}></div>
                      <div className="absolute bottom-14 left-11 w-2 h-10 rounded-full shadow-sm" style={{background: 'linear-gradient(180deg, #10B981 0%, #047857 100%)', transform: 'rotate(8deg)'}}></div>
                    </div>
                  </div>

                  {/* Desk Lamp */}
                  <div className="absolute top-6 left-6 z-25">
                    <div className="w-8 h-2 rounded-full" style={{background: 'linear-gradient(180deg, #52525B 0%, #27272A 100%)', boxShadow: '0 2px 6px rgba(0,0,0,0.4)'}}></div>
                    <div className="absolute top-1 left-3 w-1 h-12 rounded-full" style={{background: 'linear-gradient(180deg, #52525B 0%, #27272A 100%)', transform: 'rotate(-25deg)', transformOrigin: 'bottom'}}></div>
                    <div className="absolute -top-3 -left-2 w-12 h-8 rounded-b-2xl" style={{background: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)'}}>
                      <div className="absolute bottom-1 left-2 right-2 h-4 bg-yellow-200/40 rounded-full blur-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Text Content */}
              <div className="text-left lg:text-left space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight" style={{color: '#3C096C', fontStyle: 'italic'}}>
                  Zubair Book <span style={{color: '#9D4EDD'}}>Center</span>
                </h1>
                <p className="text-lg md:text-xl leading-relaxed max-w-xl" style={{color: '#3C096C', fontStyle: 'italic', fontWeight: '600'}}>
                  Your premier destination for academic excellence and literary exploration.
                </p>
                <div>
                  <Link
                    href="/products"
                    className="inline-block px-12 py-4 rounded-full font-bold text-xl text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    style={{backgroundColor: '#3C096C', fontStyle: 'italic'}}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#CDB4DB]/30">
                <div className="bg-gradient-to-br from-[#CDB4DB] to-[#9D4EDD] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-[#3C096C]">Wide Selection</h3>
                <p className="text-gray-600">Thousands of books and products</p>
              </div>
              <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#9D4EDD]/30">
                <div className="bg-gradient-to-br from-[#9D4EDD] to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-[#3C096C]">Fast Delivery</h3>
                <p className="text-gray-600">Quick and reliable shipping</p>
              </div>
              <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#CDB4DB]/30">
                <div className="bg-gradient-to-br from-[#CDB4DB] to-[#9D4EDD] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <ShoppingBag className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-[#3C096C]">Easy Shopping</h3>
                <p className="text-gray-600">Simple checkout, no signup needed</p>
              </div>
              <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#9D4EDD]/30">
                <div className="bg-gradient-to-br from-[#9D4EDD] to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-[#3C096C]">Quality Products</h3>
                <p className="text-gray-600">Authentic and verified items</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Shop by Category</h2>
                <p className="text-gray-600 text-lg">Explore our wide range of products</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.name}`}
                    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
                    <div className="relative z-10">
                      <div className="text-6xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 inline-block">
                        {category.name === 'Books' && '📚'}
                        {category.name === 'Stationery' && '✏️'}
                        {category.name === 'Bags' && '🎒'}
                        {category.name === 'Accessories' && '📎'}
                        {!['Books', 'Stationery', 'Bags', 'Accessories'].includes(category.name) && '📦'}
                      </div>
                      <h3 className="font-bold text-xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] bg-clip-text text-transparent">Featured Products</h2>
                  <p className="text-gray-600">🔥 Hot deals and bestsellers</p>
                </div>
                <Link
                  href="/products"
                  className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <span>View All</span>
                  <span>→</span>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                    available={product.available ?? true}
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
