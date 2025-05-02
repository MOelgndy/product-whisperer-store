
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductList from '@/components/ProductList';
import { Product } from '@/types/product';
import { mockProducts } from '@/data/mockProducts';
import { useCart } from '@/hooks/useCart';

export default function Products() {
  const [products] = useState<Product[]>(mockProducts);
  const { addToCart, cartItems } = useCart();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="flex-grow container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-muted-foreground">Browse our complete catalog of products</p>
        </div>
        
        <ProductList 
          products={products}
          onAddToCart={addToCart}
        />
      </main>
      
      <Footer />
    </div>
  );
}
