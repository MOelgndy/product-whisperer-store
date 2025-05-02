
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Search, ShoppingCart, Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { importProductByUrl, searchProducts } from '@/services/productImport';

export default function ImportForm() {
  const { toast } = useToast();
  const { addProduct } = useProducts();
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState<'amazon' | 'alibaba'>('amazon');
  const [searchTerm, setSearchTerm] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [markupPercentage, setMarkupPercentage] = useState(3);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm && !productUrl) {
      toast({
        title: "Error",
        description: "Please enter a search term or product URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (searchTerm) {
        // Search products
        const results = await searchProducts(searchTerm, source, markupPercentage);
        
        if (results.length > 0 && results[0].success) {
          toast({
            title: "Success",
            description: `Found ${results.length} products from ${source}`,
          });
          
          // Here you would typically display the results
          console.log('Search results:', results);
        } else {
          toast({
            title: "Error",
            description: results[0].error || "No products found",
            variant: "destructive",
          });
        }
      } else if (productUrl) {
        // Import single product
        const result = await importProductByUrl(productUrl, source);
        
        if (result.success && result.product) {
          addProduct(result.product);
          toast({
            title: "Success",
            description: `Imported ${result.product.title} from ${source}`,
          });
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to import product",
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Import Products</CardTitle>
        <CardDescription>
          Search and import products from Amazon and Alibaba with automatic pricing adjustments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={source} onValueChange={(value) => setSource(value as 'amazon' | 'alibaba')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="amazon">Amazon</TabsTrigger>
            <TabsTrigger value="alibaba">Alibaba</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="search" className="text-sm font-medium block mb-1">Search by Keywords</label>
                <div className="flex gap-2">
                  <Input
                    id="search"
                    placeholder={`Search ${source === 'amazon' ? 'Amazon' : 'Alibaba'} products...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                    Search
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>
              
              <div>
                <label htmlFor="url" className="text-sm font-medium block mb-1">Import by URL</label>
                <div className="flex gap-2">
                  <Input
                    id="url"
                    placeholder={`Paste ${source === 'amazon' ? 'Amazon' : 'Alibaba'} product URL...`}
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="outline" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShoppingCart className="h-4 w-4 mr-2" />}
                    Import
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Markup Percentage: {markupPercentage}%
              </label>
              <Slider
                value={[markupPercentage]}
                min={1}
                max={15}
                step={0.5}
                onValueChange={(value) => setMarkupPercentage(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Products will be priced at {markupPercentage}% higher than the original price.
              </p>
            </div>
          </form>
        </Tabs>
      </CardContent>
      <CardFooter className="flex items-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Connected to Supabase backend for API access.
        </p>
      </CardFooter>
    </Card>
  );
}
