
import React from "react";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";
import { CandidateCard } from "./CandidateCard";
import { BottomNavigation } from "./BottomNavigation";

export const SearchPage: React.FC = () => {
  const candidates = [
    {
      name: "L. M.",
      experience: 8,
      description:
        "Begleitete Großprojekte als Juristin im öfentlichen Baurecht, inkl. Vertragsprüfung, Nachtragsverhandlung und Vergabeverfahren.",
      expertise: [
        { label: "Baurecht", highlighted: true },
        { label: "VOB/B" },
        { label: "Vergaberecht" },
      ],
      availability: [{ label: "Vollzeit" }, { label: "Teilzeit" }],
    },
    {
      name: "T. K.",
      experience: 6,
      description:
        "Erfahrener Projektentwickler mit Fokus auf Wirtschaftlichkeitsanalysen und Nutzungskonzepte im Wohnungsbau.",
      expertise: [{ label: "Projektentwicklung", highlighted: true }],
      availability: [{ label: "Vollzeit" }, { label: "Teilzeit" }],
    },
    {
      name: "T. K.",
      experience: 6,
      description:
        "Leitete als BIM-Koordinator die Digitalisierung mehrerer Infrastrukturprojekte im Hoch- und Tiefbau.",
      expertise: [
        { label: "BIM", highlighted: true },
        { label: "Revit" },
      ],
      availability: [{ label: "Vollzeit" }, { label: "Teilzeit" }],
      active: true,
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white min-h-screen">
      <div className="flex flex-col h-full">
        <Header />
        <div className="flex flex-col gap-3 md:gap-4 px-3 md:px-4 py-4 md:py-6">
          <SearchBar />
          <div className="flex flex-col gap-3 md:gap-4 mt-1 md:mt-2">
            {candidates.map((candidate, index) => (
              <CandidateCard
                key={index}
                name={candidate.name}
                experience={candidate.experience}
                description={candidate.description}
                expertise={candidate.expertise}
                availability={candidate.availability}
                active={candidate.active}
              />
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};
