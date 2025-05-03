
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navigation/Navbar';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { InterviewForm } from '@/components/business/interview/InterviewForm';

export default function CreateInterview() {
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check authentication in effect to handle async auth state
    if (!isAuthenticated) {
      toast.error('Sie müssen angemeldet sein, um ein Interview zu erstellen.');
      navigate('/login');
    } else if (profile?.role !== 'business' && profile?.role !== 'operator') {
      toast.error('Nur Unternehmen und Administratoren können Interviews erstellen.');
      navigate('/dashboard');
    }
  }, [isAuthenticated, profile, navigate]);
  
  // Don't render anything while checking auth
  if (!isAuthenticated || !user) {
    return null;
  }
  
  // Redirect to dashboard if not a business user or operator
  if (profile?.role !== 'business' && profile?.role !== 'operator') {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Neues KI-Interview erstellen</h1>
          <p className="text-muted-foreground">
            Erstellen Sie ein KI-gestütztes Interview für Talente.
          </p>
        </div>
        
        <InterviewForm />
      </div>
    </div>
  );
}
