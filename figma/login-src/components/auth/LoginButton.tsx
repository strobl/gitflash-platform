
import React from "react";

interface LoginButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  text?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ 
  onClick, 
  isLoading = false,
  text = "Anmelden"
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex items-center justify-center w-full h-[42px] bg-[#0A2540] mb-4 rounded-md max-md:px-5 max-md:py-3 max-sm:px-4 max-sm:py-3 transition-colors hover:bg-[#1a3a5a] focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:ring-opacity-50"
      aria-label={text}
    >
      <span className="text-sm font-normal text-white">
        {isLoading ? "Wird gesendet..." : text}
      </span>
    </button>
  );
};

export default LoginButton;
