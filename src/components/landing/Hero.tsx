
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const Hero: React.FC = () => {
  return <section className="w-full max-w-lg px-4 sm:px-6 md:px-0 mt-10 md:mt-16 md:max-w-3xl mx-auto text-center">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-col">
          <h1 className="text-[#0A2540] text-3xl md:text-4xl lg:text-5xl font-bold">GitFlash verbindet Sie mit erstklassigen Karrierechancen.</h1>
          <p className="text-[#546679] text-sm md:text-base font-normal leading-[21px] mt-2.5 md:mt-4">Schließen Sie sich tausenden Leistungsträgern an, die mit nur einer einzigen Bewerbung Anfragen von Unternehmen erhalten.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-5 md:mt-8">
          <button className="bg-[rgba(10,37,64,1)] flex min-h-10 items-center text-sm text-white justify-center px-5 py-[11px] rounded-[100px] hover:bg-opacity-90 transition-all duration-300 hover:brightness-110 whitespace-nowrap">
            <div className="flex gap-[5px]">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-white">Jetzt bewerben</span>
            </div>
          </button>
          <Link to="/employers" className="flex items-center justify-center px-5 py-[11px] text-sm text-[#546679] hover:text-[#0A2540] link-underline transition-all duration-300 whitespace-nowrap">
            <span>Leistungsträger finden</span>
          </Link>
        </div>
      </div>
    </section>;
};
