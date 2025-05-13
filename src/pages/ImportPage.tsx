
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImportForm from '@/components/ImportForm';
import ExportProducts from '@/components/ExportProducts';
import { useCart } from '@/hooks/useCart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ImportPage() {
  const { cartItems } = useCart();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  // Set default tab value based on URL parameter
  const defaultTab = tabParam === 'export' ? 'export' : 'import';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="flex-grow container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">Import and export products for your store</p>
        </div>
        
        <div className="max-w-3xl mb-10">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="import">Import Products</TabsTrigger>
              <TabsTrigger value="export">Export Products</TabsTrigger>
            </TabsList>
            
            <TabsContent value="import">
              <ImportForm />
            </TabsContent>
            
            <TabsContent value="export">
              <ExportProducts />
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-bold mb-4">About Product Management</h2>
            <div className="prose max-w-none">
              <p>
                This feature allows you to import products from both Amazon and Alibaba directly into your store,
                and export your products to various platforms and formats.
              </p>
              <ul>
                <li>Import products from Amazon and Alibaba with automatic price markup</li>
                <li>Extract product information including title, description, and images</li>
                <li>Export products in CSV format for spreadsheet applications</li>
                <li>Export products in JSON format for technical integrations</li>
                <li>Select which products to export to different platforms</li>
              </ul>
              <p className="text-amber-600">
                <strong>Note:</strong> The full functionality requires Supabase integration to connect to external APIs.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
