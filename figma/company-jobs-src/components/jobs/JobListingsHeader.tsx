import React from 'react';

const JobListingsHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="text-[#0A2540] text-base font-bold">Jobanzeigen</div>
      <button 
        className="flex h-6 justify-center items-center gap-2.5 border px-[15px] py-[7px] rounded-[100px] border-[#0A2540]"
        aria-label="Job erstellen"
      >
        <div className="flex items-start gap-[5px]">
          <div>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-[16px] h-[16px]"
            >
              <path d="M7.33301 7.33334V3.33334H8.66634V7.33334H12.6663V8.66667H8.66634V12.6667H7.33301V8.66667H3.33301V7.33334H7.33301Z" fill="#0A2540"></path>
            </svg>
          </div>
          <div className="text-[#0A2540] text-xs">Job erstellen</div>
        </div>
      </button>
    </div>
  );
};

export default JobListingsHeader;
