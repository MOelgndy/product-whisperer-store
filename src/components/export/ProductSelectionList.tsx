
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/types/product';

interface ProductSelectionListProps {
  products: Product[];
  selectedProducts: string[];
  isLoading: boolean;
  onSelectProduct: (productId: string) => void;
}

export const ProductSelectionList = ({
  products,
  selectedProducts,
  isLoading,
  onSelectProduct
}: ProductSelectionListProps) => {
  if (isLoading) {
    return <div className="p-4 text-center">Loading products...</div>;
  }
  
  if (products.length === 0) {
    return <div className="p-4 text-center">No products available to export.</div>;
  }
  
  return (
    <div className="max-h-64 overflow-y-auto">
      {products.map(product => (
        <div 
          key={product.id} 
          className="grid grid-cols-12 gap-4 p-3 border-b hover:bg-gray-50 last:border-0 items-center text-sm"
        >
          <div className="col-span-1">
            <Checkbox 
              checked={selectedProducts.includes(product.id)}
              onCheckedChange={() => onSelectProduct(product.id)}
            />
          </div>
          <div className="col-span-7 truncate" title={product.title}>
            {product.title}
          </div>
          <div className="col-span-2">
            ${(product.price || product.originalPrice).toFixed(2)}
          </div>
          <div className="col-span-2 capitalize">
            {product.source}
          </div>
        </div>
      ))}
    </div>
  );
};
