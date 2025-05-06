import React from "react";
import { Link } from "react-router-dom";
export const Hero: React.FC = () => {
  return <section className="w-full max-w-lg px-4 sm:px-6 md:px-0 mt-10 md:mt-16 md:max-w-3xl mx-auto text-center">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-col">
          <h1 className="text-[#0A2540] text-3xl md:text-4xl lg:text-5xl font-bold">GitFlash verbindet Sie mit erstklassigen Karrierechancen.</h1>
          <p className="text-[#546679] text-sm md:text-base font-normal leading-[21px] mt-2.5 md:mt-4">Schließen Sie sich tausenden Leistungsträgern an, die mit nur einer einzigen Bewerbung Anfragen von Unternehmen erhalten.</p>
        </div>
        <div className="w-auto font-medium mt-5 md:mt-8">
          <button className="bg-[rgba(10,37,64,1)] flex min-h-10 w-full flex-col overflow-hidden items-center text-sm text-white justify-center px-5 py-[11px] rounded-[100px] hover:bg-opacity-90 transition-colors whitespace-nowrap">
            <div className="flex gap-[5px]">
              <span className="text-white">Jetzt bewerben</span>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3f83e8faff380686bf09b0d48284c8ae16c6a06?placeholderIfAbsent=true" className="aspect-[1] object-contain w-[18px] shrink-0" alt="Arrow right" />
            </div>
          </button>
          <Link to="/employers" className="flex items-center gap-[5px] text-xs text-[#546679] justify-center mt-3 hover:text-opacity-80 transition-colors">
            <span className="text-[#546679] self-stretch my-auto">Leistungsträger finden</span>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/98a264c6e0855df4bfe9b7f203c4ab03932fb830?placeholderIfAbsent=true" className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto" alt="Arrow right" />
          </Link>
        </div>
      </div>
    </section>;
};