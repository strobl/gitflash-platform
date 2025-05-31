
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { UnternehmenNavigation } from './UnternehmenNavigation';

interface UnternehmenLayoutProps {
  children: React.ReactNode;
}

export const UnternehmenLayout: React.FC<UnternehmenLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <div className="flex flex-1 overflow-hidden">
        <UnternehmenNavigation />
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </DashboardLayout>
  );
};
