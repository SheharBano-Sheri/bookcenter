import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-white mt-20" style={{background: 'linear-gradient(135deg, #3C096C 0%, #9D4EDD 50%, #CDB4DB 100%)'}}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-black mb-4" style={{fontStyle: 'italic'}}>📚 Zubair Book Center</h3>
            <p className="text-sm leading-relaxed" style={{opacity: 0.9}}>
              Your trusted destination for books, stationery, and educational supplies.
              Quality products at affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#FFE5D9] transition-all duration-300" style={{opacity: 0.9}}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#FFE5D9] transition-all duration-300" style={{opacity: 0.9}}>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#FFE5D9] transition-all duration-300" style={{opacity: 0.9}}>
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=Books" className="hover:text-[#FFE5D9] transition-all duration-300" style={{opacity: 0.9}}>
                  Books
                </Link>
              </li>
              <li>
                <Link href="/products?category=Stationery" className="hover:text-[#FFE5D9] transition-all duration-300" style={{opacity: 0.9}}>
                  Stationery
                </Link>
              </li>
              <li>
                <Link href="/products?category=Bags" className="hover:text-[#FFE5D9] transition-all duration-300" style={{opacity: 0.9}}>
                  School Bags
                </Link>
              </li>
              <li>
                <Link href="/products?category=Accessories" className="hover:text-[#FFE5D9] transition-all duration-300" style={{opacity: 0.9}}>
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 group">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-400">+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-400">info@bookcenter.com</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-400">123 Education St, City</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 p-3 rounded-full hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 p-3 rounded-full hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 p-3 rounded-full hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center text-sm">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Book Center. All rights reserved. <span className="text-transparent bg-gradient-to-r from-[#CDB4DB] to-[#9D4EDD] bg-clip-text font-semibold">Made with ❤️</span></p>
        </div>
      </div>
    </footer>
  );
}
