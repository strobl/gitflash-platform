
import React from "react";

interface AwardItem {
  id?: string;
  title?: string;
  description?: string;
  date?: string;
}

interface AwardsSectionProps {
  awards?: AwardItem[];
}

const AwardsSection: React.FC<AwardsSectionProps> = ({ awards = [] }) => {
  const defaultAwards = [
    {
      title: "Preisträger:in „BauRecht Innovativ 2023"",
      description: "Verliehen vom Deutschen Baugerichtstag für herausragende Arbeit zur Digitalisierung im Claim Management"
    },
    {
      title: "Best Paper Award, 11. Deutscher Vergabetag (2021)",
      description: "Für Analyse zu § 16d VOB/A und strategische Zuschlagskriterien"
    },
    {
      title: "Nominiert für Nachwuchsjurist:in des Jahres durch die ARGE Baurecht 2022",
      description: ""
    }
  ];

  const displayAwards = awards.length > 0 ? awards : defaultAwards;
  
  if (displayAwards.length === 0) {
    return (
      <section className="w-full bg-white pb-8 px-4">
        <h2 className="text-[#0A2540] text-base font-bold">Auszeichnungen</h2>
        <div className="w-full text-[10px] text-[#546679] font-normal mt-4">
          <p className="text-center py-4">Keine Auszeichnungen eingetragen.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white pb-8 px-4">
      <h2 className="text-[#0A2540] text-base font-bold">
        Auszeichnungen
      </h2>
      <div className="w-full text-[10px] text-[#546679] font-normal mt-4">
        <ul className="list-none p-0 m-0 space-y-2">
          {displayAwards.map((award, index) => (
            <li key={award.id || index} className="text-[#546679]">
              <div className="font-bold text-[#0A2540]">{award.title}</div>
              {award.description && <div className="mt-1">{award.description}</div>}
              {award.date && <div className="text-[8px] mt-1">{award.date}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AwardsSection;
