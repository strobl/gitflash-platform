
import { useAuth } from '@/context/AuthContext';
import { useCamera } from '@/context/CameraContext';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Login2Form from '@/components/auth/Login2Form';

export default function Login2() {
  const { isAuthenticated } = useAuth();
  const { activateCamera } = useCamera();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const interviewId = searchParams.get('interviewId');
  
  console.log('Login2: Mounted with interview ID:', interviewId);
  
  // If user is already authenticated, redirect directly to the interview
  useEffect(() => {
    if (isAuthenticated && interviewId) {
      console.log('Login2: User already authenticated, redirecting to interview:', interviewId);
      navigate(`/uebung/${interviewId}`);
    }
  }, [isAuthenticated, interviewId, navigate]);
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#E7E9EC]">
      <Login2Form interviewId={interviewId} />
    </div>
  );
}
