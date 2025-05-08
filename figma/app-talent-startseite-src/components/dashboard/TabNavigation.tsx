
import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  count: number;
}

const TabNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState("contracts");

  const tabs: Tab[] = [
    { id: "contracts", label: "Verträge", count: 0 },
    { id: "applications", label: "Bewerbungen", count: 0 },
    { id: "recommendations", label: "Empfehlungen", count: 0 },
  ];

  return (
    <nav className="flex border-b border-[#E7E9EC] mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`text-center px-4 py-2 text-sm ${
            activeTab === tab.id
              ? "text-[#0A2540] border-b-2 border-[#0A2540] font-medium"
              : "text-[#546679]"
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label} {tab.count > 0 && `(${tab.count})`}
        </button>
      ))}
    </nav>
  );
};

export default TabNavigation;
