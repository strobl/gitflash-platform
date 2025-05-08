import React from "react";
import FeedbackItem from "./FeedbackItem";

const FeedbackList: React.FC = () => {
  const feedbackItems = [
    {
      id: 1,
      title: "Bauvertragsrecht & Nachtragsmanagement",
      status: "Eingereicht – vor 1 Tag",
      iconType: "camera" as const,
    },
    {
      id: 2,
      title: "Kostenplanung & Ausschreibung (AVA)",
      status: "Eingereicht – vor 1 Tag",
      iconType: "cameraStock" as const,
    },
    {
      id: 3,
      title: "Terminplanung mit Bauablaufstörungen",
      status: "Eingereicht – vor 1 Tag",
      iconType: "cameraStock" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {feedbackItems.map((item) => (
        <FeedbackItem
          key={item.id}
          title={item.title}
          status={item.status}
          iconType={item.iconType}
        />
      ))}
    </div>
  );
};

export default FeedbackList;
