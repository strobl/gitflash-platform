
import React, { useState } from "react";
import LoginLogo from "./LoginLogo";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import Divider from "./Divider";
import SocialLogin from "./SocialLogin";
import TermsText from "./TermsText";
import AuthToggle from "./AuthToggle";
import UserTypeSelect from "./UserTypeSelect";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState("candidate");

  const handleToggleMode = () => {
    setIsRegister(!isRegister);
  };

  const handleSubmit = () => {
    if (!email || (!isRegister && !password)) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isRegister) {
        console.log("Registration initiated for:", email, "as", userType);
      } else {
        console.log("Login with:", email, "and password");
      }
      setIsLoading(false);
      // Here you would typically show a success message
    }, 1500);
  };

  const handleGoogleLogin = () => {
    console.log(isRegister ? "Google registration initiated" : "Google login initiated");
    // Here you would implement Google OAuth login/registration
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

export default LoginForm;
