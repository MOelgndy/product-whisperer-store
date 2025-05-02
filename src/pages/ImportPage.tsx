
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImportForm from '@/components/ImportForm';
import { useCart } from '@/hooks/useCart';

export default function ImportPage() {
  const { cartItems } = useCart();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="flex-grow container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Import Products</h1>
          <p className="text-muted-foreground">Search and import products from Amazon and Alibaba</p>
        </div>
        
        <div className="max-w-3xl">
          <ImportForm />
          
          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-bold mb-4">About Importing Products</h2>
            <div className="prose max-w-none">
              <p>
                This feature allows you to import products from both Amazon and Alibaba directly into your store. 
                When you import a product, our system will:
              </p>
              <ul>
                <li>Extract all product information including title, description, and images</li>
                <li>Track the original price and calculate your selling price based on your markup percentage</li>
                <li>Monitor inventory levels</li>
                <li>Enable direct shipping to your customers</li>
              </ul>
              <p className="text-amber-600">
                <strong>Note:</strong> This feature requires Supabase integration to connect to external APIs.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
