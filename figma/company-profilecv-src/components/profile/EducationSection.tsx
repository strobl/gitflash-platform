
import React from "react";

interface EducationItem {
  id?: string;
  institution: string;
  degree: string;
  start_date: string;
  end_date?: string;
  description?: string;
}

interface EducationSectionProps {
  education?: EducationItem[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education = [] }) => {
  if (education.length === 0) {
    return (
      <section className="w-full bg-white pb-8 px-4">
        <h2 className="text-[#0A2540] text-base font-bold">Ausbildung</h2>
        <div className="w-full text-[10px] text-[#546679] font-normal mt-4">
          <p className="text-center py-4">Keine Ausbildungsdaten eingetragen.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white pb-8 px-4">
      <h2 className="text-[#0A2540] text-base font-bold">
        Ausbildung
      </h2>
      <div className="w-full text-[10px] text-[#546679] font-normal mt-4">
        <ul className="list-none p-0 m-0 space-y-4">
          {education.map((edu, index) => (
            <li key={edu.id || index}>
              <div>
                <span className="font-bold text-[#0A2540]">{edu.degree}</span>
                {edu.institution && <span> – {edu.institution}</span>}
              </div>
              <div className="text-[8px] text-[#546679] mt-1">
                {edu.start_date} {edu.end_date ? `- ${edu.end_date}` : '- aktuell'}
              </div>
              {edu.description && <div className="mt-1">{edu.description}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default EducationSection;
