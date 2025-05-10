import React from 'react';

const JobSearch: React.FC = () => {
  return (
    <div className="mt-4">
      <div className="border border-[color:var(--dark-dark\_4,#6C7C8C)] flex w-72 max-w-full flex-col overflow-hidden text-[10px] text-[#6C7C8C] font-medium justify-center px-5 py-[11px] rounded-[30px] border-solid">
        <div className="flex items-center gap-2.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/1fda9534de343df9aa5d1a5121256b480117d700?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
            alt="Search"
          />
          <input
            type="text"
            placeholder="Stellensuche nach Titel"
            className="text-[#6C7C8C] self-stretch my-auto bg-transparent border-none outline-none w-full"
          />
        </div>
      </div>
      
      <div className="flex gap-1 text-xs text-[#546679] font-medium whitespace-nowrap text-right mt-4">
        <button className="justify-center items-center flex min-h-6 flex-col overflow-hidden text-white bg-[#0A2540] px-2.5 py-1 rounded-[100px]">
          <div className="flex gap-[5px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/08857495a15e6996e9a610cbd4e716b638f2c9b9?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 shrink-0"
              alt="Sort"
            />
            <span className="text-white">
              Sortieren
            </span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/fc83d9a2728405ceb4953523848ec96c1064d291?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 shrink-0"
              alt="Arrow"
            />
          </div>
        </button>
        
        <button className="justify-center items-center border border-[color:var(--dark-dark\_3,#546679)] flex min-h-6 flex-col overflow-hidden px-2.5 py-1 rounded-[100px] border-solid">
          <div className="flex gap-[5px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/a456bb9293eaf41ee988a3026f04f3319662b086?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 shrink-0"
              alt="Status"
            />
            <span className="text-[#546679]">
              Status
            </span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/1c9a1c835cef3563cb0ba96c73b6cd0a13a23036?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 shrink-0"
              alt="Arrow"
            />
          </div>
        </button>
        
        <button className="justify-center items-center border border-[color:var(--dark-dark\_3,#546679)] flex min-h-6 flex-col overflow-hidden pl-2.5 py-1 rounded-[100px] border-solid">
          <div className="flex gap-[5px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/f1ee0c081ca6430fd1d0cf1c39da79e28169cb53?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 shrink-0"
              alt="Visibility"
            />
            <span className="text-[#546679]">
              Sichtbarkeit
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default JobSearch;
