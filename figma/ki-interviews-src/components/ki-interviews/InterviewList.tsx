
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { InterviewCard } from "./InterviewCard";

interface Interview {
  id: string;
  image: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
}

// Sample data - in a real app, this would come from an API or props
const interviews: Interview[] = [
  {
    id: "1",
    image: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2dd467d586601d48080d5df03accad71b21462ff?placeholderIfAbsent=true",
    title: "Bauleiter - Hochbau",
    description: "Technisches Interview: Projektmanagement & Bauablauf",
    duration: "20m",
    difficulty: "Mittel",
  },
  {
    id: "2",
    image: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/76b47a2cddc417d0e75ce89c86396f2a20acb549?placeholderIfAbsent=true",
    title: "Immobilien-Projektentwickler",
    description: "Business Case Interview: Grundstücksbewertung & Wirtschaftlichkeitsanalyse",
    duration: "20m",
    difficulty: "Mittel",
  },
  {
    id: "3",
    image: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2dd467d586601d48080d5df03accad71b21462ff?placeholderIfAbsent=true",
    title: "Architekt",
    description: "Fachliches Interview: Entwurfsprozess & Bauüberwachung",
    duration: "15m",
    difficulty: "Einfach",
  },
  {
    id: "4",
    image: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/76b47a2cddc417d0e75ce89c86396f2a20acb549?placeholderIfAbsent=true",
    title: "Facility Manager",
    description: "Case Interview: Objektverwaltung & Wartungsstrategien",
    duration: "25m",
    difficulty: "Schwer",
  },
];

export const InterviewList: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`w-full mt-6 ${!isMobile ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : ''}`}>
      {interviews.map((interview, index) => (
        <div 
          key={interview.id} 
          className={isMobile ? (index > 0 ? "mt-3" : "") : ""}
        >
          <InterviewCard
            image={interview.image}
            title={interview.title}
            description={interview.description}
            duration={interview.duration}
            difficulty={interview.difficulty}
          />
        </div>
      ))}
    </div>
  );
};
