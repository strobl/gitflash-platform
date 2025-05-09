
import React from "react";
import { SearchFilter } from "./SearchFilter";
import { CandidateList } from "./CandidateList";

export const DesktopSearchPage: React.FC = () => {
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
    <div className="flex flex-col">
      <div className="mb-8">
        <SearchFilter />
      </div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#0A2540]">Gefundene Kandidaten</h2>
          <div className="text-sm text-gray-500">3 Ergebnisse</div>
        </div>
        <CandidateList candidates={candidates} />
      </div>
    </div>
  );
};
