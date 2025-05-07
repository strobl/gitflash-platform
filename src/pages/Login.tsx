
import { useAuth } from '@/context/AuthContext';
import { useCamera } from '@/context/CameraContext';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import LoginForm from '@/components/auth/LoginForm';

export default function Login() {
  const { isAuthenticated } = useAuth();
  const { setInterviewRedirectId, setAutoActivationEnabled } = useCamera();
  const [searchParams] = useSearchParams();
  
  // Use toLowerCase to handle case variations in URL parameters
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const shouldActivateCamera = searchParams.get('activateCamera') === 'true';
  
  // Log all parameters for debugging
  console.log('Login: Parameters received:', {
    redirect: redirectTo,
    activateCamera: shouldActivateCamera,
    isAuthenticated
  });
  
  useEffect(() => {
    // Extract interview ID from redirect URL and store camera activation preference immediately
    if (redirectTo.includes('/uebung/')) {
      // Handle both uppercase and lowercase variations in the URL
      const redirectLower = redirectTo.toLowerCase();
      const parts = redirectLower.includes('/uebung/') 
        ? redirectTo.split('/uebung/') 
        : redirectTo.split('/Uebung/');
      
      if (parts.length > 1) {
        const interviewId = parts[1];
        console.log("Login: Storing interview ID from redirect URL:", interviewId);
        setInterviewRedirectId(interviewId);
        
        // Set auto-activation flag based on URL parameter
        console.log("Login: Setting auto camera activation to:", shouldActivateCamera);
        setAutoActivationEnabled(shouldActivateCamera);
      } else {
        console.error("Login: Failed to extract interview ID from URL:", redirectTo);
      }
    }
  }, [redirectTo, shouldActivateCamera, setInterviewRedirectId, setAutoActivationEnabled]);
  
  // Redirect to specified path or dashboard if already authenticated
  if (isAuthenticated) {
    console.log("Login: User is authenticated, redirecting to:", redirectTo);
    return <Navigate to={redirectTo} replace />;
  }
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#E7E9EC]">
      <LoginForm redirectUrl={redirectTo} shouldActivateCamera={shouldActivateCamera} />
    </div>
  );
}
