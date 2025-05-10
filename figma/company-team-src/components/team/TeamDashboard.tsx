
import React, { useState } from "react";
import { TeamHeader } from "./TeamHeader";
import { TeamSearch } from "./TeamSearch";
import { EmptyTeamState } from "./EmptyTeamState";
import { BottomNavigation } from "./BottomNavigation";

interface TeamDashboardProps {
  className?: string;
}

export function TeamDashboard({ className = "" }: TeamDashboardProps) {
  const [activeNavItem, setActiveNavItem] = useState("team");
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavItemClick = (id: string) => {
    setActiveNavItem(id);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handleCreateTeam = () => {
    console.log("Creating team...");
  };

  return (
    <div className={`flex flex-col bg-white relative h-full ${className}`}>
      <div className="flex-1 overflow-auto">
        <TeamHeader />
        <TeamSearch onSearch={handleSearch} />
        <div className="flex-grow min-h-[calc(100vh-200px)] flex items-center justify-center">
          <EmptyTeamState onCreateTeam={handleCreateTeam} className="w-full" />
        </div>
      </div>
      <div className="sticky bottom-0 w-full">
        <BottomNavigation 
          activeItem={activeNavItem} 
          onItemClick={handleNavItemClick} 
        />
      </div>
    </div>
  );
}
