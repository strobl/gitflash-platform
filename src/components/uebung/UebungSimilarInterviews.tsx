
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UebungInterviewCard } from "./UebungInterviewCard";

interface Interview {
  id: string;
  conversation_name: string;
  conversation_context?: string;
  image: string;
  duration: string;
  difficulty: string;
}

interface UebungSimilarInterviewsProps {
  interviews: Interview[];
  category: string;
}

export const UebungSimilarInterviews: React.FC<UebungSimilarInterviewsProps> = ({ 
  interviews,
  category
}) => {
  if (!interviews || interviews.length === 0) return null;

  const handleInterviewSelect = (id: string) => {
    window.location.href = `/uebung/${id}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <h2 className="text-2xl font-bold text-gitflash-primary mb-6">
        Ähnliche {category} Interviews
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map(interview => (
          <div 
            key={interview.id} 
            onClick={() => handleInterviewSelect(interview.id)}
            className="cursor-pointer"
          >
            <UebungInterviewCard 
              image={interview.image}
              title={interview.conversation_name}
              description={interview.conversation_context || ""}
              duration={interview.duration}
              difficulty={interview.difficulty}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
