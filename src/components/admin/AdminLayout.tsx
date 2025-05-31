
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <div className="bg-gray-50 min-h-full">
        {children}
      </div>
    </DashboardLayout>
  );
};
