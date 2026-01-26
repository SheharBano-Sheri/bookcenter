'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  FolderTree, 
  Upload,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/admin/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Import CSV', href: '/admin/import', icon: Upload },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 text-white transition-transform duration-300 lg:translate-x-0 shadow-2xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{background: 'linear-gradient(180deg, #1F1B2E 0%, #13111C 100%)'}}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black mb-1 text-white">📚 Admin</h1>
              <p className="text-gray-400 text-sm font-medium">Book Center</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group border border-gray-700/50" style={{backgroundColor: 'rgba(255,255,255,0.05)'}}
              >
                <div className="p-2 rounded-lg group-hover:scale-110 transition-all duration-300" style={{backgroundColor: '#9D4EDD'}}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-gray-200">{item.name}</span>
              </Link>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="w-full mt-8 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-30 border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-[#9D4EDD] hover:bg-[#CDB4DB]/10 p-2 rounded-lg transition-all duration-300"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-black bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] bg-clip-text text-transparent">📚 Book Center Admin</h2>
            <Link href="/" className="text-transparent bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] bg-clip-text hover:from-[#9D4EDD] hover:to-[#CDB4DB] text-sm font-semibold transition-all duration-300">
              View Store →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
