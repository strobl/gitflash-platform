
# Ausgaben Components

This directory contains components for the company expenses page that visualizes and manages financial data.

## Architecture

```
Ausgaben/
├── AusgabenOverview.tsx  - Main container component
├── TimeRangePicker.tsx   - Date range selector component
├── BudgetChart.tsx       - Chart visualization component
├── ExpenseTable.tsx      - Tabular data display component
├── DownloadButton.tsx    - CSV export functionality
├── useExpenseData.ts     - Data fetching and processing hook
└── README.md             - Documentation
```

## Component Hierarchy

```
UnternehmenAusgabenPage
└── AusgabenOverview
    ├── TimeRangePicker
    ├── Tabs
    │   ├── TabsContent (Diagramme)
    │   │   └── BudgetChart (2x - for expenses and hours)
    │   └── TabsContent (Tabellenansicht)
    │       ├── DownloadButton
    │       └── ExpenseTable
    └── useExpenseData (hook)
```

## API Contract

### `useExpenseData(dateRange)`

**Input:**
- `dateRange`: Object containing `from` and `to` Date objects

**Output:**
- `expenses`: Array of expense records
- `summary`: Object containing aggregated data
  - `totalAmount`: Total expenses in Euro
  - `totalHours`: Total hours worked
  - `monthlyExpenses`: Array of { date, amount } for chart
  - `monthlyHours`: Array of { date, amount } for chart
- `isLoading`: Boolean indicating data loading state

### ExpenseData Type

```typescript
type ExpenseData = {
  id: number;
  name: string;
  role: string;
  project: string;
  date: string; // ISO format: YYYY-MM-DD
  hours: number;
  amount: number;
  unit: string; // e.g. "Std" for hourly rate
};
```

## Future API Integration

For real-world implementation, replace the mock data in `useExpenseData.ts` with a fetch call to:

```
GET /api/expenses?from=YYYY-MM-DD&to=YYYY-MM-DD
```

Expected response format:
```json
{
  "expenses": [
    {
      "id": 1,
      "name": "Example Person",
      "role": "Example Role",
      "project": "Example Project",
      "date": "2025-03-01",
      "hours": 4.5,
      "amount": 150,
      "unit": "Std"
    },
    ...
  ],
  "summary": {
    "totalAmount": 5000,
    "totalHours": 250,
    "monthlyData": [
      {"date": "2025-01", "expenses": 1200, "hours": 60},
      {"date": "2025-02", "expenses": 1800, "hours": 90},
      {"date": "2025-03", "expenses": 2000, "hours": 100}
    ]
  }
}
```
