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
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Product not found</p>
            <button
              onClick={() => router.push('/products')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
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
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                  SALE
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {product.category && (
                <p className="text-sm text-blue-600 font-semibold mb-2">{product.category.name}</p>
              )}
              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
              
              {/* Pricing */}
              <div className="mb-6">
                {product.originalPrice && product.originalPrice > product.price ? (
                  <div>
                    <p className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</p>
                    <p className="text-3xl font-bold text-red-600">{formatPrice(product.price)}</p>
                    <p className="text-sm text-green-600 font-semibold">
                      Save {formatPrice(product.originalPrice - product.price)}!
                    </p>
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-blue-600">{formatPrice(product.price)}</p>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-2 mb-6 text-sm">
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
                  <h2 className="font-semibold text-lg mb-2">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}

              {product.tags && (
                <div className="mb-6">
                  <h2 className="font-semibold text-sm mb-2">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.split(',').map((tag, i) => (
                      <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-6">
                {product.available && product.stock > 0 ? (
                  <p className="text-green-600 font-semibold">
                    ✓ In Stock ({product.stock} available)
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold">✗ Out of Stock</p>
                )}
              </div>

              {/* Quantity Selector */}
              {product.available && product.stock > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
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
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg font-semibold"
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
