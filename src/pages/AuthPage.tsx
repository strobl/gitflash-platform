
import React from "react";
import AuthForm from "@/components/auth/AuthForm";

const AuthPage: React.FC = () => {
  return (
    <div className="max-w-none flex justify-center items-center min-h-screen bg-[#E7E9EC]">
      <AuthForm />
    </div>
  );
};

export default AuthPage;
