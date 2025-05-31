
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  backLink?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, backLink }) => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="bg-gray-50 min-h-full">
        {(title || backLink) && (
          <div className="bg-white border-b">
            <div className="container py-4">
              <div className="flex items-center gap-4">
                {backLink && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(backLink)}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Zurück
                  </Button>
                )}
                {title && (
                  <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                )}
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </DashboardLayout>
  );
};
