
import React from "react";
import TaskCard from "./TaskCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface WelcomeSectionProps {
  userName: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ userName }) => {
  const isMobile = useIsMobile();

  return (
    <section className="flex flex-col gap-6 bg-white px-4 py-6">
      <div className="flex flex-col">
        <h1 className="text-[#0A2540] text-xl font-bold">
          Willkommen zurück, {userName}
        </h1>
        <p className="text-[#546679] text-sm">
          Wichtige Aufgaben
        </p>
      </div>
      
      {isMobile ? (
        <div className="overflow-x-auto pb-2 -mx-4 px-4">
          <div className="flex gap-4 pl-0">
            <TaskCard
              title="Lebenslauf hochladen"
              description="Werden Sie automatisch für passende Positionen berücksichtigt."
              actionText="Jetzt hochladen"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 16H16V8H20L12 0L4 8H8V16ZM4 20H20V18H4V20Z" fill="#0A2540" />
                </svg>
              }
            />
            <TaskCard
              title="Interview üben"
              description="Bereiten Sie sich gezielt auf Fachinterviews vor"
              actionText="Jetzt hochladen"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 6H3V18H21V6ZM19 16H5V8H19V16ZM9.5 13H14.5V11H9.5V13Z" fill="#0A2540" />
                </svg>
              }
            />
          </div>
        </div>
      ) : (
        <div className="flex gap-3 flex-wrap">
          <TaskCard
            title="Lebenslauf hochladen"
            description="Werden Sie automatisch für passende Positionen berücksichtigt."
            actionText="Jetzt hochladen"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16H16V8H20L12 0L4 8H8V16ZM4 20H20V18H4V20Z" fill="#0A2540" />
              </svg>
            }
          />
          <TaskCard
            title="Interview üben"
            description="Bereiten Sie sich gezielt auf Fachinterviews vor"
            actionText="Jetzt hochladen"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 6H3V18H21V6ZM19 16H5V8H19V16ZM9.5 13H14.5V11H9.5V13Z" fill="#0A2540" />
              </svg>
            }
          />
        </div>
      )}
    </section>
  );
};

export default WelcomeSection;
