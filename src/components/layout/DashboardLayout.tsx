
import React from 'react';
import { UnifiedNavbar } from '@/components/navigation/UnifiedNavbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <UnifiedNavbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};
