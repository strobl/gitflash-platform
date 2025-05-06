import React from "react";

const TermsText: React.FC = () => {
  return (
    <div className="text-xs font-normal text-[#546679] text-center mt-4">
      <span>Indem Sie sich anmelden, akzeptieren Sie unsere </span>
      <a 
        href="#" 
        className="underline text-[#0A2540] hover:text-[#1a3a5a] focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:ring-opacity-50 rounded"
      >
        Nutzungsbedingungen für Nutzer.
      </a>
    </div>
  );
};

export default TermsText;