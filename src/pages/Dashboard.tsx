
import { useAuth } from '@/context/AuthContext';
import { TalentDashboard } from '@/components/dashboard/TalentDashboard';
import { BusinessDashboard } from '@/components/dashboard/BusinessDashboard';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="container py-8">
      {user?.role === 'user' ? <TalentDashboard /> : <BusinessDashboard />}
    </div>
  );
}
