
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Hero } from "./Hero";
import { CategoryNav } from "./CategoryNav";
import { InterviewList } from "./InterviewList";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

interface KIInterviewsProps {
  interviews: Interview[];
  isLoading: boolean;
  error: string | null;
  onInterviewSelect: (id: string) => void;
}

const KIInterviews: React.FC<KIInterviewsProps> = ({
  interviews,
  isLoading,
  error,
  onInterviewSelect
}) => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>(interviews);
  
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredInterviews(interviews);
    } else {
      setFilteredInterviews(interviews.filter(interview => interview.category === activeCategory));
    }
  }, [activeCategory, interviews]);

  return (
    <div className="bg-white w-full overflow-hidden mx-auto rounded-xl shadow-sm">
      <main className={`${isMobile ? 'px-4' : 'container mx-auto px-6'}`}>
        <Hero />
        <section className="w-full pb-8">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <CategoryNav 
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
            <InterviewList 
              interviews={filteredInterviews}
              onInterviewSelect={onInterviewSelect}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default KIInterviews;
