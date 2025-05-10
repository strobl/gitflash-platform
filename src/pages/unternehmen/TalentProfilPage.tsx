
import React from "react";
import { useParams } from "react-router-dom";

export default function TalentProfilPage() {
  const { id } = useParams<{ id: string }>();
  
  // Hier würde später die TalentProfileView-Komponente aus figma/company-profilecv-src eingebunden
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Talent Profil</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500 py-12">
          Hier wird das Profil des Talents mit ID: {id} angezeigt.
          <br />
          In den nächsten Schritten werden wir die Komponenten aus figma/company-profilecv-src integrieren.
        </p>
      </div>
    </div>
  );
}
