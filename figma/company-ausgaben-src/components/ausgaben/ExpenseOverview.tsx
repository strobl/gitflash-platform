
import React, { useState } from "react";
import { ExpenseChart } from "./ExpenseChart";
import { HoursChart } from "./HoursChart";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ExpenseRecord {
  name: string;
  role: string;
  project: string;
  date: string;
  hours: string;
  rate: string;
}

export const ExpenseOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'charts' | 'table'>('charts');
  const isMobile = useIsMobile();
  
  const expenseData: ExpenseRecord[] = [
    {
      name: "Lisa Meier",
      role: "Sitz Berater",
      project: "Neubau Projekt A",
      date: "2025-04-01",
      hours: "3.2",
      rate: "200 €/Std"
    },
    {
      name: "Ahmad Yilmaz",
      role: "Bauzeichner",
      project: "Neubau",
      date: "2025-03-02",
      hours: "7.5",
      rate: "200 €/Std"
    },
    {
      name: "Jonas Roth",
      role: "Kostenplaner",
      project: "TGA Konzept Nord",
      date: "2025-03-02",
      hours: "2.4",
      rate: "150 €/Std"
    },
    {
      name: "Sophie Wagner",
      role: "Bauherr",
      project: "Sanierung Lagerhall",
      date: "2025-03-02",
      hours: "2.1",
      rate: "120 €/Std"
    },
    {
      name: "Tobias König",
      role: "Projektleiter",
      project: "BIM Einführung",
      date: "2025-04-01",
      hours: "5.0",
      rate: "180 €/Std"
    }
  ];
  
  return (
    <div className="w-full bg-white px-4 py-8 md:px-8">
      <div className="flex w-full flex-col items-stretch justify-center">
        <div className="flex w-full gap-[26px] text-[#0A2540] whitespace-nowrap justify-between">
          <div>
            <h1 className="text-[#0A2540] text-base md:text-xl font-bold">
              Ausgaben
            </h1>
            <p className="text-[#6C7C8C] text-xs md:text-sm font-medium mt-2">
              Diese Seite zeigt Ihnen eine Übersicht über die Ausgaben Ihres Teams
            </p>
          </div>
          <button className="justify-center items-center border border-[color:var(--dark-dark\_1,#0A2540)] flex min-h-6 md:min-h-8 flex-col overflow-hidden text-xs md:text-sm font-medium text-right px-[15px] py-1 md:px-5 md:py-2 rounded-[100px] border-solid hover:bg-[#f5f5f5] transition-colors">
            <div className="flex gap-[5px]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/04fee7ffcbf18f4be9e97d72b984d948a14a0524?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-4 md:w-5 shrink-0"
                alt="Payment info"
              />
              <div className="text-[#0A2540]">
                Zahlungsinformationen
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="w-full text-xs md:text-sm font-medium text-right mt-6 md:mt-8">
        <div className="flex w-full gap-1.5 md:gap-2 whitespace-nowrap">
          <button 
            className={`flex flex-col overflow-hidden items-center justify-center flex-1 shrink basis-[0%] px-[15px] py-[7px] md:px-5 md:py-2 rounded-[100px] ${activeTab === 'charts' ? 'bg-[rgba(10,37,64,1)] text-white' : 'bg-[#E7E9EC] text-[#0A2540] hover:bg-[#D8DDE3] transition-colors'}`}
            onClick={() => setActiveTab('charts')}
          >
            <div className="gap-[5px]">
              Diagramme
            </div>
          </button>
          <button 
            className={`justify-center items-center flex flex-col overflow-hidden flex-1 shrink basis-[0%] px-[15px] py-[7px] md:px-5 md:py-2 rounded-[100px] ${activeTab === 'table' ? 'bg-[rgba(10,37,64,1)] text-white' : 'bg-[#E7E9EC] text-[#0A2540] hover:bg-[#D8DDE3] transition-colors'}`}
            onClick={() => setActiveTab('table')}
          >
            <div className="gap-[5px]">
              Tabellenansicht
            </div>
          </button>
        </div>
        <button className="justify-center items-center flex w-full md:max-w-[300px] md:ml-auto flex-col overflow-hidden text-[#0A2540] bg-[#E7E9EC] mt-2 px-[15px] py-[7px] md:px-5 md:py-2 rounded-[100px] hover:bg-[#D8DDE3] transition-colors">
          <div className="flex gap-[5px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/62221f4b29bcbdc6d119097e9c9e37119cd6455f?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-4 md:w-5 shrink-0"
              alt="Calendar"
            />
            <div className="text-[#0A2540]">
              Zeitraum: 1. März – 15. April
            </div>
          </div>
        </button>
      </div>
      
      {activeTab === 'charts' && (
        <div className={`${isMobile ? 'max-w-full w-80' : 'w-full'} bg-white pb-8 px-0 md:px-0 mt-4 md:mt-8 ${!isMobile ? 'flex gap-4 flex-wrap' : ''}`}>
          <ExpenseChart />
          <HoursChart />
        </div>
      )}
      
      {activeTab === 'table' && (
        <div className="w-full bg-white pb-8 mt-4 md:mt-8">
          <div className="bg-white shadow-[0px_12px_32px_rgba(0,0,0,0.08)] w-full p-3 md:p-6 rounded-xl">
            <div className="overflow-x-auto">
              <Table className="w-full min-w-[500px] text-left">
                <TableHeader>
                  <TableRow className="border-b border-[#E7E9EC]">
                    <TableHead className="p-2 text-xs md:text-sm font-bold text-[#0A2540]">
                      <div className="flex items-center gap-1">
                        Name (Rolle)
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                          <path d="m6 9 6 6 6-6"/>
                        </svg>
                      </div>
                    </TableHead>
                    <TableHead className="p-2 text-xs md:text-sm font-bold text-[#0A2540]">Projekt</TableHead>
                    <TableHead className="p-2 text-xs md:text-sm font-bold text-[#0A2540]">Datum</TableHead>
                    <TableHead className="p-2 text-xs md:text-sm font-bold text-[#0A2540]">
                      <div className="flex items-center gap-1">
                        Stunde
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                          <path d="m6 9 6 6 6-6"/>
                        </svg>
                      </div>
                    </TableHead>
                    <TableHead className="p-2 text-xs md:text-sm font-bold text-[#0A2540] text-right">
                      <div className="flex items-center justify-end gap-1">
                        Abrechnung
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                          <path d="m6 9 6 6 6-6"/>
                        </svg>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseData.map((record, index) => (
                    <TableRow key={index} className="border-b border-[#E7E9EC]">
                      <TableCell className="p-2 text-xs md:text-sm">
                        <div>
                          <div className="text-[#0A2540] font-medium">{record.name}</div>
                          <div className="text-[#6C7C8C]">{record.role}</div>
                        </div>
                      </TableCell>
                      <TableCell className="p-2 text-xs md:text-sm text-[#0A2540]">{record.project}</TableCell>
                      <TableCell className="p-2 text-xs md:text-sm text-[#6C7C8C]">
                        {new Date(record.date).toLocaleDateString('de-DE', {
                          year: '2-digit',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </TableCell>
                      <TableCell className="p-2 text-xs md:text-sm text-[#6C7C8C]">{record.hours}</TableCell>
                      <TableCell className="p-2 text-xs md:text-sm text-[#0A2540] text-right">{record.rate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
