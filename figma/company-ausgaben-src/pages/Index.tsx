
import React from "react";
import { AusgabenPage } from "@/components/ausgaben/AusgabenPage";

const Index: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 md:p-8">
      <AusgabenPage />
    </main>
  );
};

export default Index;
