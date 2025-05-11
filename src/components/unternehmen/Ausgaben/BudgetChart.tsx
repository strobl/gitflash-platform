
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

export type ExpenseDataPoint = {
  date: string;
  amount: number;
};

interface BudgetChartProps {
  data: ExpenseDataPoint[];
  title: string;
  totalAmount: number;
  isLoading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-sm text-xs">
        <p className="font-semibold">{label}</p>
        <p className="text-gray-700">{`${payload[0].value}€`}</p>
      </div>
    );
  }
  return null;
};

export const BudgetChart: React.FC<BudgetChartProps> = ({ 
  data, 
  title, 
  totalAmount, 
  isLoading = false 
}) => {
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: format(new Date(item.date), 'MMM', { locale: de })
  }));

  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 min-h-[250px] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 min-h-[250px] flex flex-col items-center justify-center">
        <p className="text-gray-500 text-center">Keine Daten im ausgewählten Zeitraum verfügbar</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-xs text-gray-500">Kosten, die durch Ihr Team verursacht wurden</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Gesamt</p>
          <p className="text-lg font-semibold">{`€${totalAmount}`}</p>
        </div>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="formattedDate" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}€`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="amount" 
              fill="#6C7C8C" 
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
