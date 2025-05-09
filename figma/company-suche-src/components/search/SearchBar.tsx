import React from "react";

interface SearchBarProps {
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-3 border bg-white w-72 p-3 rounded-lg border-[#BDC6CF] ${className}`}>
      <div className="flex flex-col justify-center gap-4 flex-1">
        <div className="flex-1 text-[#0A2540] text-sm font-bold gap-3">
          Suchen Sie z. B. Baujurist mit 5 Jahren Erfahrung&quot; oder „Bauleiter&quot;
        </div>
        <div className="flex items-center gap-3">
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[16px] h-[16px]"
            >
              <path
                d="M4.11397 12C4.38852 11.2232 5.12935 10.6667 6.00016 10.6667C6.87096 10.6667 7.61183 11.2232 7.88636 12H14.6668V13.3333H7.88636C7.61183 14.1101 6.87096 14.6667 6.00016 14.6667C5.12935 14.6667 4.38852 14.1101 4.11397 13.3333H1.3335V12H4.11397ZM8.11396 7.33333C8.3885 6.55654 9.12936 6 10.0002 6C10.871 6 11.6118 6.55654 11.8864 7.33333H14.6668V8.66666H11.8864C11.6118 9.44346 10.871 10 10.0002 10C9.12936 10 8.3885 9.44346 8.11396 8.66666H1.3335V7.33333H8.11396ZM4.11397 2.66666C4.38852 1.88987 5.12935 1.33333 6.00016 1.33333C6.87096 1.33333 7.61183 1.88987 7.88636 2.66666H14.6668V3.99999H7.88636C7.61183 4.77679 6.87096 5.33333 6.00016 5.33333C5.12935 5.33333 4.38852 4.77679 4.11397 3.99999H1.3335V2.66666H4.11397ZM6.00016 3.99999C6.36835 3.99999 6.66683 3.70151 6.66683 3.33333C6.66683 2.96514 6.36835 2.66666 6.00016 2.66666C5.63198 2.66666 5.3335 2.96514 5.3335 3.33333C5.3335 3.70151 5.63198 3.99999 6.00016 3.99999ZM10.0002 8.66666C10.3684 8.66666 10.6668 8.3682 10.6668 8C10.6668 7.63179 10.3684 7.33333 10.0002 7.33333C9.63196 7.33333 9.3335 7.63179 9.3335 8C9.3335 8.3682 9.63196 8.66666 10.0002 8.66666ZM6.00016 13.3333C6.36835 13.3333 6.66683 13.0349 6.66683 12.6667C6.66683 12.2985 6.36835 12 6.00016 12C5.63198 12 5.3335 12.2985 5.3335 12.6667C5.3335 13.0349 5.63198 13.3333 6.00016 13.3333Z"
                fill="#546679"
              ></path>
            </svg>
          </div>
          <div className="flex items-center gap-[5px]">
            <div className="text-[#0A2540] text-xs">Filter bearbeiten</div>
            <div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[16px] h-[16px]"
              >
                <path
                  d="M10.6688 6.27614L4.93109 12.0139L3.98828 11.0711L9.72601 5.33333H4.66883V4H12.0021V11.3333H10.6688V6.27614Z"
                  fill="#0A2540"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
