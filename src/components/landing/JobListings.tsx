
import React from "react";
import { 
  Building, 
  MapPin, 
  Euro 
} from "lucide-react";

interface JobCardProps {
  icon: React.ReactNode;
  title: string;
  location: string;
  salary: string;
  isRemote?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  icon,
  title,
  location,
  salary,
  isRemote = false,
}) => {
  return (
    <div className="bg-white flex flex-col w-full items-stretch overflow-hidden p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 md:w-12 h-10 md:h-12 flex items-center justify-center text-[#0A2540] shrink-0">
            {icon}
          </div>
          <div>
            <div className="text-[#0A2540] text-xs md:text-sm font-bold">{title}</div>
            <div className="text-[#3B5166] text-[10px] md:text-xs font-normal mt-1">
              {isRemote ? "Stündlich · Remote" : `Jahresgehalt · ${location}`}
            </div>
          </div>
        </div>
        <div className="text-[#0A2540] text-right text-[10px] md:text-xs font-medium">
          {salary}
        </div>
      </div>
    </div>
  );
};

export const JobListings: React.FC = () => {
  return (
    <section className="bg-[rgba(242,244,246,1)] w-full px-4 sm:px-6 md:px-12 py-8 md:py-16">
      <div className="flex w-full flex-col items-stretch text-center max-w-3xl mx-auto">
        <div className="flex max-w-full mx-auto flex-col font-bold">
          <span className="text-[#3B5166] text-[10px] md:text-xs">
            Der direkte Weg zu exklusiven Jobs
          </span>
          <h2 className="text-[#0A2540] text-2xl md:text-3xl lg:text-4xl mt-1">
            Ein KI-Interview. Tausende Unternehmen erreichen.
          </h2>
        </div>
        <p className="text-[#546679] text-sm md:text-base font-normal leading-[21px] mt-3 md:mt-5">
          Absolvieren Sie ein einziges KI-Interview – ohne Vorbereitung von
          Anschreiben oder Lebenslauf. GitFlash analysiert Ihre Stärken und
          verbindet Sie gezielt mit Top-Arbeitgebern.
        </p>
      </div>
      <div className="w-full mt-6 md:mt-10 max-w-3xl mx-auto">
        <div className="flex flex-col space-y-4">
          <JobCard
            icon={<Building size={32} />}
            title="Projektleiter Hochbau"
            location="München"
            salary="85.000 €/Jahr"
          />
          <JobCard
            icon={<Building size={32} />}
            title="Projektentwickler Immobilien"
            location="Frankfurt"
            salary="78.000 €/Jahr"
            isRemote={false}
          />
          <JobCard
            icon={<Euro size={32} />}
            title="Jurist Baurecht"
            location="Remote"
            salary="€350/Std."
            isRemote={true}
          />
        </div>
      </div>
    </section>
  );
};
