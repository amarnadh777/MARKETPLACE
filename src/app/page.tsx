"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import ProductCard, { Product } from "@/components/ProductCard";
import FilterSidebar, { FilterSection, FilterOption } from "@/components/FilterSidebar";
import Pagination from "@/components/Pagination";
import SortDropdown from "@/components/SortDropdown";
import { FormControl, Select, MenuItem, Typography, Box, SelectChangeEvent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// Define the API response type
interface ProductsResponse {
  products: Product[];
  categoryCounts: {
    businessTypes: { name: string; count: number }[];
    categories: { name: string; count: number }[];
    subCategories: { name: string; count: number }[];
    vendors: { name: string; count: number }[];
    statuses: { name: string; count: number }[];
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Define category data type
interface CategoryData {
  businessTypes: { name: string; count: number }[];
  categories: { name: string; count: number }[];
  subCategories: { name: string; count: number }[];
  vendors: { name: string; count: number }[];
  statuses: { name: string; count: number }[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Initialize filters with empty options (will be populated from API)
  const [filters, setFilters] = useState<FilterSection[]>([
    {
      id: 'businessType', title: 'Business Type', isCollapsed: false, showMoreThreshold: 6,
      options: []
    },
    {
      id: 'category', title: 'Category', isCollapsed: false, showMoreThreshold: 6,
      options: []
    },
    {
      id: 'subCategory', title: 'Sub Category', isCollapsed: false, showMoreThreshold: 6,
      options: []
    },
    {
      id: 'vendor', title: 'Vendor', isCollapsed: true, showMoreThreshold: 6,
      options: []
    },
    {
      id: 'status', title: 'Status', isCollapsed: true, showMoreThreshold: 6,
      options: []
    }
  ]);

  // Fetch initial category data
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch('/api/products?categoriesOnly=true');
        if (!response.ok) {
          throw new Error(`Failed to fetch category data: ${response.status}`);
        }
        const data: CategoryData = await response.json();
        setCategoryData(data);
        
        // Update filters with data from API
        setFilters(prev => prev.map(section => {
          let options: FilterOption[] = [];
          
          switch(section.id) {
            case 'businessType':
              options = data.businessTypes.map(item => ({
                id: item.name,
                label: item.name,
                count: item.count,
                checked: false
              }));
              break;
            case 'category':
              options = data.categories.map(item => ({
                id: item.name,
                label: item.name,
                count: item.count,
                checked: false
              }));
              break;
            case 'subCategory':
              options = data.subCategories.map(item => ({
                id: item.name,
                label: item.name,
                count: item.count,
                checked: false
              }));
              break;
            case 'vendor':
              options = data.vendors.map(item => ({
                id: item.name,
                label: item.name,
                count: item.count,
                checked: false
              }));
              break;
            case 'status':
              options = data.statuses.map(item => ({
                id: item.name,
                label: item.name,
                count: item.count,
                checked: false
              }));
              break;
            default:
              options = [];
          }
          
          return { ...section, options };
        }));
      } catch (err) {
        console.error('Error fetching category data:', err);
      }
    };

    fetchCategoryData();
  }, []);

  // Fetch products from API
  useEffect(() => {
    let loadingTimer: NodeJS.Timeout;
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Show loading skeleton after a short delay to prevent blinking
        loadingTimer = setTimeout(() => {
          setShowLoading(true);
        }, 300);
        
        // Build query string inside useEffect to avoid infinite loops
        const params = new URLSearchParams();
        
        // Add pagination parameters
        params.append('page', currentPage.toString());
        params.append('limit', itemsPerPage.toString());
        
        // Add sorting parameters
        params.append('sortBy', sortBy);
        params.append('sortOrder', sortOrder);
        
        // Add filter parameters
        filters.forEach(section => {
          const checkedOptions = section.options.filter(option => option.checked);
          if (checkedOptions.length > 0) {
            checkedOptions.forEach(option => {
              params.append(section.id, option.id);
            });
          }
        });
        
        const queryString = params.toString();
        const response = await fetch(`/api/products?${queryString}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }
        
        const data: ProductsResponse = await response.json();
        
        setProducts(data.products);
        setTotalPages(data.pagination.totalPages);
        setTotalItems(data.pagination.totalItems);
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
        console.error('Error fetching products:', err);
      } finally {
        if (loadingTimer) {
          clearTimeout(loadingTimer);
        }
        setLoading(false);
        setShowLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage, sortBy, sortOrder, filters]);



  // Helper function to update option counts while preserving checked state
  const updateOptionCounts = (currentOptions: FilterOption[], newCounts: { name: string; count: number }[]) => {
    return currentOptions.map(option => {
      const newCount = newCounts.find(item => item.name === option.id);
      return newCount ? { ...option, count: newCount.count } : option;
    });
  };

  const handleFilterChange = (sectionId: string, optionId: string, checked: boolean) => {
    setFilters(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { 
              ...section, 
              options: section.options.map(opt => 
                opt.id === optionId ? { ...opt, checked } : opt
              ) 
            }
          : section
      )
    );
    
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const clearAllFilters = () => {
    setFilters(prev => 
      prev.map(section => ({
        ...section,
        options: section.options.map(option => ({ ...option, checked: false }))
      }))
    );
    setCurrentPage(1);
  };

  const handleSortChange = useCallback((newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1); // Reset to first page when sorting changes
  }, []);

  // Skeleton loader for product cards
  const renderSkeletons = () => {
    return Array.from({ length: itemsPerPage }).map((_, index) => (
      <div key={index} className="h-full">
        <div className="h-full bg-white rounded-lg shadow-sm">
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height={200} 
            animation="pulse"
            sx={{ 
              bgcolor: 'grey.100',
              borderRadius: '12px 12px 0 0'
            }}
          />
          <div className="p-4">
            <Skeleton 
              variant="text" 
              width="70%" 
              height={24} 
              animation="pulse"
              sx={{ bgcolor: 'grey.100', mb: 1 }}
            />
            <Skeleton 
              variant="text" 
              width="50%" 
              height={16} 
              animation="pulse"
              sx={{ bgcolor: 'grey.100', mb: 0.5 }}
            />
            <Skeleton 
              variant="text" 
              width="60%" 
              height={16} 
              animation="pulse"
              sx={{ bgcolor: 'grey.100', mb: 0.5 }}
            />
            <Skeleton 
              variant="text" 
              width="40%" 
              height={16} 
              animation="pulse"
              sx={{ bgcolor: 'grey.100', mb: 2 }}
            />
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height={40} 
              animation="pulse"
              sx={{ 
                bgcolor: 'grey.100',
                borderRadius: 2
              }}
            />
          </div>
        </div>
      </div>
    ));
  };

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="px-4 sm:px-6 lg:px-10">
        <Banner
          image="/banner.png"
          alt="Banner"
          title="Durable Construction: The 3M 6200 half face respirator, ensuring a durable and long-lasting product."
          height={400}
          buttonText="Order Now"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 sm:px-6 lg:px-10 mt-6 lg:mt-10">
        <aside className="w-full lg:w-72 lg:sticky lg:top-20 lg:self-start order-2 lg:order-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button 
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          </div>
          <FilterSidebar sections={filters} onFilterChange={handleFilterChange} />
        </aside>

        <main className="flex-1 order-1 lg:order-2">
          {/* Items per page selector and sorting */}
          <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <Typography variant="body2" color="text.secondary" className="text-sm sm:text-base">
              {loading ? (
                <Skeleton variant="text" width={200} animation="wave" />
              ) : (
                `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} products`
              )}
            </Typography>
            <Box className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:space-x-4 w-full sm:w-auto">
              <SortDropdown 
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                className="w-full sm:w-auto"
              />
              <Box className="flex items-center w-full sm:w-auto">
                <Typography variant="body2" sx={{ mr: 1, fontSize: '0.875rem' }}>Items per page:</Typography>
                <FormControl size="small" sx={{ minWidth: 80 }}>
                  <Select
                    value={itemsPerPage}
                    onChange={(e: SelectChangeEvent<number>) => handleItemsPerPageChange(Number(e.target.value))}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
          
          {/* Product grid */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6">
            {showLoading ? (
              renderSkeletons()
            ) : products.length > 0 ? (
              products.map(product => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No products found matching your filters.</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && !loading && (
            <Pagination 
              totalPages={totalPages} 
              currentPage={currentPage} 
              onPageChange={handlePageChange} 
            />
          )}
        </main>
      </div>
    </div>
  );
}