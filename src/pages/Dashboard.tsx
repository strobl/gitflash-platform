
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getRoleRedirectPath } from '@/utils/routingUtils';

const Dashboard: React.FC = () => {
  const { profile, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/login', { replace: true });
        return;
      }

      if (profile?.role) {
        const redirectPath = getRoleRedirectPath(profile.role);
        if (redirectPath !== '/login' && redirectPath !== '/dashboard') {
          navigate(redirectPath, { replace: true });
        }
      }
    }
  }, [isAuthenticated, profile, isLoading, navigate]);

  // Show minimal loading while redirecting
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Weiterleitung...</h1>
        <p className="text-gray-600">Sie werden zu Ihrem Bereich weitergeleitet.</p>
      </div>
    </div>
  );
};

export default Dashboard;
