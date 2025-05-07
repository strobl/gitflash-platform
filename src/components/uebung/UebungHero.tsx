
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const UebungHero: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="items-center flex w-full flex-col text-center justify-center bg-white px-4 py-8">
      <div className={`flex flex-col ${isMobile ? 'max-w-full w-72' : 'max-w-3xl'}`}>
        <h1 className={`text-[#0A2540] font-bold ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
          {isMobile ? (
            <>
              Üben Sie
              <br />
              Bewerbungsgespräche kostenlos mit KI.
            </>
          ) : (
            'Üben Sie Bewerbungsgespräche kostenlos mit KI.'
          )}
        </h1>
        <p className={`text-[#546679] ${isMobile ? 'text-sm leading-[21px]' : 'text-lg leading-relaxed'} font-normal mt-3`}>
          {isMobile ? (
            <>
              Trainieren Sie mit über 100 realistischen Übungsinterviews, erhalten Sie
              direktes <br />
              Feedback und verbessern Sie gezielt Ihre Jobchancen.
            </>
          ) : (
            'Trainieren Sie mit über 100 realistischen Übungsinterviews, erhalten Sie direktes Feedback und verbessern Sie gezielt Ihre Jobchancen.'
          )}
        </p>
      </div>
    </section>
  );
};
