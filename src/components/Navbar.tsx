"use client";
import React, { useState } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import Image from "next/image";
const Navbar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    'Procurement Software',
    'Supply Chain Management',
    'Vendor Management',
    'Contract Management',
    'Analytics & Reporting'
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Image src="/navBarlogo.png" alt="Logo" width={140} height={40} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                  {products.map((product, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      {product}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                <Search className="w-4 h-4 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 px-3 py-2 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
                Register
              </button>
              <button className="px-6 py-2 text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                Login
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            {/* Mobile Products */}
            <div>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center justify-between w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                <span className="font-medium">Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProductsOpen && (
                <div className="pl-6 space-y-2 mt-2">
                  {products.map((product, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block text-sm text-gray-600 hover:text-blue-600 py-1"
                    >
                      {product}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Search */}
            <div className="px-3">
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300 focus-within:border-blue-500">
                <Search className="w-4 h-4 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="px-3 space-y-2">
              <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200">
                Register
              </button>
              <button className="w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                Login
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdown */}
      {isProductsOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsProductsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;