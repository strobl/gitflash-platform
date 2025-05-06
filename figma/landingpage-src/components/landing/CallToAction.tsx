
import React from "react";
import { Link } from "react-router-dom";

export const CallToAction: React.FC = () => {
  return (
    <section className="bg-[rgba(242,244,246,1)] w-full px-4 sm:px-6 md:px-12 py-8 md:py-16">
      <div className="flex w-full flex-col text-center max-w-3xl mx-auto">
        <h2 className="text-[#0A2540] text-2xl md:text-3xl lg:text-4xl font-bold">
          Bereit loszulegen?
        </h2>
        <p className="text-[#546679] text-xs md:text-sm font-normal leading-[18px] md:leading-[21px] mt-3 md:mt-5">
          Erstellen Sie in wenigen Sekunden einen Account – um sich direkt zu
          bewerben oder passendes Personal für Ihr Unternehmen zu fnden.
        </p>
      </div>
      <div className="flex w-full flex-col md:flex-row items-center md:justify-center gap-4 text-sm md:text-base font-medium text-right justify-center mt-6 md:mt-10">
        <button className="justify-center items-center flex min-h-9 md:min-h-10 flex-col overflow-hidden text-white bg-[#0A2540] px-[25px] md:px-8 py-[9px] md:py-3 rounded-[100px] hover:bg-opacity-90 transition-colors">
          <div className="flex gap-[5px]">
            <span className="text-white">Jetzt bewerben</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5dc3bba80a8224444a7c8680e2731c12f91a0aa0?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-[18px] shrink-0"
              alt="Arrow right"
            />
          </div>
        </button>
        <Link
          to="/employers"
          className="flex gap-[5px] text-[#546679] justify-center mt-3 md:mt-0 hover:text-opacity-80 transition-colors"
        >
          <span className="text-[#546679]">Personal fnden</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ef6fa1c74be053dc63912669d1e69a16eac30a2?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[18px] shrink-0"
            alt="Arrow right"
          />
        </Link>
      </div>
    </section>
  );
};
