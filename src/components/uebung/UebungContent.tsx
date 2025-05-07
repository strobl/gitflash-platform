
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { UebungHero } from "./UebungHero";
import { UebungCategoryNav } from "./UebungCategoryNav";
import { UebungInterviewList } from "./UebungInterviewList";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

interface Interview {
  id: string;
  conversation_name: string;
  conversation_context?: string;
  created_at: string;
  status: string;
  category: string;
  image?: string;
  duration?: string;
  difficulty?: string;
}

// Sample data for interviews
const sampleInterviews: Interview[] = [
  {
    id: "1",
    conversation_name: "Bauleiter - Hochbau",
    conversation_context: "Technisches Interview: Projektmanagement & Bauablauf",
    created_at: "2023-05-01",
    status: "active",
    category: "engineering",
    image: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2dd467d586601d48080d5df03accad71b21462ff?placeholderIfAbsent=true",
    duration: "20m",
    difficulty: "Mittel",
  },
  {
    id: "2",
    conversation_name: "Immobilien-Projektentwickler",
    conversation_context: "Business Case Interview: Grundstücksbewertung & Wirtschaftlichkeitsanalyse",
    created_at: "2023-05-05",
    status: "active",
    category: "management",
    image: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/76b47a2cddc417d0e75ce89c86396f2a20acb549?placeholderIfAbsent=true",
    duration: "20m",
    difficulty: "Mittel",
  },
  {
    id: "3",
    conversation_name: "Architekt",
    conversation_context: "Fachliches Interview: Entwurfsprozess & Bauüberwachung",
    created_at: "2023-05-10",
    status: "active",
    category: "architecture",
    image: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2dd467d586601d48080d5df03accad71b21462ff?placeholderIfAbsent=true",
    duration: "15m",
    difficulty: "Einfach",
  },
  {
    id: "4",
    conversation_name: "Facility Manager",
    conversation_context: "Case Interview: Objektverwaltung & Wartungsstrategien",
    created_at: "2023-05-15",
    status: "active",
    category: "management",
    image: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/76b47a2cddc417d0e75ce89c86396f2a20acb549?placeholderIfAbsent=true",
    duration: "25m",
    difficulty: "Schwer",
  },
  {
    id: "5",
    conversation_name: "Baurechtsanwalt",
    conversation_context: "Rechtliches Interview: Baugenehmigungen & Vertragsgestaltung",
    created_at: "2023-05-20",
    status: "active",
    category: "law",
    image: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2dd467d586601d48080d5df03accad71b21462ff?placeholderIfAbsent=true",
    duration: "30m",
    difficulty: "Schwer",
  },
  {
    id: "6",
    conversation_name: "Immobilienfinanzierung",
    conversation_context: "Finanzielles Interview: Projektfinanzierung & Renditeberechnung",
    created_at: "2023-05-25",
    status: "active",
    category: "finance",
    image: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/76b47a2cddc417d0e75ce89c86396f2a20acb549?placeholderIfAbsent=true",
    duration: "20m",
    difficulty: "Mittel",
  }
];

export const UebungContent: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>(sampleInterviews);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredInterviews(sampleInterviews);
    } else {
      setFilteredInterviews(sampleInterviews.filter(interview => interview.category === activeCategory));
    }
  }, [activeCategory]);

  const handleInterviewSelect = (id: string) => {
    navigate(`/interviews/${id}`);
  };

  return (
    <div className="bg-white w-full overflow-hidden mx-auto rounded-xl shadow-sm">
      <main className={`${isMobile ? 'px-4' : 'container mx-auto px-6'}`}>
        <UebungHero />
        <section className="w-full pb-8">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <UebungCategoryNav 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white shadow-[0px_12px_32px_rgba(0,0,0,0.08)] overflow-hidden rounded-xl">
                  <Skeleton className="aspect-[1.8] w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <UebungInterviewList 
              interviews={filteredInterviews}
              onInterviewSelect={handleInterviewSelect}
            />
          )}
        </section>
      </main>
    </div>
  );
};
