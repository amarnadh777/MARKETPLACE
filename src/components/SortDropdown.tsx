import React from 'react';
import { 
  FormControl, 
  Select, 
  MenuItem, 
  Button, 
  Box, 
  Typography,
  SelectChangeEvent
} from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

export interface SortOption {
  value: string;
  label: string;
}

export interface SortDropdownProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  className?: string;
}

const sortOptions: SortOption[] = [
  { value: 'name', label: 'Name' },
  { value: 'price', label: 'Price' },
  { value: 'stock', label: 'Stock' },
  { value: 'createdAt', label: 'Created At' },
];

export default function SortDropdown({ 
  sortBy, 
  sortOrder, 
  onSortChange, 
  className 
}: SortDropdownProps) {
  const handleSortChange = (e: SelectChangeEvent) => {
    const newSortBy = e.target.value;
    onSortChange(newSortBy, sortOrder);
  };

  const handleOrderChange = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(sortBy, newOrder);
  };

            return (
            <Box className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:space-x-2 ${className}`}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.875rem' }}>
                Sort by:
              </Typography>

              <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 120 } }}>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  displayEmpty
                  sx={{
                    height: 40,
                    '& .MuiSelect-select': {
                      paddingY: 1,
                      paddingX: 2,
                    }
                  }}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                size="small"
                onClick={handleOrderChange}
                startIcon={sortOrder === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                sx={{
                  height: 40,
                  textTransform: 'none',
                  minWidth: { xs: '100%', sm: 'auto' },
                  px: 2
                }}
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                </Box>
              </Button>
            </Box>
          );
}
