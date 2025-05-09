import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center gap-2 border bg-white shadow-[0px_12px_32px_0px_rgba(0,0,0,0.08)] px-4 py-5 rounded-xl border-[#E7E9EC]">
      <div>
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-[32px] h-[32px]"
        >
          <path d="M16.5526 6.66667H28.0003C28.7367 6.66667 29.3337 7.26363 29.3337 8V26.6667C29.3337 27.4031 28.7367 28 28.0003 28H4.00033C3.26395 28 2.66699 27.4031 2.66699 26.6667V5.33333C2.66699 4.59696 3.26395 4 4.00033 4H13.8859L16.5526 6.66667ZM5.33366 6.66667V25.3333H26.667V9.33333H15.4481L12.7814 6.66667H5.33366ZM14.667 16V12H17.3337V16H21.3337V18.6667H17.3337V22.6667H14.667V18.6667H10.667V16H14.667Z" fill="#0A2540" />
        </svg>
      </div>
      <div className="flex flex-col items-start gap-2 w-full">
        <h3 className="w-full text-[#0A2540] text-center text-sm font-bold leading-[22px]">
          Sie haben noch keine Jobanzeige erstellt.
        </h3>
        <p className="w-full text-[#546679] text-center text-[10px]">
          Bitte erstellen Sie eine neue Jobanzeige über den Button „Job erstellen" oben und beginnen Sie mit der Auswahl geeigneter Kandidat:innen.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
