
import React from "react";
import InterviewItem from "./InterviewItem";
import { useIsMobile } from "@/hooks/use-mobile";

const InterviewList: React.FC = () => {
  const isMobile = useIsMobile();
  
  const interviews = [
    {
      id: 1,
      title: "Bauvertragsrecht & Nachtragsmanagement",
      status: "Eingereicht - vor 1 Tag",
    },
    {
      id: 2,
      title: "Kostenplanung & Ausschreibung (AVA)",
      status: "Eingereicht - vor 1 Tag",
    },
    {
      id: 3,
      title: "Terminplanung mit Bauablaufstörungen",
      status: "Eingereicht - vor 1 Tag",
    },
  ];

  return (
    <div className={`mt-6 ${isMobile ? "flex flex-col gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}`}>
      {interviews.map((item) => (
        <InterviewItem
          key={item.id}
          title={item.title}
          status={item.status}
        />
      ))}
    </div>
  );
};

export default InterviewList;
