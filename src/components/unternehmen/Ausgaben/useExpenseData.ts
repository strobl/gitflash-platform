
import { useState, useEffect } from 'react';
import { DateRange } from './TimeRangePicker';
import { format } from 'date-fns';

export type ExpenseData = {
  id: number;
  name: string;
  role: string;
  project: string;
  date: string;
  hours: number;
  amount: number;
  unit: string;
};

export type ExpenseSummary = {
  totalAmount: number;
  totalHours: number;
  monthlyExpenses: { date: string; amount: number }[];
  monthlyHours: { date: string; amount: number }[];
};

// Sample data - in a real app, this would be fetched from an API
const MOCK_EXPENSES: ExpenseData[] = [
  { 
    id: 1, 
    name: 'Lisa Meier', 
    role: 'Bauleiter', 
    project: 'Neubau Projekt A', 
    date: '2025-04-01', 
    hours: 3.2, 
    amount: 200, 
    unit: 'Std' 
  },
  { 
    id: 2, 
    name: 'Ahmed Yilmaz', 
    role: 'UX-Designer', 
    project: 'Neubau Projekt A', 
    date: '2025-03-02', 
    hours: 7.5, 
    amount: 200, 
    unit: 'Std' 
  },
  { 
    id: 3, 
    name: 'Jonas Roth', 
    role: 'TGA-Ingenieur', 
    project: 'Konzept Nord', 
    date: '2025-03-02', 
    hours: 2.4, 
    amount: 180, 
    unit: 'Std' 
  },
  { 
    id: 4, 
    name: 'Sophie Wagner', 
    role: 'Juristin', 
    project: 'Sanierung Lagerhalle', 
    date: '2025-03-02', 
    hours: 2.1, 
    amount: 120, 
    unit: 'Std' 
  },
  { 
    id: 5, 
    name: 'Tobias König', 
    role: 'PM', 
    project: 'BIM Einführung', 
    date: '2025-04-01', 
    hours: 8.0, 
    amount: 180, 
    unit: 'Std' 
  }
];

export const useExpenseData = (dateRange: DateRange) => {
  const [isLoading, setIsLoading] = useState(true);
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [summary, setSummary] = useState<ExpenseSummary>({
    totalAmount: 0,
    totalHours: 0,
    monthlyExpenses: [],
    monthlyHours: []
  });

  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    
    // In a real app, this would be a fetch call to an API
    setTimeout(() => {
      // Filter expenses by date range
      const startDate = new Date(dateRange.from);
      const endDate = new Date(dateRange.to);
      
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      
      const filteredExpenses = MOCK_EXPENSES.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= startDate && expenseDate <= endDate;
      });
      
      setExpenses(filteredExpenses);
      
      // Calculate summary data
      const totalAmount = filteredExpenses.reduce((sum, expense) => sum + (expense.amount * expense.hours), 0);
      const totalHours = filteredExpenses.reduce((sum, expense) => sum + expense.hours, 0);
      
      // Group by month for charts
      const expensesByMonth: Record<string, number> = {};
      const hoursByMonth: Record<string, number> = {};
      
      filteredExpenses.forEach(expense => {
        const date = new Date(expense.date);
        const monthKey = format(date, 'yyyy-MM');
        const amount = expense.amount * expense.hours;
        
        expensesByMonth[monthKey] = (expensesByMonth[monthKey] || 0) + amount;
        hoursByMonth[monthKey] = (hoursByMonth[monthKey] || 0) + expense.hours;
      });
      
      // Convert to array format for charts
      const monthlyExpenses = Object.entries(expensesByMonth).map(([date, amount]) => ({ date, amount }));
      const monthlyHours = Object.entries(hoursByMonth).map(([date, amount]) => ({ date, amount }));
      
      // Sort by date
      monthlyExpenses.sort((a, b) => a.date.localeCompare(b.date));
      monthlyHours.sort((a, b) => a.date.localeCompare(b.date));
      
      setSummary({
        totalAmount,
        totalHours,
        monthlyExpenses,
        monthlyHours
      });
      
      setIsLoading(false);
    }, 800); // Simulate loading delay
  }, [dateRange]);
  
  return { expenses, summary, isLoading };
};
