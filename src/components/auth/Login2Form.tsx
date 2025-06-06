
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import Divider from "./Divider";
import SocialLogin from "./SocialLogin";
import TermsText from "./TermsText";
import AuthToggle from "./AuthToggle";
import UserTypeSelect from "./UserTypeSelect";
import LoginLogo from "./LoginLogo";

interface Login2FormProps {
  interviewId: string | null;
}

const Login2Form: React.FC<Login2FormProps> = ({ interviewId }) => {
  const { login, loginWithGoogle, register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [userType, setUserType] = useState<"user" | "business">("user");
  const [name, setName] = useState("");

  const handleToggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
  };

  const handleSubmit = async () => {
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
        
        await register(name, email, password, userType);
        toast.success("Registrierung erfolgreich! Bitte überprüfe deine E-Mails.");
      } else {
        if (!password) {
          toast.error("Bitte Passwort eingeben");
          return;
        }
        
        // Perform login
        await login(email, password);
        toast.success("Login erfolgreich!");
        
        console.log("Login2Form: Login successful, interview ID:", interviewId);
        
        // If we have an interview ID, navigate directly to the interview
        if (interviewId) {
          console.log("Login2Form: Navigating to interview:", interviewId);
          
          // Short delay to ensure auth state is updated
          setTimeout(() => {
            navigate(`/uebung/${interviewId}`);
          }, 100);
        } else {
          // Fallback to dashboard if no interview ID
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "Ein Fehler ist aufgetreten");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("Login2Form: Starting Google login");
      
      // Determine the redirect URL based on whether we have an interview ID
      const redirectUrl = interviewId 
        ? `${window.location.origin}/uebung/${interviewId}`
        : `${window.location.origin}/dashboard`;
      
      console.log("Login2Form: Google login redirect URL:", redirectUrl);
      
      // Start Google login with the determined redirect URL
      await loginWithGoogle(redirectUrl);
      
      // Note: The page will redirect to Google auth
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
          
          <p className="text-sm text-[#6C7C8C] mb-2 self-start">
            {isRegisterMode 
              ? "Erstelle dein Konto für das Interview" 
              : "Melde dich an, um am Interview teilzunehmen"}
          </p>
          
          {interviewId && (
            <div className="bg-blue-50 text-blue-700 p-3 rounded-md w-full mb-4 text-sm">
              Nach dem Login wirst du direkt zum Interview weitergeleitet.
            </div>
          )}
          
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

export default Login2Form;
