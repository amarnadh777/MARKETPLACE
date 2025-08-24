"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

interface Product {
  name: string;
  category: string;
  subCategory: string;
  vendor: string;
}

interface NavbarProps {
  onSearch?: (query: string) => void;
  suggestions?: Product[]; // Suggestions passed from parent
  onSuggestionClick?: (suggestion: string) => void;
}

const Navbar = ({ onSearch, suggestions = [], onSuggestionClick }: NavbarProps) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const products = [
    "Procurement Software",
    "Supply Chain Management",
    "Vendor Management",
    "Contract Management",
    "Analytics & Reporting",
  ];

  // Update suggestions dropdown visibility based on suggestions and query
  useEffect(() => {
    setIsSuggestionsOpen(searchQuery.trim() !== "" && suggestions.length > 0);
  }, [searchQuery, suggestions]);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value); // Notify parent of query change
    }
  };

  const handleSuggestionClick = (suggestion: Product) => {
    setSearchQuery(suggestion.name);
    setIsSuggestionsOpen(false);
    
    // Notify parent about the clicked suggestion
    if (onSuggestionClick) {
      onSuggestionClick(suggestion.name);
    }
    
    // Also notify about the search query change
    if (onSearch) {
      onSearch(suggestion.name);
    }
  };

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
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`}
                />
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

            {/* Search Bar with Suggestions */}
            <div className="relative" ref={suggestionsRef}>
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                <Search className="w-4 h-4 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-80 px-3 py-2 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
              {isSuggestionsOpen && suggestions.length > 0 && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                    >
                      <div className="font-medium">{suggestion.name}</div>
                      <div className="text-xs text-gray-500">
                        {suggestion.category} • {suggestion.vendor}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`}
                />
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

            {/* Mobile Search with Suggestions */}
            <div className="px-3 relative" ref={suggestionsRef}>
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300 focus-within:border-blue-500">
                <Search className="w-4 h-4 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-2 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
              {isSuggestionsOpen && suggestions.length > 0 && (
                <div className="mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                    >
                      <div className="font-medium">{suggestion.name}</div>
                      <div className="text-xs text-gray-500">
                        {suggestion.category} • {suggestion.vendor}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

      {/* Overlay for dropdowns */}
      {(isProductsOpen || isSuggestionsOpen) && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => {
            setIsProductsOpen(false);
            setIsSuggestionsOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;