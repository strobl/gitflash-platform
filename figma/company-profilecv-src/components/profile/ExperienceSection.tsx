
import React from "react";

interface ExperienceItem {
  id?: string;
  title: string;
  company: string;
  start_date: string;
  end_date?: string;
  description?: string;
}

interface ExperienceSectionProps {
  experiences?: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences = [] }) => {
  if (experiences.length === 0) {
    return (
      <section className="w-full bg-white pb-8 px-4">
        <h2 className="text-[#0A2540] text-base font-bold">Berufserfahrung</h2>
        <div className="w-full text-[10px] text-[#546679] font-normal mt-4">
          <p className="text-center py-4">Keine Berufserfahrung eingetragen.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white pb-8 px-4">
      <h2 className="text-[#0A2540] text-base font-bold">
        Berufserfahrung
      </h2>
      <div className="w-full text-[10px] text-[#546679] font-normal mt-4">
        <ul className="list-none p-0 m-0 space-y-4">
          {experiences.map((exp, index) => (
            <li key={exp.id || index}>
              <div>
                <span className="font-bold text-[#0A2540]">{exp.title}</span>
                {exp.company && <span> – {exp.company}</span>}
              </div>
              <div className="text-[8px] text-[#546679] mt-1">
                {exp.start_date} {exp.end_date ? `- ${exp.end_date}` : '- aktuell'}
              </div>
              {exp.description && <div className="mt-1">{exp.description}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExperienceSection;
