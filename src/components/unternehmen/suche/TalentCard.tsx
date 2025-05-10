
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ExpertiseTag {
  label: string;
  highlighted?: boolean;
}

interface AvailabilityTag {
  label: string;
}

export interface TalentCardProps {
  id: string;
  name: string;
  experience: number;
  description: string;
  expertise: ExpertiseTag[];
  availability: AvailabilityTag[];
  leaderboardRank?: number;
  active?: boolean;
  className?: string;
}

export const TalentCard: React.FC<TalentCardProps> = ({
  id,
  name,
  experience,
  description,
  expertise,
  availability,
  leaderboardRank,
  active = false,
  className,
}) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/unternehmen/talent/${id}`);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-3 md:p-6">
        <div className="flex items-start gap-3 md:gap-4 flex-1">
          <div className="relative">
            <img
              src="https://placehold.co/72x72/e4e4e7/e4e4e7"
              alt="Profile"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
            />
            {leaderboardRank && (
              <div className="absolute -bottom-2 -right-2 bg-[#0A2540] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                #{leaderboardRank}
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap justify-between mb-1 md:mb-2">
              <h3 className="text-base md:text-xl font-bold text-[#0A2540]">
                {name} <span className="text-gray-600 font-normal">| Erfahrung: {experience} Jahre</span>
              </h3>
            </div>
            <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-4 max-w-3xl">
              {description}
            </p>
            
            <div className="flex flex-col gap-y-3 md:gap-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <div className="text-xs md:text-sm text-[#0A2540] font-medium mb-1 md:mb-2">
                    Expertise:
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {expertise.map((tag, index) => (
                      <div
                        key={index}
                        className={cn(
                          "px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm",
                          tag.highlighted
                            ? "bg-[#0A2540] text-white"
                            : "bg-[#F2F4F7] text-[#0A2540]"
                        )}
                      >
                        {tag.label}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs md:text-sm text-[#0A2540] font-medium mb-1 md:mb-2">
                    Verfügbarkeit:
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {availability.map((tag, index) => (
                      <div
                        key={index}
                        className="bg-[#F2F4F7] text-[#0A2540] px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm"
                      >
                        {tag.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex md:flex-col items-center justify-end gap-3 md:gap-4 self-center">
          <Button 
            variant={active ? "default" : "outline"} 
            className={cn(
              "rounded-full px-3 md:px-5 gap-1 md:gap-2 h-8 md:h-12 text-xs md:text-sm font-medium",
              active ? "bg-[#0A2540] text-white" : "border-[#0A2540] text-[#0A2540]"
            )}
            onClick={handleViewProfile}
          >
            Profil ansehen
            <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
