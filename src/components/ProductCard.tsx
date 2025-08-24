import React from "react";
import { Card, CardContent, Typography, Button, Box, Chip, Skeleton } from '@mui/material';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  businessType: string;
  subCategory: string;
  status: "Available" | "Out of Stock";
  vendor: string;
  vendorImage?: string; // optional vendor logo URL
  image?: string; // optional product image
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: '#ffffff',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)',
        }
      }}
    >
      {/* Product Image Section */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: 160, sm: 180, md: 200 },
          backgroundColor: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 1, sm: 2 },
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        {/* Brand Logo */}
        {product.vendorImage && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              zIndex: 1,
              backgroundColor: 'white',
              borderRadius: 2,
              p: 0.5,
              boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
              border: '1px solid #f0f0f0'
            }}
          >
            <img
              src={product.vendorImage}
              alt={product.vendor}
              style={{
                width: '24px',
                height: '24px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </Box>
        )}
        
        {/* Product Image */}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: 4
            }}
          />
        ) : (
          <Skeleton 
            variant="rectangular" 
            width="80%" 
            height="80%" 
            sx={{ borderRadius: 2 }}
          />
        )}
        
        {/* Status Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 1
          }}
        >
          <Chip
            label={product.status}
            size="small"
            color={product.status === "Available" ? "success" : "error"}
            sx={{
              fontSize: '0.7rem',
              fontWeight: 600,
              height: 24,
              '& .MuiChip-label': {
                px: 1
              }
            }}
          />
        </Box>
      </Box>

      {/* Product Information Section */}
      <CardContent 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          p: { xs: 2, sm: 2.5 },
          '&:last-child': {
            pb: { xs: 2, sm: 2.5 }
          }
        }}
      >
        {/* Product Name */}
        <Typography 
          variant="h6" 
          component="h3"
          sx={{
            fontWeight: 600,
            color: '#1a1a1a',
            mb: { xs: 1, sm: 1.5 },
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          {product.name}
        </Typography>

        {/* Product Details */}
        <Box sx={{ mb: 2.5, flexGrow: 1 }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 0.75, 
              fontSize: '0.8rem',
              color: '#666666',
              fontWeight: 500
            }}
          >
            UNSPC: {product.id.toString().padStart(10, '0')}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 0.75, 
              fontSize: '0.8rem',
              color: '#666666',
              fontWeight: 500
            }}
          >
            Category: {product.category}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 0.75, 
              fontSize: '0.8rem',
              color: '#666666',
              fontWeight: 500
            }}
          >
            Price: ${product.price.toFixed(2)}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontSize: '0.8rem',
              color: '#666666',
              fontWeight: 500
            }}
          >
            Stock: {product.stock} units
          </Typography>
        </Box>

        {/* Send Enquiry Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            py: 1.25,
            px: 2,
            borderRadius: 2,
            fontSize: '0.875rem',
            boxShadow: '0 2px 4px rgba(25, 118, 210, 0.2)',
            '&:hover': {
              backgroundColor: '#1565c0',
              boxShadow: '0 4px 8px rgba(25, 118, 210, 0.3)',
            },
            '&:active': {
              transform: 'translateY(1px)',
            }
          }}
        >
          Send Enquiry
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
