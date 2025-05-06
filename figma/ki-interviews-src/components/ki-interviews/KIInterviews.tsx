
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { CategoryNav } from "./CategoryNav";
import { InterviewList } from "./InterviewList";

const KIInterviews: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white w-full overflow-hidden mx-auto rounded-xl shadow-sm">
      <header>
        <Navbar />
      </header>
      <main className={`${isMobile ? 'px-4' : 'container mx-auto px-6'}`}>
        <Hero />
        <section className="w-full pb-8">
          <CategoryNav />
          <InterviewList />
        </section>
      </main>
    </div>
  );
};

export default KIInterviews;
