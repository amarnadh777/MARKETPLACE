// app/api/products/route.js

// Sample product data
const products = [
  {
    id: 1,
    name: "3M Speedglas Welding Helmet",
    price: 199.99,
    stock: 25,
    category: "Safety Helmet",
    businessType: "Manufacturer",
    subCategory: "Personal Protective Equipment",
    status: "Available",
    vendor: "3M",
    vendorImage: "/3m1.png",
    image: "/3M4.png",
  },
  {
    id: 2,
    name: "3M Full Face Respirator",
    price: 149.99,
    stock: 12,
    category: "Respirator",
    businessType: "Manufacturer",
    subCategory: "Personal Protective Equipment",
    status: "Available",
    vendor: "3M",
    vendorImage: "/3m1.png",
    image: "/3M2.png",
  },
  {
    id: 3,
    name: "Honeywell Safety Glasses",
    price: 29.99,
    stock: 50,
    category: "Eye Protection",
    businessType: "Supplier",
    subCategory: "Personal Protective Equipment",
    status: "Available",
    vendor: "Honeywell",
    vendorImage: "/MSA1.png",
    image: "/MSA1.png",
  },
  {
    id: 4,
    name: "Honeywell Ear Protection Earmuffs",
    price: 39.99,
    stock: 40,
    category: "Hearing Protection",
    businessType: "Supplier",
    subCategory: "Personal Protective Equipment",
    status: "Available",
    vendor: "Honeywell",
    vendorImage: "/MSA1.png",
    image: "/MSA1.png",
  },
  {
    id: 5,
    name: "Bosch Cordless Drill",
    price: 89.99,
    stock: 15,
    category: "Power Tools",
    businessType: "Manufacturer",
    subCategory: "Electrical",
    status: "Available",
    vendor: "Bosch",
    vendorImage: "/bosch.jpeg",
    image: "/bosch.jpeg",
  },
  {
    id: 6,
    name: "Bosch Angle Grinder",
    price: 79.99,
    stock: 20,
    category: "Power Tools",
    businessType: "Manufacturer",
    subCategory: "Electrical",
    status: "Available",
    vendor: "Bosch",
    vendorImage: "/bosch.jpeg",
    image: "/bos.jpeg",
  },
  {
    id: 7,
    name: "Makita Impact Driver",
    price: 119.99,
    stock: 10,
    category: "Power Tools",
    businessType: "Distribution",
    subCategory: "Electrical",
    status: "Out of Stock",
    vendor: "Makita",
    vendorImage: "/makita.jpg",
    image: "/makita.jpg",
  },
  {
    id: 8,
    name: "Makita Circular Saw",
    price: 139.99,
    stock: 18,
    category: "Power Tools",
    businessType: "Distribution",
    subCategory: "Electrical",
    status: "Available",
    vendor: "Makita",
    vendorImage: "/makita.jpg",
    image: "/makita.jpg",
  },
  {
    id: 9,
    name: "DeWalt Hammer Drill",
    price: 159.99,
    stock: 22,
    category: "Power Tools",
    businessType: "Manufacturer",
    subCategory: "Electrical",
    status: "Available",
    vendor: "DeWalt",
    vendorImage: "/banner.png",
    image: "/banner.png",
  },
  {
    id: 10,
    name: "DeWalt Safety Gloves",
    price: 19.99,
    stock: 60,
    category: "Safety Gloves",
    businessType: "Manufacturer",
    subCategory: "Personal Protective Equipment",
    status: "Available",
    vendor: "DeWalt",
    vendorImage: "/banner.png",
    image: "/banner.png",
  },
  {
    id: 11,
    name: "Stanley Measuring Tape 5m",
    price: 12.99,
    stock: 75,
    category: "Measuring Tools",
    businessType: "Supplier",
    subCategory: "Measuring Instruments",
    status: "Available",
    vendor: "Stanley",
    vendorImage: "/banner.png",
    image: "/banner.png",
  },
  {
    id: 12,
    name: "Stanley Utility Knife",
    price: 8.99,
    stock: 90,
    category: "Hand Tools",
    businessType: "Supplier",
    subCategory: "Cutting Tools",
    status: "Available",
    vendor: "Stanley",
    vendorImage: "/banner.png",
    image: "/banner.png",
  },
  {
    id: 13,
    name: "Caterpillar Steel Toe Boots",
    price: 129.99,
    stock: 30,
    category: "Footwear",
    businessType: "Manufacturer",
    subCategory: "Safety Footwear",
    status: "Available",
    vendor: "Caterpillar",
    vendorImage: "/banner.png",
    image: "/banner.png",
  },
  {
    id: 14,
    name: "Caterpillar Work Jacket",
    price: 89.99,
    stock: 20,
    category: "Workwear",
    businessType: "Manufacturer",
    subCategory: "Protective Clothing",
    status: "Available",
    vendor: "Caterpillar",
    vendorImage: "/banner.png",
    image: "/banner.png",
  },
  {
    id: 15,
    name: "Hilti Concrete Drill Bit Set",
    price: 59.99,
    stock: 35,
    category: "Accessories",
    businessType: "Service Provider",
    subCategory: "Drilling Accessories",
    status: "Available",
    vendor: "Hilti",
    vendorImage: "/banner.png",
    image: "/banner.png",
  },
  {
    id: 16,
    name: "Hilti Rotary Hammer",
    price: 249.99,
    stock: 8,
    category: "Power Tools",
    businessType: "Service Provider",
    subCategory: "Demolition Tools",
    status: "Available",
    vendor: "Hilti",
    vendorImage: "/banner.png",
    image: "/banner.png",
  },
  {
    id: 17,
    name: "Milwaukee Tool Bag",
    price: 45.99,
    stock: 27,
    category: "Storage",
    businessType: "Distribution",
    subCategory: "Tool Storage",
    status: "Available",
    vendor: "Milwaukee",
    vendorImage: "/banner.png",
    image: "/banner.png",
  },
  {
    id: 18,
    name: "Milwaukee Cordless Combo Kit",
    price: 399.99,
    stock: 5,
    category: "Power Tools",
    businessType: "Distribution",
    subCategory: "Tool Kits",
    status: "Available",
    vendor: "Milwaukee",
    vendorImage: "/banner.png",
    image: "/banner.png",
  },
  {
    id: 19,
    name: "Black+Decker Heat Gun",
    price: 34.99,
    stock: 44,
    category: "Heat Tools",
    businessType: "Contract Services",
    subCategory: "Heating Tools",
    status: "Available",
    vendor: "Black+Decker",
    vendorImage: "/banner.png",
    image: "/banner.png",
  },
  {
    id: 20,
    name: "Black+Decker Cordless Screwdriver",
    price: 24.99,
    stock: 55,
    category: "Hand Tools",
    businessType: "Contract Services",
    subCategory: "Fastening Tools",
    status: "Available",
    vendor: "Black+Decker",
    vendorImage: "/banner.png",
    image: "/banner.png",
  },
];

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