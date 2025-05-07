
import { useAuth } from '@/context/AuthContext';
import { useCamera } from '@/context/CameraContext';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import LoginForm from '@/components/auth/LoginForm';

export default function Login() {
  const { isAuthenticated } = useAuth();
  const { setInterviewRedirectId, setAutoActivationEnabled } = useCamera();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const shouldActivateCamera = searchParams.get('activateCamera') === 'true';
  
  // Extract interview ID from redirect URL and store camera activation preference
  useEffect(() => {
    if (redirectTo.includes('/uebung/')) {
      const interviewId = redirectTo.split('/uebung/')[1];
      console.log("Storing interview ID from redirect URL:", interviewId);
      setInterviewRedirectId(interviewId);
      
      // If we're redirecting from an interview, we want to auto-activate the camera when returning
      setAutoActivationEnabled(shouldActivateCamera);
    }
  }, [redirectTo, setInterviewRedirectId, shouldActivateCamera, setAutoActivationEnabled]);
  
  // Redirect to specified path or dashboard if already authenticated
  if (isAuthenticated) {
    console.log("User is authenticated, redirecting to:", redirectTo);
    return <Navigate to={redirectTo} replace />;
  }
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#E7E9EC]">
      <LoginForm redirectUrl={redirectTo} shouldActivateCamera={shouldActivateCamera} />
    </div>
  );
}
