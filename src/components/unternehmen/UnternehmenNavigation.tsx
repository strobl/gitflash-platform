
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Search, 
  FileText,
} from 'lucide-react';

export function UnternehmenNavigation() {
  const isMobile = useIsMobile();
  const [activeItem, setActiveItem] = useState('jobs');

  const handleItemClick = (id: string) => {
    setActiveItem(id);
  };

  const navigationItems = [
    { id: 'jobs', label: 'Jobs', icon: <Briefcase className="h-5 w-5" />, path: '/unternehmen' },
    { id: 'team', label: 'Team', icon: <Users className="h-5 w-5" />, path: '/unternehmen/team' },
    { id: 'suche', label: 'Talentsuche', icon: <Search className="h-5 w-5" />, path: '/unternehmen/suche' },
    { id: 'ausgaben', label: 'Ausgaben', icon: <FileText className="h-5 w-5" />, path: '/unternehmen/ausgaben' },
  ];

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around items-center h-16">
          {navigationItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => 
                `flex flex-col items-center justify-center py-2 px-3 ${
                  isActive ? 'text-gitflash-primary' : 'text-gray-500'
                }`
              }
              onClick={() => handleItemClick(item.id)}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex w-64 flex-shrink-0 flex-col bg-white border-r border-gray-200">
      <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h2 className="text-lg font-semibold text-gitflash-primary">Unternehmen Dashboard</h2>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gitflash-primary/10 text-gitflash-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </NavLink>
          ))}
          <div className="pt-4">
            <NavLink
              to="/unternehmen/jobs/neu"
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gitflash-primary/10 text-gitflash-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              <span>Job erstellen</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
