'use client';
import img1 from '../../../assets/image/footercart.webp'

import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Phone, 
  Mail, 
  Clock 
} from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full mt-16 bg-gradient-to-t from-gray-900 to-gray-800 text-white/90 border-t border-gray-700/50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16"> 
          {/* Grid رئيسي */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 lg:mb-12">
            
            {/* Logo & Description */}
            <div className="space-y-5 lg:space-y-6 ">
              <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image 
                  src={img1} 
                  alt="FreshCart" 
                  width={140} 
                  height={50} /* تقليل حجم اللوجو */
                  className="drop-shadow-lg"
                />
              </Link>
              <p className="text-sm lg:text-base text-gray-300 leading-relaxed max-w-sm">
                FreshCart.. The best fresh products at the best prices. 
                Shop with confidence with fast home delivery.
              </p>
              {/* Social Media */}
              <div className="flex space-x-3 rtl:space-x-reverse">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-5 lg:mb-6 flex items-center space-x-2 rtl:space-x-reverse">
                <span>Quick Links</span>
              </h3>
              <ul className="space-y-2.5">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/categories', label: 'Categories' },
                  { href: '/brands', label: 'Brands' },
                  { href: '/products', label: 'All Products' },
                  { href: '/cart', label: 'Shopping Cart' }
                ].map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors flex items-center space-x-2 rtl:space-x-reverse group py-1"
                    >
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:scale-125 transition-transform" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-5 lg:mb-6 flex items-center space-x-2 rtl:space-x-reverse">
                <span>Customer Service</span>
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Phone className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm lg:text-base">Call Us</p>
                    <p className="text-gray-300 text-sm">+20 123 456 7890</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Mail className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm lg:text-base">Email</p>
                    <p className="text-gray-300 text-sm">support@freshcart.com</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Clock className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm lg:text-base">Working Hours</p>
                    <p className="text-gray-300 text-sm">9:00 AM - 10:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-white mb-5 lg:mb-6">Newsletter</h3>
              <p className="text-sm lg:text-base text-gray-300 mb-5 lg:mb-6">Subscribe to get updates on offers and discounts</p>
              <div className="flex flex-col  gap-2.5">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3.5 py-2.5 lg:px-4 lg:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all text-sm lg:text-base"
                />
                <button className="px-6 lg:px-8 py-2.5 lg:py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-sm lg:text-base whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright & Payment Methods */}
          <div className="border-t border-white/10 pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 lg:gap-4">
            <p className="text-gray-400 text-xs lg:text-sm text-center md:text-left">
              © 2026 FreshCart. All Rights Reserved.
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="flex -space-x-1.5 rtl:space-x-reverse">
                <div className="w-10 h-6 lg:w-12 lg:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md lg:rounded-lg shadow-lg flex items-center justify-center"></div>
                <div className="w-10 h-6 lg:w-12 lg:h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md lg:rounded-lg shadow-lg flex items-center justify-center -ml-1 lg:-ml-2"></div>
                <div className="w-10 h-6 lg:w-12 lg:h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-md lg:rounded-lg shadow-lg flex items-center justify-center -ml-1 lg:-ml-2"></div>
              </div>
              <span className="text-xs lg:text-sm text-gray-400">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
