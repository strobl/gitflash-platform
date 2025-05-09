
import React from "react";
import { DesktopCandidateCard } from "./DesktopCandidateCard";

interface ExpertiseTag {
  label: string;
  highlighted?: boolean;
}

interface AvailabilityTag {
  label: string;
}

interface Candidate {
  name: string;
  experience: number;
  description: string;
  expertise: ExpertiseTag[];
  availability: AvailabilityTag[];
  active?: boolean;
}

interface CandidateListProps {
  candidates: Candidate[];
}

export const CandidateList: React.FC<CandidateListProps> = ({ candidates }) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:gap-6">
      {candidates.map((candidate, index) => (
        <DesktopCandidateCard
          key={index}
          name={candidate.name}
          experience={candidate.experience}
          description={candidate.description}
          expertise={candidate.expertise}
          availability={candidate.availability}
          active={candidate.active}
        />
      ))}
    </div>
  );
};
