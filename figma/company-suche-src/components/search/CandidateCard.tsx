
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";

interface ExpertiseTag {
  label: string;
  highlighted?: boolean;
}

interface AvailabilityTag {
  label: string;
}

interface CandidateCardProps {
  name: string;
  experience: number;
  description: string;
  expertise: ExpertiseTag[];
  availability: AvailabilityTag[];
  active?: boolean;
  className?: string;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  name,
  experience,
  description,
  expertise,
  availability,
  active = false,
  className,
}) => {
  return (
    <div className={`relative flex flex-col gap-2 md:gap-4 border bg-white shadow-[0px_12px_32px_0px_rgba(0,0,0,0.08)] w-full p-3 md:p-5 rounded-xl border-[#E7E9EC] ${className}`}>
      {/* Card Header with Profile and Name */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-[36px] h-[36px] md:w-[48px] md:h-[48px] rounded-full overflow-hidden bg-gray-200">
            <img
              src="https://placehold.co/100x100/e4e4e7/e4e4e7"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-[#0A2540] text-sm md:text-base font-bold">
            {name} | Erfahrung: {experience} Jahre
          </div>
        </div>
        <div className="rounded-full bg-[#0A2540] p-1.5 md:p-2 cursor-pointer">
          <ArrowRight size={16} className="text-white" />
        </div>
      </div>

      {/* Description */}
      <div className="text-[#4A5568] text-xs md:text-sm leading-[1.4] md:leading-[1.5]">
        {description}
      </div>

      {/* Tags Section */}
      <div className="flex flex-col gap-2 md:gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-2">
          <div className="flex flex-col gap-1 md:gap-2">
            <div className="text-[#0A2540] text-xs md:text-sm font-medium">
              Expertise:
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {expertise.map((tag, index) => (
                <div
                  key={index}
                  className={`text-${tag.highlighted ? 'white' : '[#0A2540]'} text-[10px] md:text-xs bg-${
                    tag.highlighted ? '[#0A2540]' : '[#F2F4F7]'
                  } px-2 md:px-3 py-1 md:py-1.5 rounded-full`}
                >
                  {tag.label}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 md:gap-2">
            <div className="text-[#0A2540] text-xs md:text-sm font-medium">
              Verfügbarkeit:
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {availability.map((tag, index) => (
                <div
                  key={index}
                  className="text-[#0A2540] text-[10px] md:text-xs bg-[#F2F4F7] px-2 md:px-3 py-1 md:py-1.5 rounded-full"
                >
                  {tag.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
