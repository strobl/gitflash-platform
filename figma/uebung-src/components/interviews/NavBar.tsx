import React from "react";

export const NavBar: React.FC = () => {
  return (
    <nav
      className="justify-center items-stretch border-b-[color:var(--dark-dark\_6,#E7E9EC)] flex w-full gap-[40px_46px] overflow-hidden bg-white px-[17px] py-2.5 border-b border-solid"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-2 text-[10px] text-[#0A2540] font-bold my-auto">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/daf6dadae7779963acf5918fed94abca56ec2e8b?placeholderIfAbsent=true"
          className="aspect-[11/14] object-contain w-[11px] fill-[#0A2540] self-stretch shrink-0 my-auto"
          alt="GitFlash logo"
        />
        <h1 className="text-[#0A2540] self-stretch w-[76px] my-auto">
          Alle Interviews
        </h1>
      </div>
      <div className="flex items-center gap-2 text-xs font-medium text-right leading-none">
        <button 
          className="justify-center items-center border border-[color:var(--dark-dark\_3,#546679)] self-stretch flex min-h-6 flex-col overflow-hidden text-[#546679] whitespace-nowrap my-auto px-3 py-1 rounded-[100px] border-solid"
          aria-label="Share"
        >
          <div className="flex gap-[5px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/a2ca904a9a54d9d90626e0f049c4c5e8ff8c03a2?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 shrink-0"
              alt="Share icon"
            />
            <span className="text-[#546679]">Teieln</span>
          </div>
        </button>
        <button 
          className="justify-center items-center self-stretch flex min-h-6 flex-col overflow-hidden text-white bg-[#0A2540] my-auto px-3 py-1 rounded-[100px]"
          aria-label="Log in"
        >
          <span className="text-white gap-[5px]">Log in</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
