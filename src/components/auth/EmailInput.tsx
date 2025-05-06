
import React, { useState } from "react";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full mb-4">
      <label className="text-[10px] font-bold text-[#0A2540] mb-1.5 block">
        E-Mail-Adresse
      </label>
      <div 
        className={`flex items-center w-full h-9 border px-5 py-[11px] rounded-md border-solid ${
          isFocused ? "border-[#0A2540]" : "border-[#6C7C8C]"
        } max-md:px-4 max-md:py-[11px] max-sm:px-3 max-sm:py-[11px]`}
      >
        <div className="mr-2.5">
          <svg 
            width="14" 
            height="15" 
            viewBox="0 0 14 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="email-icon" 
            style={{ width: "14px", height: "14px" }}
          >
            <path 
              d="M1.30828 4.49836L6.70217 1.26334C6.88691 1.15254 7.11773 1.15258 7.30242 1.26345L12.6917 4.49835C12.7796 4.55107 12.8333 4.64599 12.8333 4.74843V12.1667C12.8333 12.4888 12.5721 12.75 12.25 12.75H1.74996C1.4278 12.75 1.16663 12.4888 1.16663 12.1667V4.7485C1.16663 4.64602 1.2204 4.55107 1.30828 4.49836ZM2.33329 5.24401V11.5833H11.6666V5.24374L7.00212 2.44387L2.33329 5.24401ZM7.03478 8.49067L10.1241 5.88726L10.8759 6.7794L7.04313 10.0093L3.12896 6.78348L3.87095 5.88317L7.03478 8.49067Z" 
              fill="#6C7C8C"
            />
          </svg>
        </div>
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="E-Mail-Adresse"
          className="text-[10px] font-normal text-[#6C7C8C] bg-transparent outline-none w-full"
          aria-label="E-Mail-Adresse"
        />
      </div>
    </div>
  );
};

export default EmailInput;
