'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Login successful!');
        router.push('/admin/dashboard');
      } else {
        const error = await res.json();
        toast.error(error.error || 'Login failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CDB4DB] via-[#9D4EDD] to-purple-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md relative z-10 border-4 border-white/20">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-[#CDB4DB] to-[#9D4EDD] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-[#3C096C] to-[#9D4EDD] bg-clip-text text-transparent mb-2">Admin Portal</h1>
          <p className="text-gray-600 font-medium">🔐 Secure access to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              📧 Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9D4EDD] group-focus-within:scale-110 transition-transform" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 transition-all duration-300 font-medium"
                placeholder="admin@bookcenter.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              🔑 Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9D4EDD] group-focus-within:scale-110 transition-transform" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300 transition-all duration-300 font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] text-white py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? '🔄 Signing in...' : '✨ Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm font-semibold text-transparent bg-gradient-to-r from-[#3C096C] to-[#9D4EDD] bg-clip-text hover:from-[#9D4EDD] hover:to-[#3C096C] transition-all duration-300">
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  );
}
