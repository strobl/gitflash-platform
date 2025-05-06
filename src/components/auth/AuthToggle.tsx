
import React from "react";

interface AuthToggleProps {
  isRegister: boolean;
  onToggle: () => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ isRegister, onToggle }) => {
  return (
    <div className="flex items-center justify-center mt-4 w-full">
      <div className="text-sm text-[#546679]">
        {isRegister ? "Bereits ein Konto?" : "Noch kein Konto?"}
      </div>
      <button
        onClick={onToggle}
        className="ml-2 text-sm font-medium text-[#0A2540] hover:underline focus:outline-none"
      >
        {isRegister ? "Anmelden" : "Registrieren"}
      </button>
    </div>
  );
};

export default AuthToggle;
