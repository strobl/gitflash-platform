import React, { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "most-hired", label: "Am häufgsten eingstellt" },
  { id: "newest", label: "Neueste Jobs" },
  { id: "highest-salary", label: "Höchstes Gehalt" },
];

const JobTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("most-hired");

  return (
    <div className="flex w-full items-center text-[10px] text-[#546679] font-medium leading-[1.4] justify-center mt-3 px-4">
      {tabs.map((tab, index) => {
        const isFirst = index === 0;
        const isLast = index === tabs.length - 1;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "self-stretch border-b border-solid bg-white my-auto px-[5px] py-2.5",
              isFirst && "rounded-[8px_0px_0px_8px]",
              isLast && "rounded-[0px_8px_8px_0px]",
              isActive
                ? "text-[#0A2540] border-b-[color:var(--dark-dark\_1,#0A2540)]"
                : "text-[#546679] border-b-[color:var(--dark-dark\_6,#E7E9EC)]",
              isFirst && isActive && "w-[124px]"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default JobTabs;
