import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import WhatsAppButton from "@/components/WhatsAppButton";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shop stationary items Online | Top Online stationary shop.",
  description: "Your one-stop shop for books, stationery, school bags, and educational products",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased font-sans`}>
        {children}
        <Toaster position="top-right" />
        <WhatsAppButton />
      </body>
    </html>
  );
}
