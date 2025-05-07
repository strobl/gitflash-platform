
import React from "react";
import { Home, FileText, Video, Lock, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const DesktopSidebar: React.FC = () => {
  const navItems = [
    { icon: Home, label: "Startseite", active: true },
    { icon: FileText, label: "Lebenslauf", active: false },
    { icon: Video, label: "Interview", active: false },
    { icon: Lock, label: "Zahlungen", active: false },
    { icon: Search, label: "Erkunden", active: false },
  ];

  return (
    <aside className="hidden md:block fixed left-0 top-0 h-full bg-[#1A1F2C] text-white w-16 lg:w-64 z-40 shadow-lg">
      <div className="h-full flex flex-col py-6">
        <div className="px-4 mb-8 hidden lg:block">
          <h1 className="text-xl font-bold">JobConnect</h1>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2 px-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  className={cn(
                    "w-full flex items-center px-3 py-3 rounded-md transition-colors",
                    item.active 
                      ? "bg-white/10 text-white" 
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5",
                    "lg:mr-3"
                  )} />
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
