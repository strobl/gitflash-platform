
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const AusgabenPage: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="w-full p-6">
        <h2 className="text-xl font-semibold text-gitflash-primary mb-6">Ausgaben Übersicht</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Aktuelle Periode</h3>
            <p className="text-2xl font-bold">€2,450.00</p>
            <p className="text-sm text-gray-500 mt-1">1. Mai - 31. Mai 2025</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Jahresbudget</h3>
            <p className="text-2xl font-bold">€24,000.00</p>
            <p className="text-sm text-gray-500 mt-1">Verbleibend: €14,350.00</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Ausgabenübersicht</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Datum</th>
                  <th className="px-4 py-3 text-left">Beschreibung</th>
                  <th className="px-4 py-3 text-right">Betrag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">10.05.2025</td>
                  <td className="px-4 py-3">Premium Jobanzeige</td>
                  <td className="px-4 py-3 text-right">€350.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">05.05.2025</td>
                  <td className="px-4 py-3">Talent-Suche Abonnement</td>
                  <td className="px-4 py-3 text-right">€1,200.00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">01.05.2025</td>
                  <td className="px-4 py-3">Jobinserat "Bauleiter"</td>
                  <td className="px-4 py-3 text-right">€900.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {isMobile && (
        <div className="bg-white border-t border-gray-200 p-4 text-center text-xs text-gray-500">
          Ausgaben Dashboard • GitFlash © 2025
        </div>
      )}
    </div>
  );
};
