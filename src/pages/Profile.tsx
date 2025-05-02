
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ProfileForm } from '@/components/talent/ProfileForm';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to dashboard if not a talent (user role)
  if (user?.role !== 'user') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mein Profil</h1>
          <p className="text-muted-foreground">Vervollständigen Sie Ihr Profil, um von Unternehmen gefunden zu werden.</p>
        </div>
        <Button variant="outline">Profil Vorschau</Button>
      </div>
      
      <ProfileForm />
    </div>
  );
}
