
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CompanyPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!user) {
      toast.error('Sie müssen angemeldet sein, um auf diese Seite zuzugreifen');
      navigate('/login');
      return;
    }
    
    if (profile?.role !== 'business') {
      toast.error('Sie haben keine Berechtigung für diese Seite');
      navigate('/');
      return;
    }
  }, [user, profile, navigate]);
  
  if (!user || profile?.role !== 'business') {
    return null; // Don't render anything while checking permissions
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Unternehmens-Dashboard</h1>
      <p>Willkommen im Unternehmensbereich</p>
      {/* Company dashboard content goes here */}
    </div>
  );
}
