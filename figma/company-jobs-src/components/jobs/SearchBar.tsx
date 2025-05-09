import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex h-9 items-center w-full border px-5 py-[11px] rounded-[30px] border-[#6C7C8C]">
      <div className="flex items-center gap-2.5 w-full">
        <div>
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 14 14" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-[14px] h-[14px]"
          >
            <path d="M6.99986 9.91667C9.13626 9.91667 11.0044 10.8355 12.0207 12.2061L10.9462 12.7143C10.1192 11.7342 8.66085 11.0833 6.99986 11.0833C5.33887 11.0833 3.88056 11.7342 3.05355 12.7143L1.97949 12.2056C2.99578 10.8352 4.86373 9.91667 6.99986 9.91667Z" fill="#6C7C8C"></path>
            <path d="M6.99967 1.16667C8.61049 1.16667 9.91634 2.47251 9.91634 4.08334V5.83334C9.91634 7.40181 8.67833 8.68106 7.1262 8.74732L6.99967 8.75001C5.38884 8.75001 4.08301 7.44416 4.08301 5.83334V4.08334C4.08301 2.5149 5.32102 1.23561 6.87315 1.16937L6.99967 1.16667ZM6.99967 2.33334C6.06768 2.33334 5.30587 3.06188 5.25264 3.98051L5.24967 4.08334V5.83334C5.24967 6.79986 6.03315 7.58334 6.99967 7.58334C7.93167 7.58334 8.6935 6.85481 8.7467 5.93618L8.74967 5.83334V4.08334C8.74967 3.11684 7.96614 2.33334 6.99967 2.33334Z" fill="#6C7C8C"></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Stellensuche nach Titel"
          className="text-[#6C7C8C] text-[10px] bg-transparent outline-none w-full"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
