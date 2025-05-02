
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductList from '@/components/ProductList';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, TrendingUp, Truck, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Product, CartProduct } from '@/types/product';
import { mockProducts } from '@/data/mockProducts';
import { useCart } from '@/hooks/useCart';

export default function Index() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart, cartItems } = useCart();
  const [featuredProducts] = useState<Product[]>(mockProducts.slice(0, 8));
  
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-brand-purple to-brand-teal text-white">
          <div className="container px-4 py-20 md:py-32">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Import and sell products with automatic pricing
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Source products from Amazon and Alibaba with automatic price adjustments for maximum profit margins.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('/products')}
                >
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  size="lg"
                  onClick={() => navigate('/import')}
                >
                  Start Importing
                  <Search className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden md:block absolute right-0 bottom-0 w-1/3 h-full bg-contain bg-no-repeat bg-bottom" 
               style={{ backgroundImage: "url(https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop)" }}></div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Import Products</h3>
                <p className="text-muted-foreground">
                  Search and import products from Amazon and Alibaba directly to your store.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Set Your Markup</h3>
                <p className="text-muted-foreground">
                  Our system automatically calculates your pricing based on your desired markup percentage.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Sell & Ship</h3>
                <p className="text-muted-foreground">
                  Sell products to your customers and ship directly from the source to their doorstep.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Products Section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Button variant="outline" onClick={() => navigate('/products')}>
                View All Products
              </Button>
            </div>
            
            <ProductList 
              products={featuredProducts} 
              onAddToCart={handleAddToCart} 
            />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-brand-purple text-white">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3 space-y-4">
                <h2 className="text-3xl font-bold">Ready to start selling?</h2>
                <p className="text-lg opacity-90">
                  Import products, set your pricing, and start selling today with our seamless platform.
                </p>
              </div>
              
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/import')}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
