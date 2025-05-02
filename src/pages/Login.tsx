
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';

export default function Login() {
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="max-w-lg w-full">
          <AuthModal />
        </div>
      </div>
    </div>
  );
}
