
import React from "react";
import { Home, FileText, Video, Lock, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNav: React.FC = () => {
  const navItems = [
    { icon: Home, label: "Startseite", active: true },
    { icon: FileText, label: "Lebenslauf", active: false },
    { icon: Video, label: "Interview", active: false },
    { icon: Lock, label: "Zahlungen", active: false },
    { icon: Search, label: "Erkunden", active: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-between items-center px-4 py-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center w-16"
          >
            <item.icon
              className={cn(
                "w-6 h-6 mb-1",
                item.active ? "text-[#0A2540]" : "text-[#546679]"
              )}
            />
            <span
              className={cn(
                "text-[10px]",
                item.active ? "text-[#0A2540] font-medium" : "text-[#546679]"
              )}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
