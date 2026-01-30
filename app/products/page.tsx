import { prisma } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface SearchParams {
  category?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { category, search, minPrice, maxPrice } = params;

  // Build query filters
  const where: any = {};
  
  if (category) {
    where.category = { name: category };
  }
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { isbn: { contains: search, mode: 'insensitive' } },
      { sku: { contains: search, mode: 'insensitive' } },
    ];
  }
  
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.category.findMany(),
  ]);

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#F5F3EF'}}>
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-2" style={{color: '#0f0720', fontStyle: 'italic'}}>
            {category ? `${category}` : 'All Products'}
          </h1>
          <p style={{color: '#0f0720', opacity: 0.7}}>✨ Discover our amazing collection</p>
        </div>

        {/* Filters */}
        <div className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 mb-8" style={{backgroundColor: 'white', border: '2px solid #D4AF37'}}>
          <h2 className="text-xl font-bold mb-6" style={{color: '#0f0720', fontStyle: 'italic'}}>🔍 Filter Products</h2>
          <form method="get" className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by name..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-[#D4AF37] hover:border-[#D4AF37] transition-colors" style={{outline: 'none'}}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                defaultValue={category || ''}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#D4AF37] hover:border-[#D4AF37] transition-colors" style={{outline: 'none'}}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                defaultValue={minPrice}
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#D4AF37] hover:border-[#D4AF37] transition-colors" style={{outline: 'none'}}
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                defaultValue={maxPrice}
                min="0"
                step="0.01"
                placeholder="999.99"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-[#D4AF37] hover:border-[#D4AF37] transition-colors" style={{outline: 'none'}}
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-4">
              <button
                type="submit"
                className="text-white px-8 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold" style={{backgroundColor: '#D4AF37'}}
              >
                <Search className="w-5 h-5" />
                <span>Apply Filters</span>
              </button>
            </div>
          </form>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
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
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 text-xl font-semibold">No products found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
