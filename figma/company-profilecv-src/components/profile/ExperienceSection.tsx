import React from "react";

const ExperienceSection: React.FC = () => {
  return (
    <section className="w-full text-[10px] text-[#546679] font-normal bg-white pt-8 px-4">
      <h2 className="text-[#0A2540] text-base font-bold">
        Berufserfahrung
      </h2>
      
      <div className="flex w-full gap-4 mt-4">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/aee4c29f9f0e32284b4a0656a0a9967a69785a3e?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-10 shrink-0"
          alt="Company logo"
        />
        <div className="flex flex-col items-stretch justify-center flex-1 shrink basis-[0%]">
          <h3 className="text-[#0A2540] text-xs font-bold">
            Jurist:in für Bau- und Vergaberecht
          </h3>
          <div className="flex w-full gap-4 text-xs font-medium mt-2">
            <div className="text-[#546679] flex-1 shrink basis-[0%]">
              STRABAG SE
            </div>
            <div className="text-[#546679] text-right w-20">
              2022- heute
            </div>
          </div>
          <ul className="list-none p-0">
            <li className="text-[#546679] mt-2">
              Beratung bei der Erstellung und Verhandlung von Verträgen nach
              VOB/B und HOAI
            </li>
            <li className="text-[#546679] mt-2">
              Prüfung und Abwehr von Nachtragsforderungen sowie Begleitung von
              Streitigkeiten im Bauablauf
            </li>
            <li className="text-[#546679] mt-2">
              Rechtliche Unterstützung bei der Durchführung europaweiter
              Vergabeverfahren
            </li>
            <li className="text-[#546679] mt-2">
              Entwicklung unternehmensweiter Musterverträge und Schulung der
              Projektteams
            </li>
            <li className="text-[#546679] mt-2">
              Erstellung von rechtlichen Handlungsempfehlungen für die
              Bauleitung in kritischen Projektsituationen
            </li>
          </ul>
        </div>
      </div>
      
      <div className="flex w-full gap-4 mt-4">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/aee4c29f9f0e32284b4a0656a0a9967a69785a3e?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-10 shrink-0"
          alt="Company logo"
        />
        <div className="flex flex-col items-stretch justify-center flex-1 shrink basis-[0%]">
          <h3 className="text-[#0A2540] text-xs font-bold">
            Syndikusrechtsanwalt – Bauprojekte
          </h3>
          <div className="flex w-full text-xs font-medium mt-2">
            <div className="text-[#546679] flex-1 shrink basis-[0%]">
              Landesbetrieb Bau NRW
            </div>
            <div className="text-[#546679] text-right w-20">
              2018 - 2021
            </div>
          </div>
          <ul className="list-none p-0">
            <li className="text-[#546679] mt-2">
              Juristische Begleitung öfentlicher Hochbauprojekte von Planung
              bis Abnahme
            </li>
            <li className="text-[#546679] mt-2">
              Erstellung von Vergabeunterlagen und Bewertung von Angeboten
              nach VgV
            </li>
            <li className="text-[#546679] mt-2">
              Durchsetzung von Mängelrechten und Klärung komplexer
              Leistungsstörungen
            </li>
            <li className="text-[#546679] mt-2">
              Zusammenarbeit mit Bauämtern, Architekturbüros und externen
              Kanzleien
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
