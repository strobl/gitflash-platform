
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginLogo from "./LoginLogo";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import Divider from "./Divider";
import SocialLogin from "./SocialLogin";
import TermsText from "./TermsText";
import AuthToggle from "./AuthToggle";
import UserTypeSelect from "./UserTypeSelect";
import { toast } from "sonner";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState("user");
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleToggleMode = () => {
    setIsRegister(!isRegister);
    // Clear form fields when toggling modes
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Bitte geben Sie eine E-Mail-Adresse ein");
      return;
    }
    
    if (!password && !isRegister) {
      toast.error("Bitte geben Sie ein Passwort ein");
      return;
    }
    
    if (isRegister && !name) {
      toast.error("Bitte geben Sie einen Namen ein");
      return;
    }

    if (isRegister && password.length < 6) {
      toast.error("Das Passwort muss mindestens 6 Zeichen lang sein");
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isRegister) {
        await register(name, email, password, userType as 'user' | 'business' | 'operator');
        toast.success("Registrierung erfolgreich! Bitte überprüfen Sie Ihre E-Mails für die Bestätigung.");
      } else {
        await login(email, password);
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.error(error.message || "Ein Fehler ist aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Implement Google login when available
    toast.error("Google-Anmeldung wird in Kürze implementiert");
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
          
          <UserTypeSelect value={userType} onChange={setUserType} />
          
          {isRegister && (
            <div className="w-full mb-4">
              <label className="text-[10px] font-bold text-[#0A2540] mb-1.5 block">
                Name
              </label>
              <div className="flex items-center w-full h-9 border px-5 py-[11px] rounded-md border-solid border-[#6C7C8C] max-md:px-4 max-md:py-[11px] max-sm:px-3 max-sm:py-[11px]">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Vor- und Nachname"
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
            text={isRegister ? "Mit Google registrieren" : "Mit Google anmelden"} 
          />

          <AuthToggle isRegister={isRegister} onToggle={handleToggleMode} />
        </div>
        
        <TermsText />
      </div>
    </div>
  );
};

export default AuthForm;
