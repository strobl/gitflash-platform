
import React from "react";
import { SharedNavbar } from "@/components/navigation/SharedNavbar";
import { UebungContent } from "@/components/uebung/UebungContent";

const Uebung: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SharedNavbar />
      <div className="flex-grow p-4">
        <UebungContent />
      </div>
    </div>
  );
};

export default Uebung;
