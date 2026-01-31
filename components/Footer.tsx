import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-rose/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="inline-block relative w-[180px] h-[50px] mb-4">
                 <Image 
                    src="/logo.png" 
                    alt="Zubair Book Center" 
                    fill
                    className="object-contain object-left"
                 />
            </Link>
            <h3 className="text-3xl font-serif text-white tracking-tight sr-only">
              Zubair <span className="text-accent-gold italic">Book Center</span>
            </h3>
            <p className="text-white/60 leading-relaxed max-w-sm">
              Your trusted destination for curated literature, premium stationery, and educational excellence since 1995.
            </p>
            <div className="flex gap-4 pt-4">
              <SocialLink icon={<Facebook className="w-5 h-5"/>} href="https://www.facebook.com/zubairbookdepot1" />
              <SocialLink icon={<Linkedin className="w-5 h-5"/>} href="https://www.linkedin.com/in/zubair-book-center-vehari-451674273/" />
              <SocialLink icon={<Instagram className="w-5 h-5"/>} href="https://www.instagram.com/zubairbooks?igsh=a21qNTVqb3Z6MXJr" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-lg font-serif mb-6 text-white/90">Explore</h4>
            <ul className="space-y-4">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/products">All Products</FooterLink>
              <FooterLink href="/cart">Shopping Cart</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-serif mb-6 text-white/90">Departments</h4>
            <ul className="space-y-4">
              <FooterLink href="/products?category=Books">Books</FooterLink>
              <FooterLink href="/products?category=Stationery">Stationery</FooterLink>
              <FooterLink href="/products?category=Bags">School Bags</FooterLink>
              <FooterLink href="/products?category=Accessories">Accessories</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
             <h4 className="text-lg font-serif mb-6 text-white/90">Contact</h4>
             <ul className="space-y-4">
               <li className="flex items-start gap-4 text-white/60">
                  <MapPin className="w-5 h-5 text-accent-gold shrink-0 mt-1" />
                  <span>Zia Shaheed Road, C Block, Vehari</span>
               </li>
               <li className="flex items-center gap-4 text-white/60">
                  <Phone className="w-5 h-5 text-accent-gold shrink-0" />
                  <span>+923033130888</span>
               </li>
               <li className="flex items-center gap-4 text-white/60">
                  <Mail className="w-5 h-5 text-accent-gold shrink-0" />
                  <span>info@zubairbookcentre.com</span>
               </li>
             </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
           <p>&copy; {new Date().getFullYear()} Zubair Book Center. All rights reserved.</p>
           <div className="flex gap-8">
             <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-white hover:text-primary-950 hover:border-transparent transition-all duration-300"
    >
      {icon}
    </a>
  )
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-white/60 hover:text-accent-gold transition-colors inline-flex items-center gap-2 group">
        <span className="relative overflow-hidden">
          {children}
          <span className="absolute bottom-0 left-0 w-full h-px bg-accent-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
        </span>
      </Link>
    </li>
  )
}
