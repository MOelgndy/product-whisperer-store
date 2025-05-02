
import { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductList({ products, onAddToCart }: ProductListProps) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterSource, setFilterSource] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  
  // Filtering and sorting logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = filterSource.length === 0 || filterSource.includes(product.source);
    
    return matchesSearch && matchesSource;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return (a.price || 0) - (b.price || 0);
      case 'price-desc':
        return (b.price || 0) - (a.price || 0);
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        // newest by default
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
  });
  
  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  
  // Handle filter toggle
  const toggleSourceFilter = (source: string) => {
    setFilterSource(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };
  
  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full md:max-w-sm">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Checkbox 
              id="amazon-filter" 
              checked={filterSource.includes('amazon')} 
              onCheckedChange={() => toggleSourceFilter('amazon')}
            />
            <label htmlFor="amazon-filter" className="text-sm cursor-pointer">Amazon</label>
          </div>
          
          <div className="flex items-center gap-2">
            <Checkbox 
              id="alibaba-filter" 
              checked={filterSource.includes('alibaba')} 
              onCheckedChange={() => toggleSourceFilter('alibaba')}
            />
            <label htmlFor="alibaba-filter" className="text-sm cursor-pointer">Alibaba</label>
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {currentProducts.length > 0 ? (
        <div className="product-grid">
          {currentProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No products found. Try adjusting your filters.</p>
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(index + 1)}
              className="w-9 h-9 p-0"
            >
              {index + 1}
            </Button>
          ))}
          
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
