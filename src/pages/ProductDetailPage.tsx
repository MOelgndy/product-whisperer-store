
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDetail from '@/components/ProductDetail';
import ProductList from '@/components/ProductList';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Product } from '@/types/product';
import { mockProducts } from '@/data/mockProducts';
import { useCart } from '@/hooks/useCart';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, cartItems } = useCart();
  
  useEffect(() => {
    // In a real app, this would be an API call
    setIsLoading(true);
    
    const foundProduct = mockProducts.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Get products in the same category
      const related = mockProducts
        .filter(p => p.category === foundProduct.category && p.id !== id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    setIsLoading(false);
  }, [id]);
  
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    addToCart(product, quantity);
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
        <main className="flex-grow container px-4 py-8 flex items-center justify-center">
          <div className="animate-pulse flex flex-col space-y-8 w-full max-w-4xl">
            <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
              </div>
              <div className="md:w-1/2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
        <main className="flex-grow container px-4 py-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you are looking for does not exist.</p>
          <Button onClick={() => navigate('/products')}>Browse Products</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="flex-grow container px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="mb-12">
          <ProductDetail 
            product={product}
            onAddToCart={handleAddToCart}
          />
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <ProductList 
              products={relatedProducts}
              onAddToCart={addToCart}
            />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
