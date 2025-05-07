import React from "react";
import InterviewCard from "./InterviewCard";

export const SimilarInterviews: React.FC = () => {
  const similarInterviews = [
    {
      id: 1,
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/3c3ab2682dd8d8f46fffd07a9eaa93369d7f9810?placeholderIfAbsent=true",
      title: "Immobilien-Projektentwickler",
      description: "Business Case Interview: Grundstücksbewertung & Wirtschaftlichkeitsanalyse",
      duration: "20m",
      difficulty: "Mittel"
    },
    {
      id: 2,
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/a10bb8285979a1b548135f0d5748913e3f047321?placeholderIfAbsent=true",
      title: "Software Engineering",
      description: "New Grad E3: Technical Interview #1",
      duration: "20m",
      difficulty: "Mittel"
    },
    {
      id: 3,
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/7a7a31116fca8d2eed476a020a7c129ccfeacf15?placeholderIfAbsent=true",
      title: "Software Engineering",
      description: "New Grad E3: Technical Interview #1",
      duration: "20m",
      difficulty: "Mittel"
    }
  ];

  return (
    <section className="w-full mt-8">
      <h2 className="text-[#0A2540] text-base font-bold">
        Ähnliche Interviews
      </h2>
      <div className="w-full mt-4 space-y-3">
        {similarInterviews.map((interview) => (
          <InterviewCard
            key={interview.id}
            imageSrc={interview.imageSrc}
            title={interview.title}
            description={interview.description}
            duration={interview.duration}
            difficulty={interview.difficulty}
          />
        ))}
      </div>
    </section>
  );
};

export default SimilarInterviews;
