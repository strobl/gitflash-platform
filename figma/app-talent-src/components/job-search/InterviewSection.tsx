import React from "react";
import InterviewCard from "./InterviewCard";

const InterviewSection: React.FC = () => {
  return (
    <section className="border-b-[color:var(--dark-dark\_6,#E7E9EC)] min-h-[447px] w-full bg-white pl-4 py-[38px] border-b border-solid">
      <div className="w-full">
        <div className="flex w-full items-center gap-[21px] justify-between">
          <h2 className="text-[#0A2540] text-base font-bold self-stretch my-auto">
            Mit KI Interviews üben
          </h2>
          <div className="self-stretch flex items-center gap-[5px] text-xs text-[#546679] font-medium text-right justify-center my-auto">
            <button className="text-[#546679] self-stretch my-auto">
              Alle ansehen
            </button>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/3cded2849569cc948426521af9b0275a8a67307b?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
              alt="Arrow right"
            />
          </div>
        </div>
        <p className="text-[#546679] text-[10px] font-normal mt-3">
          Probieren Sie Interviews aus, die Ihnen helfen, Ihren nächsten Job zu bekommen.
        </p>
      </div>
      <div className="flex w-full gap-3 mt-6 overflow-x-auto">
        <InterviewCard
          image="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/42d771bdb36c1067e69d1e72e47bb61fa1959bbf?placeholderIfAbsent=true"
          title="Bauleiter Hochbau"
          description="Technisches Interview · Projektmanagement"
          duration="20m"
          difficulty="Mittel"
        />
        <InterviewCard
          image="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/42d771bdb36c1067e69d1e72e47bb61fa1959bbf?placeholderIfAbsent=true"
          title="Projektmanager Tiefbau"
          description="Technisches Interview · Infrastruktur"
          duration="25m"
          difficulty="Fortgeschritten"
        />
        <InterviewCard
          image="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/42d771bdb36c1067e69d1e72e47bb61fa1959bbf?placeholderIfAbsent=true"
          title="Architekt"
          description="Kreatives Interview · Design"
          duration="15m"
          difficulty="Einfach"
        />
        <InterviewCard
          image="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/42d771bdb36c1067e69d1e72e47bb61fa1959bbf?placeholderIfAbsent=true"
          title="Bauingenieur"
          description="Technisches Interview · Statik"
          duration="30m"
          difficulty="Mittel"
        />
      </div>
    </section>
  );
};

export default InterviewSection;
