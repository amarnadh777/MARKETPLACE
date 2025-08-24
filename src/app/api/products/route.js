// app/api/products/route.js



import { products } from "@/lib/data/products";



// Function to count occurrences of each category
function countCategories(products, field) {
  const counts = {};
  products.forEach(product => {
    const value = product[field];
    counts[value] = (counts[value] || 0) + 1;
  });
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  // Check if only category data is requested
  const categoriesOnly = searchParams.get('categoriesOnly');
  if (categoriesOnly) {
    const businessTypes = countCategories(products, 'businessType');
    const categories = countCategories(products, 'category');
    const subCategories = countCategories(products, 'subCategory');
    const vendors = countCategories(products, 'vendor');
    const statuses = countCategories(products, 'status');
    
    return Response.json({
      businessTypes,
      categories,
      subCategories,
      vendors,
      statuses
    });
  }
  
  // Filter products based on query parameters
  let filteredProducts = [...products];
  
  // Filter by category if provided (handle multiple values)
  const categoryFilters = searchParams.getAll('category');
  if (categoryFilters.length > 0) {
    filteredProducts = filteredProducts.filter(
      product => categoryFilters.includes(product.category)
    );
  }
  
  // Filter by businessType if provided (handle multiple values)
  const businessTypeFilters = searchParams.getAll('businessType');
  if (businessTypeFilters.length > 0) {
    filteredProducts = filteredProducts.filter(
      product => businessTypeFilters.includes(product.businessType)
    );
  }
  
  // Filter by subCategory if provided (handle multiple values)
  const subCategoryFilters = searchParams.getAll('subCategory');
  if (subCategoryFilters.length > 0) {
    filteredProducts = filteredProducts.filter(
      product => subCategoryFilters.includes(product.subCategory)
    );
  }
  
  // Filter by status if provided (handle multiple values)
  const statusFilters = searchParams.getAll('status');
  if (statusFilters.length > 0) {
    filteredProducts = filteredProducts.filter(
      product => statusFilters.includes(product.status)
    );
  }
  
  // Filter by vendor if provided (handle multiple values)
  const vendorFilters = searchParams.getAll('vendor');
  if (vendorFilters.length > 0) {
    filteredProducts = filteredProducts.filter(
      product => vendorFilters.includes(product.vendor)
    );
  }
  
  // Filter by search term if provided
  const search = searchParams.get('search');
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    );
  }
  
  // Sort products if sort parameter is provided
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder') || 'asc';
  
  if (sortBy) {
    filteredProducts.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'stock':
          aValue = a.stock;
          bValue = b.stock;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'createdAt':
          // Use ID as proxy for creation date
          aValue = a.id;
          bValue = b.id;
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });
  }
  
  // Get category counts for filtered products
  const businessTypes = countCategories(filteredProducts, 'businessType');
  const categories = countCategories(filteredProducts, 'category');
  const subCategories = countCategories(filteredProducts, 'subCategory');
  const vendors = countCategories(filteredProducts, 'vendor');
  const statuses = countCategories(filteredProducts, 'status');
  
  // Pagination parameters
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  // Get paginated results
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / limit);
  
  // Return response with pagination metadata and category data
  return Response.json({
    products: paginatedProducts,
    categoryCounts: {
      businessTypes,
      categories,
      subCategories,
      vendors,
      statuses
    },
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalItems: filteredProducts.length,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
}

export async function POST(request) {
  const body = await request.json();
  const newProduct = {
    id: products.length + 1,
    ...body
  };
  products.push(newProduct);
  return Response.json(newProduct, { status: 201 });
}