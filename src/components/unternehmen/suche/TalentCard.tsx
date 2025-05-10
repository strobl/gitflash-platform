
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";

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
}) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-lg border ${active ? 'border-gitflash-primary' : 'border-gray-200'} shadow-sm transition-all hover:shadow-md`}
    >
      {leaderboardRank && leaderboardRank <= 10 && (
        <div className="absolute top-0 right-0 p-2">
          <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
            <Award size={14} />
            <span>Rang {leaderboardRank}</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-lg font-semibold">
              {name.split(' ').map(word => word[0]).join('')}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500">{experience} Jahre Erfahrung</p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 line-clamp-3">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Expertise:</h4>
            <div className="flex flex-wrap gap-2">
              {expertise.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant={tag.highlighted ? "default" : "outline"}
                  className={tag.highlighted ? "bg-gitflash-primary text-white hover:bg-gitflash-primary/90" : ""}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Verfügbarkeit:</h4>
            <div className="flex flex-wrap gap-2">
              {availability.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <Button 
            asChild
            variant={active ? "default" : "outline"} 
            className="gap-1 rounded-full"
            size="sm"
          >
            <Link to={`/unternehmen/talent/${id}`}>
              Profil ansehen <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
