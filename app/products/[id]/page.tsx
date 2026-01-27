'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  title: string;
  isbn?: string | null;
  sku?: string | null;
  description?: string | null;
  price: number;
  originalPrice?: number | null;
  mainImageUrl: string | null;
  allImageUrls?: string | null;
  stock: number;
  available?: boolean | null;
  productType?: string | null;
  vendor?: string | null;
  tags?: string | null;
  weight?: string | null;
  variantTitle?: string | null;
  category?: {
    name: string;
  } | null;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;

    const isOutOfStock = !product.available || product.stock <= 0;
    if (isOutOfStock) {
      toast.error('Product out of stock');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.mainImageUrl,
        stock: product.stock,
      });
    }

    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{backgroundColor: '#F5F3EF'}}>
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{borderColor: '#9D4EDD'}}></div>
            <p style={{color: '#3C096C'}}>Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col" style={{backgroundColor: '#F5F3EF'}}>
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg mb-4" style={{color: '#3C096C'}}>Product not found</p>
            <button
              onClick={() => router.push('/products')}
              className="font-semibold hover:opacity-70 transition" style={{color: '#9D4EDD'}}
            >
              ← Back to Products
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#F5F3EF'}}>
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 mb-6 hover:opacity-70 transition" style={{color: '#9D4EDD'}}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{border: '2px solid #9D4EDD'}}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative h-96 rounded-lg overflow-hidden" style={{backgroundColor: '#FFF9F5'}}>
              {product.mainImageUrl ? (
                <Image
                  src={product.mainImageUrl}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-8xl">📚</span>
                </div>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="absolute top-4 right-4 text-white px-3 py-1 rounded-lg text-sm font-bold" style={{backgroundColor: '#FF6B35'}}>
                  SALE
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {product.category && (
                <p className="text-sm font-semibold mb-2" style={{color: '#9D4EDD'}}>{product.category.name}</p>
              )}
              <h1 className="text-4xl font-bold mb-4" style={{color: '#3C096C'}}>{product.title}</h1>
              
              {/* Pricing */}
              <div className="mb-6">
                {product.originalPrice && product.originalPrice > product.price ? (
                  <div>
                    <p className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</p>
                    <p className="text-3xl font-bold" style={{color: '#FF6B35'}}>{formatPrice(product.price)}</p>
                    <p className="text-sm font-semibold" style={{color: '#9D4EDD'}}>
                      Save {formatPrice(product.originalPrice - product.price)}!
                    </p>
                  </div>
                ) : (
                  <p className="text-3xl font-bold" style={{color: '#3C096C'}}>{formatPrice(product.price)}</p>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-2 mb-6 text-sm" style={{color: '#3C096C'}}>
                {product.isbn && (
                  <p><span className="font-semibold">ISBN:</span> {product.isbn}</p>
                )}
                {product.sku && (
                  <p><span className="font-semibold">SKU:</span> {product.sku}</p>
                )}
                {product.vendor && (
                  <p><span className="font-semibold">Vendor:</span> {product.vendor}</p>
                )}
                {product.weight && (
                  <p><span className="font-semibold">Weight:</span> {product.weight}</p>
                )}
                {product.variantTitle && product.variantTitle !== 'Default Title' && (
                  <p><span className="font-semibold">Variant:</span> {product.variantTitle}</p>
                )}
              </div>

              {product.description && (
                <div className="mb-6">
                  <h2 className="font-semibold text-lg mb-2" style={{color: '#3C096C'}}>Description</h2>
                  <div 
                    className="leading-relaxed text-gray-700 space-y-2 [&>h2]:text-lg [&>h2]:font-bold [&>h2]:my-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>li]:pl-1 [&>b]:font-bold"
                    style={{color: '#3C096C', opacity: 0.9}}
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}

              {product.tags && (
                <div className="mb-6">
                  <h2 className="font-semibold text-sm mb-2" style={{color: '#3C096C'}}>Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.split(',').map((tag, i) => (
                      <span key={i} className="text-white px-3 py-1 rounded-full text-xs" style={{backgroundColor: '#9D4EDD'}}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-6">
                {product.available && product.stock > 0 ? (
                  <p className="font-semibold" style={{color: '#9D4EDD'}}>
                    ✓ In Stock ({product.stock} available)
                  </p>
                ) : (
                  <p className="font-semibold" style={{color: '#FF6B35'}}>✗ Out of Stock</p>
                )}
              </div>

              {/* Quantity Selector */}
              {product.available && product.stock > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" style={{color: '#3C096C'}}>
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 rounded-lg hover:opacity-80 transition" style={{backgroundColor: '#E8DFF5'}}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold" style={{color: '#3C096C'}}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 rounded-lg hover:opacity-80 transition" style={{backgroundColor: '#E8DFF5'}}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.available || product.stock <= 0}
                className="w-full text-white py-4 rounded-lg hover:opacity-90 transition disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg font-semibold"
                style={{backgroundColor: (!product.available || product.stock <= 0) ? '#9CA3AF' : '#9D4EDD'}}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.available && product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
