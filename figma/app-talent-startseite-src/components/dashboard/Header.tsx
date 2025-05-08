
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex w-full h-14 bg-white items-center justify-between px-4 border-b border-[#E7E9EC] sticky top-0 z-10">
      <div className="flex items-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="#0A2540" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="ml-3 font-bold text-lg text-[#0A2540]">GitFlash</span>
      </div>
      <div>
        <div className="w-8 h-8 rounded-full bg-[#F5F6F7] flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="#0A2540"/>
            <path d="M10 12C5.58172 12 2 15.5817 2 20H18C18 15.5817 14.4183 12 10 12Z" fill="#0A2540"/>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
