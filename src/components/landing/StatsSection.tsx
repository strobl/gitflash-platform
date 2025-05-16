
import React, { useState } from "react";

interface StatCardProps {
  number: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, description }) => {
  return (
    <div className="rounded bg-white flex flex-col flex-1 shrink basis-[0%] px-2 py-3 md:px-4 md:py-5 shadow-sm">
      <div className="text-[#0A2540] text-base md:text-2xl font-bold">{number}</div>
      <div className="text-[#546679] text-xs md:text-sm font-normal leading-[18px] mt-1 md:mt-2">
        {description}
      </div>
    </div>
  );
};

export const StatsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="bg-[rgba(242,244,246,1)] w-full px-4 sm:px-6 md:px-12 py-8 md:py-16">
      <div className="flex w-full flex-col items-stretch text-center max-w-3xl mx-auto">
        <div className="flex max-w-full mx-auto flex-col font-bold">
          <span className="text-[#3B5166] text-[10px] md:text-xs">
            Entdecken Sie, was berufich wirklich in Ihnen steckt
          </span>
          <h2 className="text-[#0A2540] text-2xl md:text-3xl lg:text-4xl mt-1">
            Finden Sie den Job, der exakt zu Ihnen passt.
          </h2>
        </div>
        <p className="text-[#546679] text-sm md:text-base font-normal leading-[21px] mt-3 md:mt-5">
          GitFlash erkennt mit KI Ihre individuellen Stärken, Erfahrungen und
          Ziele. Wir bringen Sie gezielt mit Unternehmen zusammen, die genau
          nach Ihrem Profl suchen.
        </p>
      </div>
      <div className="flex w-full items-stretch gap-2 md:gap-6 text-center mt-6 md:mt-10 max-w-3xl mx-auto">
        <StatCard
          number="250+"
          description="Unternehmen, die Sie kennenlernen möchten."
        />
        <StatCard
          number="20+"
          description="Stunden individuelles Interview-Coaching."
        />
      </div>
      <div className="relative flex w-full flex-col items-stretch mt-6 md:mt-10 max-w-3xl mx-auto">
        <img
          src="https://gehhxwqlhzsesxzqleks.supabase.co/storage/v1/object/public/gitflash/bild13.png"
          className="aspect-[1.31] object-contain w-full shadow-[0px_4px_24px_rgba(0,0,0,0.1)] z-0 rounded-2xl"
          alt="Dashboard preview"
        />
        <div className="self-center z-0 flex gap-1 md:gap-2 mt-3 md:mt-5">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`flex w-6 md:w-8 shrink-0 h-1 md:h-1.5 ${index === currentSlide ? "bg-[#0A2540]" : "bg-[#9DA8B3]"} rounded-[30px]`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button className="absolute z-0 right-4 top-4 md:right-6 md:top-6" aria-label="Expand">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/89ab26bb4b3b1c7c9b25fd3aecd12658e799b940?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[26px] md:w-[32px] h-[26px] md:h-[32px]"
            alt="Expand icon"
          />
        </button>
      </div>
    </section>
  );
};
