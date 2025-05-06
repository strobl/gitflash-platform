import React from "react";
import { Link } from "react-router-dom";
export const Hero: React.FC = () => {
  return <section className="w-full max-w-lg px-4 sm:px-6 md:px-0 max-w-3xl mx-auto text-center">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-col">
          <h1 className="text-[#0A2540] text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">GitFlash verbindet Sie mit erstklassigen Karrierechancen.</h1>
          <p className="text-[#546679] text-sm md:text-base font-normal leading-[21px] mt-2.5 md:mt-4">Schließen Sie sich tausenden Leistungsträgern an: Ein KI-Interview genügt – und schon konkurrieren die besten Unternehmen um Sie.</p>
        </div>
        <div className="flex flex-row gap-4 justify-center mt-5 md:mt-8">
          <button className="bg-[#0A2540] flex min-h-10 items-center text-sm text-white justify-center px-5 py-[11px] rounded-[100px] hover:bg-opacity-90 transition-all duration-300 hover:brightness-105 whitespace-nowrap">
            <span className="text-white">Jetzt bewerben</span>
          </button>
          <Link to="/employers" className="flex items-center justify-center py-[11px] text-sm text-[#546679] hover:text-[#0A2540] whitespace-nowrap hero-link-underline px-0">
            <span>Leistungsträger finden</span>
          </Link>
        </div>
      </div>
    </section>;
};