
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { ExpenseData } from './useExpenseData';

interface DownloadButtonProps {
  data: ExpenseData[];
  filename?: string;
  isDisabled?: boolean;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  data,
  filename = 'ausgaben-export.csv',
  isDisabled = false
}) => {
  const handleDownload = () => {
    if (data.length === 0) return;
    
    // Creating CSV content
    const headers = ['Datum', 'Name', 'Rolle', 'Projekt', 'Stunden', 'Abrechnung'];
    
    const csvRows = [
      headers.join(','),
      ...data.map(item => [
        item.date,
        item.name,
        item.role,
        item.project,
        item.hours,
        `${item.amount}€/${item.unit}`
      ].join(','))
    ];
    
    const csvContent = csvRows.join('\n');
    
    // Creating the download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleDownload} 
      disabled={isDisabled || data.length === 0}
      className="flex items-center gap-2 text-xs h-8 bg-white border border-gray-200"
    >
      <Download className="h-3.5 w-3.5" />
      CSV exportieren
    </Button>
  );
};
