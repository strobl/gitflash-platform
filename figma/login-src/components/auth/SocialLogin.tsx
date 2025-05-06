
import React from "react";

interface SocialLoginProps {
  provider: "google";
  onClick: () => void;
  text?: string;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ 
  provider, 
  onClick,
  text = "Continue with Google" 
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-full h-[42px] bg-[#E7E9EC] rounded-[100px] max-md:px-5 max-md:py-[15px] max-sm:px-4 max-sm:py-[15px] transition-colors hover:bg-[#d8dade] focus:outline-none focus:ring-2 focus:ring-[#0A2540] focus:ring-opacity-30"
      aria-label={text}
    >
      {provider === "google" && (
        <>
          <div className="mr-3">
            <svg 
              width="21" 
              height="21" 
              viewBox="0 0 21 21" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="google-icon" 
              style={{ width: "20px", height: "20px" }}
            >
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M18.18 10.6817C18.18 10.1145 18.1291 9.56902 18.0345 9.04538H10.5V12.1399H14.8055C14.62 13.1399 14.0564 13.9872 13.2091 14.5545V16.5617H15.7945C17.3073 15.169 18.18 13.1181 18.18 10.6817Z" 
                fill="#4285F4"
              />
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M10.4999 18.4999C12.6599 18.4999 14.4708 17.7835 15.7945 16.5617L13.209 14.5544C12.4926 15.0344 11.5763 15.318 10.4999 15.318C8.41629 15.318 6.65265 13.9108 6.02356 12.0199H3.35083V14.0926C4.66719 16.7071 7.37265 18.4999 10.4999 18.4999Z" 
                fill="#34A853"
              />
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M6.02364 12.02C5.86364 11.54 5.77273 11.0273 5.77273 10.5C5.77273 9.97274 5.86364 9.46001 6.02364 8.98001V6.90729H3.35091C2.80909 7.98729 2.5 9.20911 2.5 10.5C2.5 11.7909 2.80909 13.0127 3.35091 14.0927L6.02364 12.02Z" 
                fill="#FBBC05"
              />
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M10.4999 5.68182C11.6745 5.68182 12.729 6.08545 13.5581 6.87818L15.8526 4.58364C14.4672 3.29273 12.6563 2.5 10.4999 2.5C7.37265 2.5 4.66719 4.29273 3.35083 6.90727L6.02356 8.98C6.65265 7.08909 8.41629 5.68182 10.4999 5.68182Z" 
                fill="#EA4335"
              />
            </svg>
          </div>
          <span className="text-sm font-normal text-[#3B5166]">
            {text}
          </span>
        </>
      )}
    </button>
  );
};

export default SocialLogin;
