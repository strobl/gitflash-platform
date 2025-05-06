
import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full mb-4">
      <label className="text-[10px] font-bold text-[#0A2540] mb-1.5 block">
        Password
      </label>
      <div 
        className={`flex items-center w-full h-9 border px-5 py-[11px] rounded-md border-solid ${
          isFocused ? "border-[#0A2540]" : "border-[#6C7C8C]"
        } max-md:px-4 max-md:py-[11px] max-sm:px-3 max-sm:py-[11px]`}
      >
        <div className="mr-2.5 text-[#6C7C8C]">
          <Lock size={14} />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Password"
          className="text-[10px] font-normal text-[#6C7C8C] bg-transparent outline-none w-full"
          aria-label="Password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="ml-2 text-[#6C7C8C] focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
