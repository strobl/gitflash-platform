
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimeRangePicker, DateRange } from './TimeRangePicker';
import { BudgetChart } from './BudgetChart';
import { ExpenseTable } from './ExpenseTable';
import { DownloadButton } from './DownloadButton';
import { useExpenseData } from './useExpenseData';

export const AusgabenOverview: React.FC = () => {
  const defaultDateRange = {
    from: new Date(2025, 2, 1), // March 1, 2025
    to: new Date(2025, 3, 15) // April 15, 2025
  };
  
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
  const { expenses, summary, isLoading } = useExpenseData(dateRange);
  
  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0A2540]">Ausgaben & Budget</h1>
          <p className="text-sm text-gray-600">
            Diese Seite zeigt Ihnen eine Übersicht über die Ausgaben Ihres Teams
          </p>
        </div>
        
        <TimeRangePicker 
          onChange={handleDateRangeChange} 
          currentRange={dateRange}
        />
      </div>
      
      <Tabs defaultValue="diagramme" className="w-full">
        <TabsList className="bg-gray-100 rounded-full p-1 mb-6">
          <TabsTrigger 
            value="diagramme"
            className="rounded-full data-[state=active]:bg-[#0A2540] data-[state=active]:text-white px-6"
          >
            Diagramme
          </TabsTrigger>
          <TabsTrigger 
            value="tabellenansicht" 
            className="rounded-full data-[state=active]:bg-[#0A2540] data-[state=active]:text-white px-6"
          >
            Tabellenansicht
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="diagramme" className="mt-0">
          <BudgetChart 
            data={summary.monthlyExpenses}
            title="Ausgaben"
            totalAmount={summary.totalAmount}
            isLoading={isLoading}
          />
          
          <BudgetChart 
            data={summary.monthlyHours}
            title="Geleistete Stunden"
            totalAmount={summary.totalHours}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="tabellenansicht" className="mt-0">
          <div className="flex justify-end mb-4">
            <DownloadButton 
              data={expenses} 
              filename={`ausgaben-export-${dateRange.from.toISOString().split('T')[0]}-${dateRange.to.toISOString().split('T')[0]}.csv`}
              isDisabled={isLoading}
            />
          </div>
          
          <ExpenseTable 
            data={expenses}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
