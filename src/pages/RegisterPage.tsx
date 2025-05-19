
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { getRoleRedirectPath } from '@/utils/routingUtils';
import { Login2Form } from '@/components/auth/Login2Form';

export default function RegisterPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to appropriate page
  React.useEffect(() => {
    if (user && profile) {
      navigate(getRoleRedirectPath(profile.role));
    }
  }, [user, profile, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Registrieren
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Oder{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Melden Sie sich mit Ihrem bestehenden Konto an
            </a>
          </p>
        </div>
        <Login2Form isRegistration={true} />
      </div>
    </div>
  );
}
