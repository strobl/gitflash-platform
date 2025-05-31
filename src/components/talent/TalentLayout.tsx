
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, User, Search, Briefcase, CreditCard, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface TalentLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

export const TalentLayout: React.FC<TalentLayoutProps> = ({ children, activeTab }) => {
  const location = useLocation();
  const { signOut } = useAuth();

  const tabs = [
    { id: 'startseite', label: 'Startseite', path: '/talent/startseite', icon: Home },
    { id: 'profil', label: 'Profil', path: '/talent/profil', icon: User },
    { id: 'erkunden', label: 'Erkunden', path: '/talent/erkunden', icon: Search },
    { id: 'applications', label: 'Bewerbungen', path: '/talent/applications', icon: Briefcase },
    { id: 'interviews', label: 'Interviews', path: '/talent/interviews', icon: Briefcase },
    { id: 'zahlungen', label: 'Zahlungen', path: '/talent/zahlungen', icon: CreditCard },
  ];

  const currentTab = activeTab || tabs.find(tab => location.pathname === tab.path)?.id || 'startseite';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/talent/startseite" className="text-xl font-bold text-gitflash-primary">
                GitFlash
              </Link>
            </div>
            <Button variant="ghost" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={cn(
                    "flex items-center px-3 py-4 text-sm font-medium border-b-2 whitespace-nowrap",
                    isActive
                      ? "text-gitflash-primary border-gitflash-primary"
                      : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};
