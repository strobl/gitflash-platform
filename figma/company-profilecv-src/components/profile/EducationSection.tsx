import React from "react";

const EducationSection: React.FC = () => {
  return (
    <section className="w-full text-xs text-[#546679] bg-white px-4 py-8">
      <h2 className="text-[#0A2540] text-base font-bold">
        Ausbildung
      </h2>
      
      <div className="flex w-full gap-4 mt-4">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/3dce73fd426da57e7dad1e22d446bb27d87c135f?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-10 shrink-0"
          alt="University logo"
        />
        <div className="flex flex-col items-stretch justify-center flex-1 shrink basis-[0%]">
          <h3 className="text-[#0A2540] font-bold">
            MS, Electrical Engineering and Computer Science (EECS
          </h3>
          <div className="flex w-full gap-4 font-medium whitespace-nowrap mt-2">
            <div className="text-[#546679] flex-1 shrink basis-[0%]">
              Exceptional
            </div>
            <div className="text-[#546679] text-right w-20">
              2020-2021
            </div>
          </div>
          <div className="text-[#546679] text-[10px] font-normal mt-2">
            University of California, Berkeley
          </div>
        </div>
      </div>
      
      <div className="flex w-full gap-4 mt-4">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/b5de0909a3fd785b48a93355c2c437b91095cc09?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-10 shrink-0"
          alt="University logo"
        />
        <div className="flex flex-col items-stretch justify-center flex-1 shrink basis-[0%]">
          <h3 className="text-[#0A2540] font-bold">
            BS, Electrical Engineering and Computer Science (EECS)
          </h3>
          <div className="flex w-full gap-4 font-medium whitespace-nowrap mt-2">
            <div className="text-[#546679] flex-1 shrink basis-[0%]">
              Prestigious
            </div>
            <div className="text-[#546679] text-right w-20">
              2017-2020
            </div>
          </div>
          <div className="text-[#546679] text-[10px] font-normal mt-2">
            University of California, Berkeley
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
