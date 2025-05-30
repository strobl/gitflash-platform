
import { useAuth } from '@/context/AuthContext';
import { useCamera } from '@/context/CameraContext';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { getRoleRedirectPath } from '@/utils/routingUtils';

export default function Login() {
  const { isAuthenticated, profile, isLoading } = useAuth();
  const { setInterviewRedirectId, setAutoActivationEnabled } = useCamera();
  const [searchParams] = useSearchParams();
  
  // Get redirect parameter if it exists
  const redirectParam = searchParams.get('redirect');
  const shouldActivateCamera = searchParams.get('activateCamera') === 'true';
  
  // Log all parameters for debugging
  console.log('Login: Parameters received:', {
    redirect: redirectParam,
    activateCamera: shouldActivateCamera,
    isAuthenticated,
    userRole: profile?.role,
    isLoading
  });

  // Show loading state while auth is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E7E9EC]">
        <div className="animate-spin h-10 w-10 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }
  
  useEffect(() => {
    // Extract interview ID from redirect URL and store camera activation preference immediately
    if (redirectParam && redirectParam.includes('/uebung/')) {
      // Handle both uppercase and lowercase variations in the URL
      const redirectLower = redirectParam.toLowerCase();
      const parts = redirectLower.includes('/uebung/') 
        ? redirectParam.split('/uebung/') 
        : redirectParam.split('/Uebung/');
      
      if (parts.length > 1) {
        const interviewId = parts[1];
        console.log("Login: Storing interview ID from redirect URL:", interviewId);
        setInterviewRedirectId(interviewId);
        
        // Set auto-activation flag based on URL parameter
        console.log("Login: Setting auto camera activation to:", shouldActivateCamera);
        setAutoActivationEnabled(shouldActivateCamera);
      } else {
        console.error("Login: Failed to extract interview ID from URL:", redirectParam);
      }
    }
  }, [redirectParam, shouldActivateCamera, setInterviewRedirectId, setAutoActivationEnabled]);
  
  // Redirect to appropriate dashboard based on role if already authenticated
  if (isAuthenticated && profile) {
    if (redirectParam) {
      // If a redirect param was provided, honor that
      console.log("Login: User is authenticated, redirecting to specified path:", redirectParam);
      return <Navigate to={redirectParam} replace />;
    } else {
      // Otherwise use role-based redirect
      const rolePath = getRoleRedirectPath(profile?.role);
      console.log("Login: User is authenticated, redirecting to role-based path:", rolePath);
      return <Navigate to={rolePath} replace />;
    }
  }
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#E7E9EC]">
      <LoginForm redirectUrl={redirectParam || ""} shouldActivateCamera={shouldActivateCamera} />
    </div>
  );
}
