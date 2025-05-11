
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navigation/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { getRoleRedirectPath } from '@/utils/routingUtils';

interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
  backLink?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  title, 
  children, 
  backLink
}) => {
  const { profile, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is admin/operator
  if (!isLoading && profile?.role !== 'operator') {
    return <Navigate to={profile ? getRoleRedirectPath(profile.role) : '/login'} replace />;
  }
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {backLink && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(backLink)}
                className="flex items-center gap-1"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Zurück
              </Button>
            )}
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
