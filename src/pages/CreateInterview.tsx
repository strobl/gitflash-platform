
import { Navigate } from 'react-router-dom';
import { InterviewForm } from '@/components/business/InterviewForm';
import { useAuth } from '@/context/AuthContext';

export default function CreateInterview() {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to dashboard if not a business user
  if (user?.role !== 'business') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Neues KI-Interview erstellen</h1>
        <p className="text-muted-foreground">
          Erstellen Sie ein KI-gestütztes Interview für Talente.
        </p>
      </div>
      
      <InterviewForm />
    </div>
  );
}
