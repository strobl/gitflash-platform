
import React from "react";

interface TeamHeaderProps {
  className?: string;
}

export function TeamHeader({ className = "" }: TeamHeaderProps) {
  return (
    <div className={`flex items-center justify-between bg-white p-4 border-b border-[#E7E9EC] ${className}`}>
      <div className="flex items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path
            d="M13 19C13 19.7 13.13 20.37 13.35 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.89 21 5V13.35C20.37 13.13 19.7 13 19 13V5H5V19H13Z"
            fill="#0A2540"
          />
          <path
            d="M17.5 15V17H22V19H17.5V21L14.5 18L17.5 15Z"
            fill="#0A2540"
          />
        </svg>
        <span className="font-bold text-[#0A2540]">GitFlash</span>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="text-white text-xs font-medium px-4 py-2 bg-[#0A2540] rounded-full">
          Personal finden
        </button>
        <div className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E7E9EC]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9999 17C15.6623 17 18.8649 18.5751 20.607 20.9247L18.765 21.796C17.3473 20.1157 14.8473 19 11.9999 19C9.15248 19 6.65252 20.1157 5.23479 21.796L3.39355 20.9238C5.13576 18.5747 8.33796 17 11.9999 17Z"
              fill="#0A2540"
            />
            <path
              d="M12 2C14.7614 2 17 4.23858 17 7V10C17 12.6888 14.8777 14.8818 12.2169 14.9954L12 15C9.23857 15 7 12.7614 7 10V7C7 4.31125 9.1223 2.11818 11.7831 2.00462L12 2ZM12 4C10.4023 4 9.09633 5.24892 9.00509 6.82373L9 7V10C9 11.6569 10.3431 13 12 13C13.5977 13 14.9037 11.7511 14.9949 10.1763L15 10V7C15 5.34315 13.6568 4 12 4Z"
              fill="#0A2540"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
