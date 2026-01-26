'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  stock: number;
  category: { id: string; name: string };
}

interface Category {
  id: string;
  name: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
    categoryId: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
      ]);

      if (productsRes.ok && categoriesRes.ok) {
        setProducts(await productsRes.json());
        setCategories(await categoriesRes.json());
      }
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products';
      
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingProduct ? 'Product updated!' : 'Product created!');
        setShowModal(false);
        setEditingProduct(null);
        setFormData({ name: '', description: '', price: '', image: '', stock: '', categoryId: '' });
        fetchData();
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Product deleted!');
        fetchData();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image || '',
      stock: product.stock.toString(),
      categoryId: product.category.id,
    });
    setShowModal(true);
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-16 w-16 border-4 border-[#CDB4DB]/30 border-t-[#9D4EDD]"></div></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-black mb-2" style={{color: '#3C096C'}}>📦 Products Management</h1>
          <p style={{color: '#3C096C', opacity: 0.7}}>Manage your product catalog</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setFormData({ name: '', description: '', price: '', image: '', stock: '', categoryId: '' });
            setShowModal(true);
          }}
          className="text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold" style={{backgroundColor: '#9D4EDD'}}
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{border: '1px solid #E5E7EB'}}>
        <table className="w-full">
          <thead style={{background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)'}}>
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{color: '#1F2937'}}>Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{color: '#1F2937'}}>Category</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{color: '#1F2937'}}>Price</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{color: '#1F2937'}}>Stock</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{color: '#1F2937'}}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gradient-to-r hover:from-[#CDB4DB]/5 hover:to-[#9D4EDD]/5 transition-colors duration-150">
                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] text-white rounded-full text-sm font-semibold">
                    {product.category.name}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-green-600">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    product.stock > 10 ? 'bg-green-100 text-green-700' : 
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => openEditModal(product)}
                      className="text-[#9D4EDD] hover:text-[#3C096C] hover:scale-110 transition-all duration-200"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 hover:scale-110 transition-all duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-white/20">
            <div className="bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] p-6 rounded-t-3xl">
              <h2 className="text-3xl font-black text-white">
                {editingProduct ? '✏️ Edit Product' : '✨ Add New Product'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">📝 Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">💬 Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 transition-all duration-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">💵 Price *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">📦 Stock *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">📂 Category *</label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 transition-all duration-300"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">🖼️ Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 transition-all duration-300"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] text-white py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold"
                >
                  {editingProduct ? '✔️ Update' : '✨ Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 hover:scale-105 transition-all duration-300 font-bold"
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
