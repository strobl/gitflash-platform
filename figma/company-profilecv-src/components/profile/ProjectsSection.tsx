
import React from "react";

interface ProjectItem {
  id?: string;
  title?: string;
  description?: string;
  date?: string;
}

interface ProjectsSectionProps {
  projects?: ProjectItem[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects = [] }) => {
  const defaultProjects = [
    {
      title: "Nachtrags-Taskforce Autobahn A3 Ausbau",
      description: "Juristische Leitung in einem interdisziplinären Team zur Bewertung und Abwehr von Nachträgen in Höhe von 11,2 Mio. €. Ergebnis: >80% der Ansprüche erfolgreich reduziert oder verhandelt."
    },
    {
      title: "BIM-Vertragsleitlinie für Landesbauverwaltung NRW",
      description: "Mitverantwortlich für die rechtliche Strukturierung von BIM-Verträgen im Rahmen öffentlicher Bauaufträge. Integration von Leistungsbildern und Nachtragsregelungen unter Berücksichtigung der HOAI."
    },
    {
      title: "Vergabeverfahren Schulbau Hamburg",
      description: "Federführende Erstellung und rechtliche Begleitung eines europaweiten Verhandlungsverfahrens mit Teilnahmewettbewerb (ca. 35 Mio. € Volumen)."
    }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  
  if (displayProjects.length === 0) {
    return (
      <section className="w-full bg-white pb-8 px-4">
        <h2 className="text-[#0A2540] text-base font-bold">Projekte</h2>
        <div className="w-full text-[10px] text-[#546679] font-normal mt-4">
          <p className="text-center py-4">Keine Projektdaten eingetragen.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white pb-8 px-4">
      <h2 className="text-[#0A2540] text-base font-bold">
        Projekte
      </h2>
      <div className="w-full text-[10px] text-[#546679] font-normal mt-4">
        <ul className="list-none p-0 m-0 space-y-2">
          {displayProjects.map((project, index) => (
            <li key={project.id || index} className="text-[#546679]">
              <div className="font-bold text-[#0A2540]">{project.title}</div>
              <div className="mt-1">{project.description}</div>
              {project.date && <div className="text-[8px] mt-1">{project.date}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectsSection;
