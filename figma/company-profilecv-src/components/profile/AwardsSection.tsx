import React from "react";

const AwardsSection: React.FC = () => {
  return (
    <section className="w-full bg-white pb-8 px-4">
      <h2 className="text-[#0A2540] text-base font-bold">
        Auszeichnungen
      </h2>
      <div className="w-full text-[10px] text-[#546679] font-normal mt-4">
        <ul className="list-none p-0 m-0">
          <li className="text-[#546679]">
            Preisträger:in „BauRecht Innovativ 2023" – verliehen vom Deutschen
            Baugerichtstag für herausragende Arbeit zur Digitalisierung im
            Claim Management
          </li>
          <li className="text-[#546679] mt-2">
            Best Paper Award, 11. Deutscher Vergabetag (2021) – für Analyse zu
            § 16d VOB/A und strategische Zuschlagskriterien
          </li>
          <li className="text-[#546679] mt-2">
            Nominiert für Nachwuchsjurist:in des Jahres durch die ARGE
            Baurecht 2022
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AwardsSection;
