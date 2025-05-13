
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, FileExport } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/product';

export default function ExportProducts() {
  const { toast } = useToast();
  const { products, isLoading } = useProducts();
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(current => 
      current.includes(productId) 
        ? current.filter(id => id !== productId) 
        : [...current, productId]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product.id));
    }
  };

  const exportProducts = () => {
    setIsExporting(true);
    
    try {
      // Get selected products data
      const dataToExport = products.filter(product => 
        selectedProducts.includes(product.id)
      );
      
      if (dataToExport.length === 0) {
        toast({
          title: "No Products Selected",
          description: "Please select at least one product to export.",
          variant: "destructive",
        });
        setIsExporting(false);
        return;
      }
      
      let exportData: string;
      let fileName: string;
      
      // Format data based on selected export format
      if (exportFormat === 'csv') {
        // Create CSV data
        const headers = ['id', 'title', 'description', 'originalPrice', 'price', 'source', 'category', 'inStock'];
        const csvRows = [
          headers.join(','),
          ...dataToExport.map(product => {
            return [
              product.id,
              `"${product.title.replace(/"/g, '""')}"`,
              `"${product.description.replace(/"/g, '""')}"`,
              product.originalPrice,
              product.price || '',
              product.source,
              product.category || '',
              product.inStock
            ].join(',');
          })
        ];
        
        exportData = csvRows.join('\n');
        fileName = `products_export_${new Date().toISOString().split('T')[0]}.csv`;
      } else {
        // Create JSON data
        exportData = JSON.stringify(dataToExport, null, 2);
        fileName = `products_export_${new Date().toISOString().split('T')[0]}.json`;
      }
      
      // Create download link
      const blob = new Blob([exportData], { type: exportFormat === 'csv' ? 'text/csv' : 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = fileName;
      link.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: `Successfully exported ${dataToExport.length} products as ${exportFormat.toUpperCase()}.`,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "An error occurred while exporting products.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Export Products</CardTitle>
        <CardDescription>
          Select products to export for your online stores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="export-format" className="text-sm font-medium block mb-1">Export Format</label>
              <Select
                value={exportFormat}
                onValueChange={(value) => setExportFormat(value as 'csv' | 'json')}
              >
                <SelectTrigger id="export-format" className="w-full">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV (Excel, Google Sheets)</SelectItem>
                  <SelectItem value="json">JSON (Technical)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label className="text-sm font-medium block mb-1">Actions</label>
              <Button
                variant="outline" 
                className="w-full"
                onClick={handleSelectAll}
              >
                {selectedProducts.length === products.length ? 'Deselect All' : 'Select All Products'}
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md">
            <div className="p-3 border-b bg-muted/50">
              <div className="grid grid-cols-12 gap-4 font-medium text-sm">
                <div className="col-span-1">Select</div>
                <div className="col-span-7">Product Name</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Source</div>
              </div>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="p-4 text-center">No products available to export.</div>
              ) : (
                products.map(product => (
                  <div 
                    key={product.id} 
                    className="grid grid-cols-12 gap-4 p-3 border-b hover:bg-gray-50 last:border-0 items-center text-sm"
                  >
                    <div className="col-span-1">
                      <Checkbox 
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => handleSelectProduct(product.id)}
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
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          {selectedProducts.length} products selected
        </div>
        <Button 
          onClick={exportProducts}
          disabled={isExporting || selectedProducts.length === 0}
        >
          {isExporting ? (
            <>Exporting...</>
          ) : (
            <>
              <FileExport className="mr-2 h-4 w-4" />
              Export {selectedProducts.length} Products
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
