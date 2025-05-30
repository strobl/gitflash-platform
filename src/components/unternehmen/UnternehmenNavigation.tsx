
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Briefcase, 
  Users, 
  MessageSquare, 
  CreditCard, 
  Settings 
} from 'lucide-react';

const navItems = [
  { href: '/unternehmen', label: 'Dashboard', icon: Home },
  { href: '/unternehmen/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/unternehmen/bewerbungen', label: 'Bewerbungen', icon: Users },
  { href: '/unternehmen/interviews', label: 'Interviews', icon: MessageSquare },
  { href: '/unternehmen/zahlungen', label: 'Zahlungen', icon: CreditCard },
  { href: '/unternehmen/team', label: 'Team', icon: Settings },
];

export const UnternehmenNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-gitflash-primary/10 text-gitflash-primary" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
