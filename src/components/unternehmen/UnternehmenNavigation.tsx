
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();

  const isActiveNavItem = (path: string) => {
    if (path === '/unternehmen') {
      // 'Jobs' active on base and job-related pages, but not on other sections or "Job erstellen"
      return pathname.startsWith('/unternehmen') 
        && !pathname.startsWith('/unternehmen/team') 
        && !pathname.startsWith('/unternehmen/suche') 
        && !pathname.startsWith('/unternehmen/ausgaben') 
        && !pathname.startsWith('/unternehmen/jobs/neu');
    }
    return pathname.startsWith(path);
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
              className={`flex flex-col items-center justify-center py-2 px-3 ${
                isActiveNavItem(item.path) ? 'text-gitflash-primary' : 'text-gray-500'
              }`}
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
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActiveNavItem(item.path)
                  ? 'bg-gitflash-primary/10 text-gitflash-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </NavLink>
          ))}
          <div className="pt-4">
            <NavLink
              to="/unternehmen/jobs/neu"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActiveNavItem('/unternehmen/jobs/neu')
                  ? 'bg-gitflash-primary/10 text-gitflash-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
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
