
import React from "react";
import { Home, FileText, Video, Lock, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

// Define our navigation items
const navItems = [
  { icon: Home, label: "Startseite", value: "startseite" },
  { icon: Video, label: "Interview", value: "interview" },
  { icon: Search, label: "Erkunden", value: "erkunden" },
];

interface TalentNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TalentNavigation: React.FC<TalentNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const isMobile = useIsMobile();
  
  return isMobile ? (
    <MobileNavigation activeTab={activeTab} onTabChange={onTabChange} />
  ) : (
    <DesktopNavigation activeTab={activeTab} onTabChange={onTabChange} />
  );
};

// Mobile bottom navigation
const MobileNavigation: React.FC<TalentNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-between items-center px-4 py-2">
        {navItems.map((item) => (
          <button
            key={item.value}
            className="flex flex-col items-center justify-center w-16"
            onClick={() => onTabChange(item.value)}
          >
            <item.icon
              className={cn(
                "w-6 h-6 mb-1",
                activeTab === item.value ? "text-[#0A2540]" : "text-[#546679]"
              )}
            />
            <span
              className={cn(
                "text-[10px]",
                activeTab === item.value ? "text-[#0A2540] font-medium" : "text-[#546679]"
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

// Desktop sidebar navigation
const DesktopNavigation: React.FC<TalentNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <aside className="fixed left-0 top-0 h-full bg-[#1A1F2C] text-white w-16 lg:w-64 z-40 shadow-lg">
      <div className="h-full flex flex-col py-6 mt-16"> {/* Added mt-16 to account for navbar */}
        <div className="px-4 mb-8 hidden lg:block">
          <h1 className="text-xl font-bold">GitFlash</h1>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.value}>
                <button
                  className={cn(
                    "w-full flex items-center px-3 py-3 rounded-md transition-colors",
                    activeTab === item.value 
                      ? "bg-white/10 text-white" 
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  )}
                  onClick={() => onTabChange(item.value)}
                >
                  <item.icon className="w-5 h-5 lg:mr-3" />
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
