
import React from "react";

const Divider: React.FC = () => {
  return (
    <div className="w-full mb-4">
      <svg 
        width="256" 
        height="15" 
        viewBox="0 0 256 15" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="divider w-full" 
        style={{ height: "15px", marginBottom: "16px" }}
      >
        <path d="M0 7.5H78" stroke="#E7E9EC" />
        <text 
          fill="#0A2540" 
          xmlSpace="preserve" 
          style={{ whiteSpace: "pre" }} 
          fontFamily="Alliance No.1" 
          fontSize="12" 
          letterSpacing="0px"
        >
          <tspan x="86" y="11.136">oder weiter mit</tspan>
        </text>
        <path d="M178 7.5H256" stroke="#E7E9EC" />
      </svg>
    </div>
  );
};

export default Divider;
