
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowDown, ArrowUp } from 'lucide-react';
import { ExpenseData } from './useExpenseData';

interface ExpenseTableProps {
  data: ExpenseData[];
  isLoading?: boolean;
}

type SortField = 'date' | 'hours' | 'amount';
type SortDirection = 'asc' | 'desc';

export const ExpenseTable: React.FC<ExpenseTableProps> = ({ 
  data,
  isLoading = false
}) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const rowsPerPage = 10;
  
  // Filter data based on search
  const filteredData = data.filter(item => {
    const searchLower = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.project.toLowerCase().includes(searchLower) ||
      item.role.toLowerCase().includes(searchLower)
    );
  });
  
  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else if (sortField === 'hours') {
      return sortDirection === 'asc' ? a.hours - b.hours : b.hours - a.hours;
    } else if (sortField === 'amount') {
      return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0;
  });
  
  // Paginate data
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4" />
    );
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 min-h-[300px] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Suche..."
              value={search}
              onChange={handleSearchChange}
              className="pl-10 h-9 bg-white border border-gray-200"
            />
          </div>
        </div>
        
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">
                  <div className="flex items-center text-xs font-bold text-[#0A2540]">
                    Name (Rolle)
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center text-xs font-bold text-[#0A2540]">
                    Projekt
                  </div>
                </TableHead>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer text-xs font-bold text-[#0A2540]"
                    onClick={() => handleSort('date')}
                  >
                    Datum
                    {renderSortIcon('date')}
                  </div>
                </TableHead>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer text-xs font-bold text-[#0A2540]"
                    onClick={() => handleSort('hours')}
                  >
                    Stunden
                    {renderSortIcon('hours')}
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div 
                    className="flex items-center justify-end cursor-pointer text-xs font-bold text-[#0A2540]"
                    onClick={() => handleSort('amount')}
                  >
                    Abrechnung
                    {renderSortIcon('amount')}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((expense, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="py-3">
                      <div>
                        <p className="text-sm font-medium">{expense.name}</p>
                        <p className="text-xs text-gray-500">{expense.role}</p>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <p className="text-sm">{expense.project}</p>
                    </TableCell>
                    <TableCell className="py-3">
                      <p className="text-sm">{expense.date}</p>
                    </TableCell>
                    <TableCell className="py-3">
                      <p className="text-sm">{expense.hours}</p>
                    </TableCell>
                    <TableCell className="text-right py-3">
                      <p className="text-sm font-medium">{`${expense.amount}€/${expense.unit}`}</p>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-[200px] text-center">
                    Keine Ausgaben im gewählten Zeitraum
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Seite {currentPage} von {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(current => Math.max(current - 1, 1))}
                disabled={currentPage === 1}
                className="h-8 px-3"
              >
                Zurück
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(current => Math.min(current + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-8 px-3"
              >
                Weiter
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
