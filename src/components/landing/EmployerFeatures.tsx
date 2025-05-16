
import React from "react";

interface FeatureCardProps {
  image: string;
  icon: string;
  label: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  image,
  icon,
  label,
  title,
  description,
}) => {
  return (
    <div className="bg-white shadow-[0px_12px_32px_rgba(0,0,0,0.08)] w-full overflow-hidden mt-3 first:mt-0 md:mt-0 rounded-xl hover:shadow-lg transition-shadow">
      <img
        src={image}
        className="aspect-[1.6] object-cover w-full"
        alt={title}
      />
      <div className="w-full px-3 py-4 md:px-5 md:py-6">
        <div className="flex w-full flex-col items-stretch text-[#0A2540]">
          <div className="justify-center items-center flex flex-col overflow-hidden text-[10px] md:text-xs font-medium whitespace-nowrap text-right bg-[#E7E9EC] px-2 py-1 rounded-[100px]">
            <div className="flex items-center gap-1">
              <img
                src={icon}
                className="aspect-[1] object-contain w-3.5 md:w-4 self-stretch shrink-0 my-auto"
                alt={label}
              />
              <span className="text-[#0A2540] self-stretch my-auto">
                {label}
              </span>
            </div>
          </div>
          <h3 className="text-[#0A2540] text-xl md:text-2xl font-bold mt-1.5 md:mt-2">{title}</h3>
        </div>
        <p className="text-[#546679] text-xs md:text-sm font-normal leading-[18px] md:leading-[21px] mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export const EmployerFeatures: React.FC = () => {
  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-12 py-8 md:py-16">
      <div className="w-full max-w-3xl mx-auto">
        <div className="max-w-full mx-auto font-bold">
          <span className="text-[#3B5166] text-[10px] md:text-xs">
            Für Unternehmen jeder Größe
          </span>
          <h2 className="text-[#0A2540] text-2xl md:text-3xl lg:text-4xl mt-1">
            Finden Sie hochqualifzierte Kandidaten – sofort.
          </h2>
        </div>
        <p className="text-[#546679] text-sm md:text-base font-normal leading-[21px] mt-3 md:mt-5">
          GitFlash vereinfassst Ihren Recruiting-Prozess radikal. Mithilfe
          KI-basierter Video-Interviews identifzieren wir exakt die Kandidaten,
          die fachlich und persönlich zu Ihrem Unternehmen passen. Sparen Sie
          Zeit und gewinnen Sie Top-Personal noch heute.
        </p>
      </div>
      <div className="w-full mt-6 md:mt-10 max-w-5xl mx-auto">
        <div className="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          <FeatureCard
            image="https://gehhxwqlhzsesxzqleks.supabase.co/storage/v1/object/public/gitflash/bild1.png"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/07eb9cbd759ff3d187cc52173d8bc326bc989803?placeholderIfAbsent=true"
            label="Suche"
            title="Personal entdecken"
            description="Durchsuchen Sie unser Verzeichnis von Interviews, Lebensläufen und Online-Proflen, um schnell das Personal zu fnden, das exakt zu Ihrer ofenen Stelle passt."
          />
          <FeatureCard
            image="https://gehhxwqlhzsesxzqleks.supabase.co/storage/v1/object/public/gitflash/bild2.png"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/fb9bf6d1d0b548acc6f5d058bbd5fe74dd4624cf?placeholderIfAbsent=true"
            label="Team"
            title="Sofort einstellen"
            description={
              'Mit der Funktion „Sofort einstellen" können Sie noch heute Verträge versenden und neues Personal direkt ins Team aufnehmen – ohne administrativen Aufwand.'
            }
          />
          <FeatureCard
            image="https://gehhxwqlhzsesxzqleks.supabase.co/storage/v1/object/public/gitflash/bild3.png"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/ade5621d125d422aee04812bc8164cb5901baa59?placeholderIfAbsent=true"
            label="Shortlist"
            title="Intro anfragen"
            description="Vereinbaren Sie mit nur einem Klick ein Kennenlernen mit Personal aus unserem Talent-Pool. Alle gelisteten Personen sind aktiv auf der Suche nach neuen berufichen"
          />
          <FeatureCard
            image="https://gehhxwqlhzsesxzqleks.supabase.co/storage/v1/object/public/gitflash/bild4.png"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/07eb9cbd759ff3d187cc52173d8bc326bc989803?placeholderIfAbsent=true"
            label="Zahlungen"
            title="Direkt über GitFlash abrechnen"
            description="Nutzen Sie GitFlash, um Ihr Personal direkt über unsere Plattform abzurechnen – unkompliziert, schnell und rechtskonform."
          />
        </div>
      </div>
    </section>
  );
};
