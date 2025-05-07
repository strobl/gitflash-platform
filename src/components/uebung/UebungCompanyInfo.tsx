
import React from "react";

export const UebungCompanyInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="rounded-lg bg-gray-100 p-3 flex-shrink-0">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/6f7d6f66e948d8553b46b9d5fbb78f5e076dcab1" 
            alt="Company logo" 
            className="h-12 w-12 object-contain" 
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gitflash-primary">
            Erstellt von GitFlash GmbH
          </h3>
          <p className="text-gray-600 mt-1">
            GitFlash ist ein führender Anbieter von KI-gestützten Interview-Lösungen für die Baubranche.
            Unsere Interviews werden von Experten konzipiert, um reale Situationen abzubilden.
          </p>
        </div>
      </div>
    </div>
  );
};
