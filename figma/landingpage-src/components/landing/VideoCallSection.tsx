
import React from "react";

export const VideoCallSection: React.FC = () => {
  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-12 py-8 md:py-16">
      <div className="flex w-full flex-col items-stretch text-center max-w-3xl mx-auto">
        <div className="flex max-w-full mx-auto flex-col font-bold">
          <span className="text-[#3B5166] text-[10px] md:text-xs">
            Ein völlig neuer Weg zum Job
          </span>
          <h2 className="text-[#0A2540] text-2xl md:text-3xl lg:text-4xl mt-1">
            Erst der Video-Call mit unserer KI. Dann passende Job-Angebote.
          </h2>
        </div>
        <p className="text-[#546679] text-sm md:text-base font-normal leading-[21px] mt-3 md:mt-5">
          Starten Sie direkt mit einem persönlichen Video-Call. GitFlash fndet
          heraus, welche Jobs perfekt zu Ihnen passen.
        </p>
      </div>
      <div className="relative w-full overflow-hidden mt-6 md:mt-10 rounded-xl max-w-3xl mx-auto">
        <div className="relative z-0 flex w-full flex-col items-stretch font-medium text-right">
          <img
            src="https://gehhxwqlhzsesxzqleks.supabase.co/storage/v1/object/public/gitflash//bild13.png"
            className="aspect-[1.44] object-contain w-full z-0"
            alt="Video call interface"
          />
          <div className="absolute z-0 flex flex-col items-center -translate-x-2/4 translate-y-[0%] left-2/4 bottom-[11px] md:bottom-[20px]">
            <div className="self-stretch gap-2 text-[8px] md:text-xs text-[rgba(10,37,64,1)] px-2 py-1.5 rounded-[30px]">
              Was erwartest du von deinem neuen Job?
            </div>
            <div className="text-[#0A2540] self-stretch gap-2 text-[10px] md:text-xs bg-[#F5F6F7] mt-2 px-2 py-1.5 rounded-[30px]">
              Klasse, ich freue mich auf unser Gespräch!
            </div>
          </div>
        </div>
        <div className="text-white text-xs md:text-sm font-semibold absolute z-0 w-auto h-auto px-2 py-1 bg-[#0A2540] rounded-md left-2.5 top-2.5 md:left-4 md:top-4">
          GitFlash KI
        </div>
      </div>
      <div className="flex w-full flex-col md:flex-row items-center md:justify-center gap-4 text-sm font-medium text-right mt-6 md:mt-10">
        <button className="bg-[rgba(10,37,64,1)] flex min-h-9 flex-col overflow-hidden items-center text-white justify-center px-[25px] py-[9px] rounded-[100px] hover:bg-opacity-90 transition-colors">
          <div className="flex gap-[5px]">
            <span className="text-white">Video-Call starten</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3f83e8faff380686bf09b0d48284c8ae16c6a06?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-[18px] shrink-0"
              alt="Arrow right"
            />
          </div>
        </button>
        <button className="flex gap-[5px] text-[#546679] justify-center mt-3 md:mt-0 hover:text-opacity-80 transition-colors">
          <span className="text-[#546679]">Alle Interviews ansehen</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ceded77676628b362990e5e8bb2219515f969803?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[18px] shrink-0"
            alt="Arrow right"
          />
        </button>
      </div>
    </section>
  );
};
