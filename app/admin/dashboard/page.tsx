'use client';

import { useEffect, useState } from 'react';
import { Package, ShoppingBag, FolderTree, DollarSign } from 'lucide-react';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalCategories: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, categoriesRes] = await Promise.all([
          fetch('/api/admin/products'),
          fetch('/api/admin/orders'),
          fetch('/api/admin/categories'),
        ]);

        if (productsRes.ok && ordersRes.ok && categoriesRes.ok) {
          const products = await productsRes.json();
          const orders = await ordersRes.json();
          const categories = await categoriesRes.json();

          const revenue = orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);

          setStats({
            totalProducts: products.length,
            totalOrders: orders.length,
            totalCategories: categories.length,
            totalRevenue: revenue,
          });
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-green-500',
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: FolderTree,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/products"
            className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition text-center"
          >
            <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="font-semibold text-blue-900">Manage Products</p>
          </a>
          <a
            href="/admin/categories"
            className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 hover:bg-purple-100 transition text-center"
          >
            <FolderTree className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="font-semibold text-purple-900">Manage Categories</p>
          </a>
          <a
            href="/admin/orders"
            className="bg-green-50 border-2 border-green-200 rounded-lg p-4 hover:bg-green-100 transition text-center"
          >
            <ShoppingBag className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-green-900">View Orders</p>
          </a>
        </div>
      </div>
    </div>
  );
}
