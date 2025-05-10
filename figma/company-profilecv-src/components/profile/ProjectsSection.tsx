import React from "react";

const ProjectsSection: React.FC = () => {
  return (
    <section className="w-full bg-white pb-8 px-4">
      <h2 className="text-[#0A2540] text-base font-bold">
        Projekte
      </h2>
      <div className="w-full text-[10px] text-[#546679] font-normal mt-4">
        <ul className="list-none p-0 m-0">
          <li className="text-[#546679]">
            Nachtrags-Taskforce Autobahn A3 Ausbau Juristische Leitung in
            einem interdisziplinären Team zur Bewertung und Abwehr von
            Nachträgen in Höhe von 11,2 Mio. €. Ergebnis: &gt;80% der
            Ansprüche erfolgreich reduziert oder verhandelt.
          </li>
          <li className="text-[#546679] mt-2">
            BIM-Vertragsleitlinie für Landesbauverwaltung NRW
            Mitverantwortlich für die rechtliche Strukturierung von
            BIM-Verträgen im Rahmen öffentlicher Bauaufträge. Integration von
            Leistungsbildern und Nachtragsregelungen unter Berücksichtigung
            der HOAI.
          </li>
          <li className="text-[#546679] mt-2">
            Vergabeverfahren Schulbau Hamburg Federführende Erstellung und
            rechtliche Begleitung eines europaweiten Verhandlungsverfahrens
            mit Teilnahmewettbewerb (ca. 35 Mio. € Volumen).
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProjectsSection;
