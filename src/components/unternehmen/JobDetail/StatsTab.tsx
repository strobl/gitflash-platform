
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { JobStats } from './types';

interface StatsTabProps {
  stats: JobStats;
}

export const StatsTab: React.FC<StatsTabProps> = ({ stats }) => {
  // Merge views and applications data for the chart
  const mergedData = stats.viewsOverTime.map(viewItem => {
    const date = viewItem.date;
    const applicationsItem = stats.applicationsOverTime.find(item => item.date === date);
    return {
      date,
      views: viewItem.views,
      applications: applicationsItem ? applicationsItem.applications : 0
    };
  });

  // Format date for display on the chart
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}.${date.getMonth() + 1}`;
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Gesamt-Aufrufe</p>
          <p className="text-2xl font-medium">{stats.views}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Bewerbungen</p>
          <p className="text-2xl font-medium">{stats.applications}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Durchschnittlicher Score</p>
          <p className="text-2xl font-medium">{stats.averageScore}%</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4">Aufrufe & Bewerbungen über Zeit</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mergedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                tick={{ fontSize: 12 }}
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => [value, name === 'views' ? 'Aufrufe' : 'Bewerbungen']}
                labelFormatter={label => `Datum: ${formatDate(label)}`}
              />
              <Legend 
                formatter={(value) => value === 'views' ? 'Aufrufe' : 'Bewerbungen'} 
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="views"
                name="views"
                stroke="#003D5C"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="applications"
                name="applications"
                stroke="#FFAA00"
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
