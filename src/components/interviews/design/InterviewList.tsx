
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { InterviewCard } from "./InterviewCard";

interface Interview {
  id: string;
  conversation_name: string;
  conversation_context?: string;
  image?: string;
  duration?: string;
  difficulty?: string;
}

interface InterviewListProps {
  interviews: Interview[];
  onInterviewSelect: (id: string) => void;
}

export const InterviewList: React.FC<InterviewListProps> = ({ 
  interviews,
  onInterviewSelect
}) => {
  const isMobile = useIsMobile();
  
  // If no interviews, show empty state
  if (interviews.length === 0) {
    return (
      <div className="text-center py-12 bg-[#F5F6F7] rounded-xl">
        <h3 className="text-xl font-semibold mb-2 text-[#0A2540]">Keine Interviews gefunden</h3>
        <p className="text-[#546679] mb-4">
          Versuchen Sie es mit einer anderen Kategorie.
        </p>
      </div>
    );
  }
  
  return (
    <div className={`w-full mt-6 ${!isMobile ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : ''}`}>
      {interviews.map((interview, index) => (
        <div 
          key={interview.id} 
          className={isMobile ? (index > 0 ? "mt-3" : "") : ""}
          onClick={() => onInterviewSelect(interview.id)}
        >
          <InterviewCard
            image={interview.image || "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2dd467d586601d48080d5df03accad71b21462ff?placeholderIfAbsent=true"}
            title={interview.conversation_name}
            description={interview.conversation_context || "Keine Beschreibung verfügbar."}
            duration={interview.duration || "15m"}
            difficulty={interview.difficulty || "Mittel"}
          />
        </div>
      ))}
    </div>
  );
};
