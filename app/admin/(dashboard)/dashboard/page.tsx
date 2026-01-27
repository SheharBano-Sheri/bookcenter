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
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: FolderTree,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Dashboard</h1>
        <p className="text-gray-500">Overview of your store performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/admin/products"
            className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="bg-blue-50 p-3 rounded-lg w-fit mb-4 group-hover:bg-blue-100 transition-colors">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <p className="font-bold text-lg text-gray-900">Manage Products</p>
            <p className="text-sm text-gray-500 mt-1">Add, edit & organize inventory</p>
          </a>
          <a
            href="/admin/categories"
            className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="bg-purple-50 p-3 rounded-lg w-fit mb-4 group-hover:bg-purple-100 transition-colors">
              <FolderTree className="w-6 h-6 text-purple-600" />
            </div>
            <p className="font-bold text-lg text-gray-900">Manage Categories</p>
            <p className="text-sm text-gray-500 mt-1">Organize your catalog structure</p>
          </a>
          <a
            href="/admin/orders"
            className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="bg-indigo-50 p-3 rounded-lg w-fit mb-4 group-hover:bg-indigo-100 transition-colors">
              <ShoppingBag className="w-6 h-6 text-indigo-600" />
            </div>
            <p className="font-bold text-lg text-gray-900">View Orders</p>
            <p className="text-sm text-gray-500 mt-1">Track & fulfill customer orders</p>
          </a>
        </div>
      </div>
    </div>
  );
}

