import React from 'react';

const JobHeader: React.FC = () => {
  return (
    <header className="border-b-[color:var(--dark-dark\_6,#E7E9EC)] flex w-full items-stretch gap-5 overflow-hidden justify-between bg-white px-[17px] py-2.5 rounded-[8px_8px_0px_0px] border-b border-solid">
      <div className="flex items-center gap-2">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/0f00f8d614886812e7e194479deee5df40d9a0dd?placeholderIfAbsent=true"
          className="aspect-[11/14] object-contain w-[11px] fill-[#0A2540] self-stretch shrink-0 my-auto"
          alt="Back"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/f70ff9eb78c7331a899d14d6a1d3dd4cf3adc6d9?placeholderIfAbsent=true"
          className="aspect-[5.08] object-contain w-[61px] fill-[#0A2540] self-stretch shrink-0 my-auto"
          alt="Logo"
        />
      </div>
      <div className="flex items-center gap-2 text-xs text-white font-medium text-right">
        <button className="justify-center items-center self-stretch flex min-h-6 flex-col overflow-hidden bg-[#0A2540] my-auto px-[15px] py-[5px] rounded-[100px]">
          <span className="text-white gap-[5px]">
            Personal fnden
          </span>
        </button>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/8687dce1a9c017e8738489dc11fe4a03a1394544?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-6 self-stretch shrink-0 my-auto"
          alt="Menu"
        />
      </div>
    </header>
  );
};

export default JobHeader;
