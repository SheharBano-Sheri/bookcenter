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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-4">
                Welcome to Book Center
              </h1>
              <p className="text-xl mb-8">
                Your one-stop destination for books, stationery, school bags, and educational supplies.
                Quality products at affordable prices!
              </p>
              <Link
                href="/products"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Wide Selection</h3>
                <p className="text-gray-600 text-sm">Thousands of books and products</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-gray-600 text-sm">Quick and reliable shipping</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Easy Shopping</h3>
                <p className="text-gray-600 text-sm">Simple checkout, no signup needed</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality Products</h3>
                <p className="text-gray-600 text-sm">Authentic and verified items</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.name}`}
                    className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition group"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-110 transition">
                      {category.name === 'Books' && '📚'}
                      {category.name === 'Stationery' && '✏️'}
                      {category.name === 'Bags' && '🎒'}
                      {category.name === 'Accessories' && '📎'}
                      {!['Books', 'Stationery', 'Bags', 'Accessories'].includes(category.name) && '📦'}
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition">
                      {category.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Featured Products</h2>
                <Link
                  href="/products"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
