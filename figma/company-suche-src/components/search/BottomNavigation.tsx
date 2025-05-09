
import React from "react";
import { Search, Briefcase, FileText, Users, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface BottomNavigationProps {
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ className }) => {
  const navItems: NavItem[] = [
    {
      icon: <Search className="w-5 h-5" />,
      label: "Suchen",
      active: true,
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      label: "Jobanzeigen",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Bewerten",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Team",
    },
    {
      icon: <Wallet className="w-5 h-5" />,
      label: "Ausgaben",
    },
  ];

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-10",
      className
    )}>
      <div className="container mx-auto max-w-lg">
        <div className="flex justify-between items-center px-4 py-2">
          {navItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={cn(
                "flex flex-col items-center px-2 py-1 text-gray-600",
                item.active && "text-[#0A2540] border-t-2 border-[#0A2540]"
              )}
            >
              <div className={cn(
                "mb-1",
                item.active ? "text-[#0A2540]" : "text-[#6C7C8C]"
              )}>
                {item.icon}
              </div>
              <span className={cn(
                "text-xs",
                item.active ? "text-[#0A2540] font-medium" : "text-[#6C7C8C]"
              )}>
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
