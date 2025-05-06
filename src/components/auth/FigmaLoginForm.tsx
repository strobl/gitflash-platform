
import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import LoginLogo from "./LoginLogo";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import Divider from "./Divider";
import SocialLogin from "./SocialLogin";
import TermsText from "./TermsText";
import AuthToggle from "./AuthToggle";
import UserTypeSelect from "./UserTypeSelect";

const FigmaLoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Added for registration
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState<"user" | "business">("user"); // Map to our role types
  
  const { login, register, isAuthenticated } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleToggleMode = () => {
    setIsRegister(!isRegister);
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }
    
    if (isRegister && !name) {
      toast.error("Bitte geben Sie Ihren Namen ein.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isRegister) {
        await register(name, email, password, userType);
        toast.success("Registrierung erfolgreich! Sie können sich jetzt anmelden.");
      } else {
        await login(email, password);
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.message || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Google OAuth implementation would go here
    toast.info("Google-Anmeldung ist noch nicht implementiert.");
  };

  return (
    <div className="max-w-none flex justify-center items-center min-h-screen bg-[#E7E9EC] mx-auto max-md:max-w-[991px] max-md:p-5 max-sm:max-w-screen-sm max-sm:p-4">
      <div className="flex flex-col items-center w-[400px] bg-[#E7E9EC] px-4 py-[40px] rounded-xl max-md:w-full max-md:px-4 max-md:py-20 max-sm:px-4 max-sm:py-[40px]">
        <div className="flex flex-col items-center w-full bg-white px-6 py-8 rounded-xl max-md:px-4 max-md:py-6 max-sm:p-4 shadow-sm">
          <LoginLogo />
          
          <h2 className="text-xl font-bold text-[#0A2540] mb-1 self-start">
            {isRegister ? "Registrieren" : "Login"}
          </h2>
          
          <p className="text-sm text-[#6C7C8C] mb-6 self-start">
            {isRegister ? "Erstelle dein Konto" : "Melde dich bei deinem Konto an"}
          </p>
          
          <UserTypeSelect 
            value={userType === "user" ? "candidate" : "employer"} 
            onChange={(value) => setUserType(value === "candidate" ? "user" : "business")} 
          />
          
          {isRegister && (
            <div className="w-full mb-4">
              <label className="text-[10px] font-bold text-[#0A2540] mb-1.5 block">
                Name
              </label>
              <div 
                className={`flex items-center w-full h-9 border px-5 py-[11px] rounded-md border-solid border-[#6C7C8C] max-md:px-4 max-md:py-[11px] max-sm:px-3 max-sm:py-[11px]`}
              >
                <div className="mr-2.5 text-[#6C7C8C]">
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" 
                      stroke="#6C7C8C" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" 
                      stroke="#6C7C8C" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
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
            text={isRegister ? "Registrieren" : "Anmelden"} 
          />
          
          <Divider />
          
          <SocialLogin 
            provider="google" 
            onClick={handleGoogleLogin}
            text={isRegister ? "Mit Google registrieren" : "Continue with Google"} 
          />

          <AuthToggle isRegister={isRegister} onToggle={handleToggleMode} />
        </div>
        
        <TermsText />
      </div>
    </div>
  );
};

export default FigmaLoginForm;
