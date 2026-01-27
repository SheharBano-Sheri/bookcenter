'use client';

import { useEffect, useState } from 'react';
import { formatPrice, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }>;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        setOrders(await res.json());
      }
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success('Order status updated!');
        fetchOrders();
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status });
        }
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#CDB4DB]/30 border-t-[#9D4EDD]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2" style={{color: '#3C096C'}}>🛍️ Orders</h1>
        <p style={{color: '#3C096C', opacity: 0.7}}>Manage customer orders</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Order ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Customer</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Total</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-purple-50/50 transition-colors duration-150">
                <td className="px-6 py-4 font-mono text-sm text-gray-600">{order.id.slice(0, 8)}...</td>
                <td className="px-6 py-4 font-medium text-gray-900">{order.customerName}</td>
                <td className="px-6 py-4 font-bold text-[#3C096C]">{formatPrice(order.totalAmount)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-[#9D4EDD] hover:text-[#3C096C] font-semibold text-sm hover:underline transition-all"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-white/20">
            <div className="bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] p-6">
               <h2 className="text-2xl font-black text-white">📋 Order Details</h2>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase mb-1">Order ID</p>
                  <p className="font-mono text-gray-700 bg-gray-50 p-2 rounded-lg text-sm">{selectedOrder.id}</p>
                </div>
                <div>
                   <p className="text-sm font-bold text-gray-400 uppercase mb-1">Status</p>
                   <select
                    value={selectedOrder.status}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#9D4EDD] font-medium text-gray-700"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase mb-1">Customer</p>
                  <p className="font-bold text-gray-800 text-lg">{selectedOrder.customerName}</p>
                  <p className="text-gray-600">{selectedOrder.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase mb-1">Address</p>
                  <p className="text-gray-700">{selectedOrder.customerAddress}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#9D4EDD] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                          {item.quantity}
                        </span>
                        <span className="font-medium text-gray-700">{item.product.name}</span>
                      </div>
                      <span className="font-bold text-[#3C096C]">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 mt-6 pt-6 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-black text-[#9D4EDD]">{formatPrice(selectedOrder.totalAmount)}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="mt-8 w-full bg-gray-100 text-gray-600 py-4 rounded-xl hover:bg-gray-200 transition-all font-bold hover:scale-[1.02] duration-200"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

