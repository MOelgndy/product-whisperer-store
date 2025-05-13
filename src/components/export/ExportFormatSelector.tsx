
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface ExportFormatSelectorProps {
  exportFormat: 'csv' | 'json';
  onFormatChange: (value: 'csv' | 'json') => void;
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
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="flex-1">
        <label htmlFor="export-format" className="text-sm font-medium block mb-1">Export Format</label>
        <Select
          value={exportFormat}
          onValueChange={(value) => onFormatChange(value as 'csv' | 'json')}
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
          onClick={onSelectAll}
        >
          {allSelected ? 'Deselect All' : 'Select All Products'}
        </Button>
      </div>
    </div>
  );
};
