
import React from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { PaymentsStatistics } from '@/components/admin/PaymentsStatistics';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function AdminPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      toast.error('Sie müssen angemeldet sein, um auf diese Seite zuzugreifen');
      navigate('/login');
      return;
    }
    
    if (profile?.role !== 'admin' && profile?.role !== 'operator') {
      toast.error('Sie haben keine Berechtigung für diese Seite');
      navigate('/');
      return;
    }
  }, [user, profile, navigate]);
  
  if (!user || (profile?.role !== 'admin' && profile?.role !== 'operator')) {
    return null; // Don't render anything while checking permissions
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SharedNavbar />
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Admin-Dashboard</h1>
        <p className="text-gray-600 mb-6">Verwalten Sie Zahlungen und sehen Sie Statistiken ein</p>
        
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Zahlungsstatistiken</h2>
          <PaymentsStatistics />
        </div>
      </div>
    </div>
  );
}
