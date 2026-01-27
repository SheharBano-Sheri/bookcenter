'use client';

import AdminSidebar from '@/app/components/admin/Sidebar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block">
        <AdminSidebar />
      </div>
      
      {/* Mobile Sidebar Toggle could go here */}
      
      <main className="flex-1 p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}

