
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Building2, 
  Users, 
  FileText, 
  Search, 
  BarChart3,
  PlusCircle
} from "lucide-react";

export function UnternehmenSidebar() {
  const isMobile = useIsMobile();
  
  const navItems = [
    { 
      name: "Jobs", 
      path: "/unternehmen/jobs", 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: "Team", 
      path: "/unternehmen/team", 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: "Suche", 
      path: "/unternehmen/suche", 
      icon: <Search className="h-5 w-5" /> 
    },
    { 
      name: "Ausgaben", 
      path: "/unternehmen/ausgaben", 
      icon: <BarChart3 className="h-5 w-5" /> 
    }
  ];

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center px-2 py-1 text-xs rounded-md",
                  isActive
                    ? "text-gitflash-primary font-medium"
                    : "text-gray-500 hover:text-gitflash-primary"
                )
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shrink-0 hidden md:block">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Building2 className="h-6 w-6 text-gitflash-primary" />
          <h1 className="font-medium text-xl">Unternehmen</h1>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-md transition-colors",
                  isActive
                    ? "bg-gitflash-primary text-white font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                )
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
          
          <NavLink
            to="/unternehmen/jobs/neu"
            className="flex items-center space-x-3 px-4 py-3 mt-6 rounded-md text-white bg-gradient-to-r from-gitflash-primary to-purple-500 hover:from-gitflash-primary/90 hover:to-purple-500/90 transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Neuer Job</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
