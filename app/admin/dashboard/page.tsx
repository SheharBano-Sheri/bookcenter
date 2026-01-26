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
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#CDB4DB]/30 border-t-[#9D4EDD]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] bg-clip-text text-transparent mb-2">📊 Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your store performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const gradients = [
            'from-[#CDB4DB] to-[#9D4EDD]',
            'from-[#9D4EDD] to-purple-600',
            'from-[#CDB4DB] to-[#9D4EDD]',
            'from-[#9D4EDD] to-purple-600'
          ];
          return (
            <div key={stat.title} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 group hover:-translate-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">{stat.title}</p>
                  <p className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-br ${gradients[index]} p-4 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-black bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] bg-clip-text text-transparent mb-6">⚡ Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/admin/products"
            className="bg-gradient-to-br from-[#CDB4DB]/10 to-[#9D4EDD]/10 border-2 border-[#CDB4DB]/30 rounded-xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group"
          >
            <div className="bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] p-4 rounded-xl inline-block mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Package className="w-8 h-8 text-white" />
            </div>
            <p className="font-bold text-lg text-[#3C096C]">Manage Products</p>
            <p className="text-sm text-[#9D4EDD] mt-1">Add, edit & organize</p>
          </a>
          <a
            href="/admin/categories"
            className="bg-gradient-to-br from-[#9D4EDD]/10 to-purple-600/10 border-2 border-[#9D4EDD]/30 rounded-xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group"
          >
            <div className="bg-gradient-to-r from-[#9D4EDD] to-purple-600 p-4 rounded-xl inline-block mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <FolderTree className="w-8 h-8 text-white" />
            </div>
            <p className="font-bold text-lg text-[#3C096C]">Manage Categories</p>
            <p className="text-sm text-[#9D4EDD] mt-1">Organize your catalog</p>
          </a>
          <a
            href="/admin/orders"
            className="bg-gradient-to-br from-[#CDB4DB]/10 to-[#9D4EDD]/10 border-2 border-[#CDB4DB]/30 rounded-xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group"
          >
            <div className="bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] p-4 rounded-xl inline-block mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <p className="font-bold text-lg text-[#3C096C]">View Orders</p>
            <p className="text-sm text-[#9D4EDD] mt-1">Track & fulfill</p>
          </a>
        </div>
      </div>
    </div>
  );
}
