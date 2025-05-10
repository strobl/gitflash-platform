
import React, { useState } from "react";

interface TeamSearchProps {
  className?: string;
  onSearch?: (query: string) => void;
}

export function TeamSearch({ className = "", onSearch }: TeamSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className={`flex flex-col gap-4 bg-white px-4 py-5 ${className}`}>
      <h2 className="text-[#0A2540] text-lg font-bold">
        Team
      </h2>
      
      <div className="flex h-12 items-center border w-full px-4 rounded-full border-[#6C7C8C]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.99986 9.91667C9.13626 9.91667 11.0044 10.8355 12.0207 12.2061L10.9462 12.7143C10.1192 11.7342 8.66085 11.0833 6.99986 11.0833C5.33887 11.0833 3.88056 11.7342 3.05355 12.7143L1.97949 12.2056C2.99578 10.8352 4.86373 9.91667 6.99986 9.91667Z"
            fill="#6C7C8C"
          />
          <path
            d="M6.99967 1.16666C8.61049 1.16666 9.91634 2.4725 9.91634 4.08333V5.83333C9.91634 7.4018 8.67833 8.68105 7.1262 8.74731L6.99967 8.75C5.38884 8.75 4.08301 7.44415 4.08301 5.83333V4.08333C4.08301 2.51489 5.32102 1.2356 6.87315 1.16936L6.99967 1.16666ZM6.99967 2.33333C6.06768 2.33333 5.30587 3.06187 5.25264 3.98051L5.24967 4.08333V5.83333C5.24967 6.79986 6.03315 7.58333 6.99967 7.58333C7.93167 7.58333 8.6935 6.85481 8.7467 5.93617L8.74967 5.83333V4.08333C8.74967 3.11684 7.96614 2.33333 6.99967 2.33333Z"
            fill="#6C7C8C"
          />
        </svg>
        <input
          type="text"
          placeholder="Nach Name, E-Mail, Fähigkeit oder Erfahrung..."
          className="text-sm text-[#6C7C8C] bg-transparent flex-1 ml-2 border-none outline-none"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 bg-[#0A2540] px-3 py-2 rounded-full">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.96686 5.29983L7.02406 6.24264L5.33419 4.552L5.33369 13.3333H4.00035L4.00085 4.552L2.31 6.24264L1.36719 5.29983L4.66702 2L7.96686 5.29983ZM14.6335 10.7002L11.3337 14L8.03386 10.7002L8.97666 9.75733L10.6675 11.448L10.667 2.66667H12.0003L12.0009 11.448L13.6907 9.75733L14.6335 10.7002Z"
              fill="white"
            />
          </svg>
          <span className="text-white text-xs font-medium">Sortieren</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 10.6667L4 6.66667H12L8 10.6667Z" fill="white"/>
          </svg>
        </button>
        
        <button className="flex items-center gap-1 border px-3 py-2 rounded-full border-[#546679]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.11348 12C4.38803 11.2232 5.12886 10.6667 5.99967 10.6667C6.87047 10.6667 7.61134 11.2232 7.88587 12H14.6663V13.3333H7.88587C7.61134 14.1101 6.87047 14.6667 5.99967 14.6667C5.12886 14.6667 4.38803 14.1101 4.11348 13.3333H1.33301V12H4.11348ZM8.11347 7.33333C8.38801 6.55654 9.12887 6 9.99967 6C10.8705 6 11.6113 6.55654 11.8859 7.33333H14.6663V8.66666H11.8859C11.6113 9.44346 10.8705 10 9.99967 10C9.12887 10 8.38801 9.44346 8.11347 8.66666H1.33301V7.33333H8.11347ZM4.11348 2.66666C4.38803 1.88987 5.12886 1.33333 5.99967 1.33333C6.87047 1.33333 7.61134 1.88987 7.88587 2.66666H14.6663V3.99999H7.88587C7.61134 4.77679 6.87047 5.33333 5.99967 5.33333C5.12886 5.33333 4.38803 4.77679 4.11348 3.99999H1.33301V2.66666H4.11348ZM5.99967 3.99999C6.36786 3.99999 6.66634 3.70151 6.66634 3.33333C6.66634 2.96514 6.36786 2.66666 5.99967 2.66666C5.63149 2.66666 5.33301 2.96514 5.33301 3.33333C5.33301 3.70151 5.63149 3.99999 5.99967 3.99999ZM9.99967 8.66666C10.3679 8.66666 10.6663 8.3682 10.6663 8C10.6663 7.63179 10.3679 7.33333 9.99967 7.33333C9.63147 7.33333 9.33301 7.63179 9.33301 8C9.33301 8.3682 9.63147 8.66666 9.99967 8.66666ZM5.99967 13.3333C6.36786 13.3333 6.66634 13.0349 6.66634 12.6667C6.66634 12.2985 6.36786 12 5.99967 12C5.63149 12 5.33301 12.2985 5.33301 12.6667C5.33301 13.0349 5.63149 13.3333 5.99967 13.3333Z"
              fill="#546679"
            />
          </svg>
          <span className="text-[#546679] text-xs font-medium">Filter</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 10.6667L4 6.66667H12L8 10.6667Z" fill="#546679"/>
          </svg>
        </button>
        
        <button className="flex items-center gap-1 border px-3 py-2 rounded-full border-[#546679]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00053 2C11.5953 2 14.5859 4.58651 15.2129 8C14.5859 11.4135 11.5953 14 8.00053 14C4.40574 14 1.41509 11.4135 0.788086 8C1.41509 4.58651 4.40574 2 8.00053 2ZM8.00053 12.6667C10.8243 12.6667 13.2405 10.7013 13.8521 8C13.2405 5.29869 10.8243 3.33333 8.00053 3.33333C5.17673 3.33333 2.76047 5.29869 2.14885 8C2.76047 10.7013 5.17673 12.6667 8.00053 12.6667ZM8.00053 11C6.34365 11 5.0005 9.65687 5.0005 8C5.0005 6.34315 6.34365 5 8.00053 5C9.65733 5 11.0005 6.34315 11.0005 8C11.0005 9.65687 9.65733 11 8.00053 11ZM8.00053 9.66667C8.92099 9.66667 9.66719 8.92047 9.66719 8C9.66719 7.07953 8.92099 6.33333 8.00053 6.33333C7.08006 6.33333 6.33383 7.07953 6.33383 8C6.33383 8.92047 7.08006 9.66667 8.00053 9.66667Z"
              fill="#546679"
            />
          </svg>
          <span className="text-[#546679] text-xs font-medium">Status</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 10.6667L4 6.66667H12L8 10.6667Z" fill="#546679"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
