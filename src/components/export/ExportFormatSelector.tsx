
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ExportFormat } from '@/utils/exportUtils';
import { Store, FileText, FileUp, Import } from 'lucide-react';

interface ExportFormatSelectorProps {
  exportFormat: ExportFormat;
  onFormatChange: (value: ExportFormat) => void;
  onSelectAll: () => void;
  allSelected: boolean;
  productsCount: number;
}

export const ExportFormatSelector = ({
  exportFormat,
  onFormatChange,
  onSelectAll,
  allSelected,
  productsCount
}: ExportFormatSelectorProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <label htmlFor="export-format" className="text-sm font-medium block mb-1">Export Format</label>
          <Select
            value={exportFormat}
            onValueChange={(value) => onFormatChange(value as ExportFormat)}
          >
            <SelectTrigger id="export-format" className="w-full">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  <span>CSV (Excel, Google Sheets)</span>
                </div>
              </SelectItem>
              <SelectItem value="json">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  <span>JSON (Technical)</span>
                </div>
              </SelectItem>
              <SelectItem value="amazon">
                <div className="flex items-center">
                  <FileUp className="w-4 h-4 mr-2" />
                  <span>Amazon Marketplace</span>
                </div>
              </SelectItem>
              <SelectItem value="marketplace">
                <div className="flex items-center">
                  <Store className="w-4 h-4 mr-2" />
                  <span>Other Marketplaces (eBay, Etsy)</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <label className="text-sm font-medium block mb-1">Actions</label>
          <Button
            variant="outline" 
            className="w-full"
            onClick={onSelectAll}
          >
            {allSelected ? 'Deselect All' : 'Select All Products'}
          </Button>
        </div>
      </div>
      
      {exportFormat === 'amazon' && (
        <div className="p-3 border rounded-md bg-amber-50 text-amber-800 text-sm">
          <p className="font-medium">Amazon Export Format</p>
          <p>This format is compatible with Amazon Seller Central bulk upload. You'll need to configure product categories in your Amazon account before importing.</p>
        </div>
      )}
      
      {exportFormat === 'marketplace' && (
        <div className="p-3 border rounded-md bg-amber-50 text-amber-800 text-sm">
          <p className="font-medium">Other Marketplaces Format</p>
          <p>This generic format works with eBay, Etsy and other popular marketplaces. You may need to adjust some fields in the exported file based on specific marketplace requirements.</p>
        </div>
      )}
    </div>
  );
};
