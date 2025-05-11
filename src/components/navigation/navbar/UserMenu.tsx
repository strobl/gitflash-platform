
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const UserMenu = () => {
  const { user, profile, logout } = useAuth();

  const getInitials = () => {
    if (!profile?.name) return 'U';
    return profile.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-gitflash-primary text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        <DropdownMenuLabel>
          {profile?.name || 'Mein Konto'}
          {profile?.role === 'operator' && (
            <span className="ml-2 text-xs bg-gitflash-primary text-white px-2 py-0.5 rounded-full">
              Admin
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Show appropriate dashboard link based on user role */}
        {profile?.role !== 'user' && (
          <DropdownMenuItem asChild>
            <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
          </DropdownMenuItem>
        )}
        
        {/* Always show Talent area for all users */}
        <DropdownMenuItem asChild>
          <Link to="/talent" className="cursor-pointer">Talentbereich</Link>
        </DropdownMenuItem>
        
        {/* Business area only for business and operator roles */}
        {(profile?.role === 'business' || profile?.role === 'operator') && (
          <DropdownMenuItem asChild>
            <Link to="/unternehmen/suche" className="cursor-pointer">Unternehmensbereich</Link>
          </DropdownMenuItem>
        )}
        
        {/* Profile edit link */}
        {profile?.role === 'user' && (
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer">Profil bearbeiten</Link>
          </DropdownMenuItem>
        )}
        
        {/* Admin features for business users and operators */}
        {(profile?.role === 'business' || profile?.role === 'operator') && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/interviews/create" className="cursor-pointer">Interview erstellen</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/unternehmen/jobs/neu" className="cursor-pointer">Job erstellen</Link>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Abmelden</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
