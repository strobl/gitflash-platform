
import React from "react";
import { Header } from "@/components/landing/Header";
import { UebungContent } from "@/components/uebung/UebungContent";

const Uebung: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-grow">
        <UebungContent />
      </div>
    </div>
  );
};

export default Uebung;
