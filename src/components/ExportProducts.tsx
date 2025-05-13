
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useProducts } from '@/hooks/useProducts';
import { downloadExportFile, exportFormatMap, ExportFormat } from '@/utils/exportUtils';
import { ExportFormatSelector } from './export/ExportFormatSelector';
import { ProductSelectionList } from './export/ProductSelectionList';

export default function ExportProducts() {
  const { toast } = useToast();
  const { products, isLoading } = useProducts();
  const [exportFormat, setExportFormat] = useState<ExportFormat>('csv');
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
      
      // Get the appropriate export function based on format
      const exportFunction = exportFormatMap[exportFormat];
      
      if (!exportFunction) {
        throw new Error(`Export format ${exportFormat} not supported`);
      }
      
      // Format data based on selected export format
      const exportData = exportFunction(dataToExport);
      
      // Download the file
      downloadExportFile(exportData, exportFormat);
      
      // Format name for toast
      const formatDisplayName = {
        csv: 'CSV',
        json: 'JSON',
        amazon: 'Amazon Marketplace',
        marketplace: 'Other Marketplaces'
      }[exportFormat];
      
      toast({
        title: "Export Successful",
        description: `Successfully exported ${dataToExport.length} products for ${formatDisplayName}.`,
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
          Export products to various platforms and formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ExportFormatSelector 
            exportFormat={exportFormat}
            onFormatChange={setExportFormat}
            onSelectAll={handleSelectAll}
            allSelected={selectedProducts.length === products.length}
            productsCount={products.length}
          />
          
          <div className="border rounded-md">
            <div className="p-3 border-b bg-muted/50">
              <div className="grid grid-cols-12 gap-4 font-medium text-sm">
                <div className="col-span-1">Select</div>
                <div className="col-span-7">Product Name</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Source</div>
              </div>
            </div>
            
            <ProductSelectionList
              products={products}
              selectedProducts={selectedProducts}
              isLoading={isLoading}
              onSelectProduct={handleSelectProduct}
            />
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
              <FileText className="mr-2 h-4 w-4" />
              Export {selectedProducts.length} Products
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
