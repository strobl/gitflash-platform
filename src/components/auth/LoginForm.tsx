
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCamera } from "@/context/CameraContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import Divider from "./Divider";
import SocialLogin from "./SocialLogin";
import TermsText from "./TermsText";
import AuthToggle from "./AuthToggle";
import UserTypeSelect from "./UserTypeSelect";
import LoginLogo from "./LoginLogo";
import { getRoleRedirectPath } from "@/utils/routingUtils";

interface LoginFormProps {
  redirectUrl?: string;
  shouldActivateCamera?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  redirectUrl = "",
  shouldActivateCamera = false
}) => {
  const { login, loginWithGoogle, register, isLoading, profile } = useAuth();
  const { 
    setInterviewRedirectId, 
    setAutoActivationEnabled,
    setHasRedirectedFromLogin
  } = useCamera();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [userType, setUserType] = useState<"user" | "business">("user");
  const [name, setName] = useState("");

  console.log('🔒 LoginForm: Current state:', {
    isRegisterMode,
    userType,
    redirectUrl,
    shouldActivateCamera,
    profileRole: profile?.role,
    isLoading
  });

  const handleToggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  const handleSubmit = async () => {
    console.log('🚀 LoginForm: Submit started:', { isRegisterMode, email, userType });
    
    try {
      if (!email) {
        toast.error("Bitte E-Mail-Adresse eingeben");
        return;
      }
      
      if (isRegisterMode) {
        if (!name) {
          toast.error("Bitte Namen eingeben");
          return;
        }
        
        if (!password) {
          toast.error("Bitte Passwort eingeben");
          return;
        }
        
        console.log('📝 LoginForm: Starting registration...');
        await register(name, email, password, userType);
        toast.success("Registrierung erfolgreich! Bitte überprüfe deine E-Mails.");
        console.log('✅ LoginForm: Registration successful');
      } else {
        if (!password) {
          toast.error("Bitte Passwort eingeben");
          return;
        }
        
        console.log('🔐 LoginForm: Starting login...');
        // Perform login and wait for profile to be fetched
        const loggedInProfile = await login(email, password);
        toast.success("Login erfolgreich!");

        console.log("✅ LoginForm: Login successful, determining redirect...");
        
        // Determine if we need to redirect to an interview
        let interviewRedirect = false;
        let interviewId = null;
        
        if (redirectUrl && redirectUrl.includes('/uebung/')) {
          console.log("🎯 LoginForm: Interview redirect detected:", redirectUrl);
          // Extract interview ID from redirectUrl
          interviewId = redirectUrl.split('/uebung/')[1];
          interviewRedirect = true;
          
          // Set the interview ID in context for the receiving component
          setInterviewRedirectId(interviewId);
          
          // Set camera activation flag based on URL parameter
          setAutoActivationEnabled(shouldActivateCamera);
          
          // IMPORTANT: Set the hasRedirectedFromLogin flag BEFORE navigation
          setHasRedirectedFromLogin(true);
          
          // Navigate to interview page
          setTimeout(() => {
            console.log("🎯 LoginForm: Navigating to interview:", redirectUrl);
            navigate(redirectUrl);
          }, 100);
        } else {
          console.log("🏢 LoginForm: Standard role-based redirect");
          // Standard role-based redirect
          setTimeout(() => {
            // Get the role from the authenticated user's profile
            const roleBasedPath = getRoleRedirectPath((loggedInProfile || profile)?.role);
            console.log("🏢 LoginForm: Navigating to role-based path:", { role: (loggedInProfile || profile)?.role, path: roleBasedPath });
            navigate(roleBasedPath);
          }, 100);
        }
      }
    } catch (error: any) {
      console.error("❌ LoginForm: Auth error:", error);
      toast.error(error.message || "Ein Fehler ist aufgetreten");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Check if we're redirecting to an interview
      if (redirectUrl && redirectUrl.includes('/uebung/')) {
        // Extract interview ID from redirectUrl
        const interviewId = redirectUrl.split('/uebung/')[1];
        
        // Set the interview ID in context for the receiving component
        setInterviewRedirectId(interviewId);
        
        // Set camera activation flag based on URL parameter
        setAutoActivationEnabled(shouldActivateCamera);
        
        // Set the hasRedirectedFromLogin flag BEFORE navigation
        setHasRedirectedFromLogin(true);
        
        // Start Google login process with the redirect URL
        await loginWithGoogle(redirectUrl);
      } else {
        // No specific redirect, let the auth context handle it based on role
        await loginWithGoogle();
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error("Fehler beim Google Login: " + (error.message || "Unbekannter Fehler"));
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center py-8">
      <div className="flex flex-col items-center w-[400px] px-4 py-[40px] max-md:w-full max-md:px-4 max-md:py-20 max-sm:px-4 max-sm:py-[40px]">
        <div className="flex flex-col items-center w-full bg-white px-6 py-8 rounded-xl max-md:px-4 max-md:py-6 max-sm:p-4 shadow-sm">
          <LoginLogo />
          
          <h2 className="text-xl font-bold text-[#0A2540] mb-1 self-start">
            {isRegisterMode ? "Registrieren" : "Login"}
          </h2>
          
          <p className="text-sm text-[#6C7C8C] mb-6 self-start">
            {isRegisterMode ? "Erstelle dein Konto" : "Melde dich bei deinem Konto an"}
          </p>
          
          <UserTypeSelect 
            value={userType} 
            onChange={(value) => setUserType(value as "user" | "business")} 
          />
          
          {isRegisterMode && (
            <div className="w-full mb-4">
              <label className="text-[10px] font-bold text-[#0A2540] mb-1.5 block">
                Name
              </label>
              <div className={`flex items-center w-full h-9 border px-5 py-[11px] rounded-md border-solid border-[#6C7C8C] max-md:px-4 max-md:py-[11px] max-sm:px-3 max-sm:py-[11px]`}>
                <div className="mr-2.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 7C8.61276 7 9.91667 5.69609 9.91667 4.08333C9.91667 2.47057 8.61276 1.16667 7 1.16667C5.38724 1.16667 4.08333 2.47057 4.08333 4.08333C4.08333 5.69609 5.38724 7 7 7Z" stroke="#6C7C8C" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.0174 12.8333C12.0174 10.5758 9.8066 8.75 6.99992 8.75C4.19325 8.75 1.98242 10.5758 1.98242 12.8333" stroke="#6C7C8C" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="text-[10px] font-normal text-[#6C7C8C] bg-transparent outline-none w-full"
                  aria-label="Name"
                />
              </div>
            </div>
          )}
          
          <EmailInput value={email} onChange={setEmail} />
          
          <PasswordInput value={password} onChange={setPassword} />
          
          <LoginButton 
            onClick={handleSubmit} 
            isLoading={isLoading}
            text={isRegisterMode ? "Registrieren" : "Anmelden"} 
          />
          
          <Divider />
          
          <SocialLogin 
            provider="google" 
            onClick={handleGoogleLogin}
            text={isRegisterMode ? "Mit Google registrieren" : "Mit Google anmelden"} 
          />

          <AuthToggle isRegister={isRegisterMode} onToggle={handleToggleMode} />
        </div>
        
        <TermsText />
      </div>
    </div>
  );
};

export default LoginForm;
