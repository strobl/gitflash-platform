
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';

export default function Login() {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  
  // Redirect to specified path or dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 bg-gitflash-background">
        <div className="max-w-lg w-full">
          <AuthModal redirectUrl={redirectTo} />
        </div>
      </div>
      
      <footer className="bg-gitflash-primary text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} GitFlash. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
