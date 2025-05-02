
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Building, User, LogOut } from 'lucide-react';

export function Navbar() {
  const { user, profile, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-gitflash-primary flex items-center gap-2">
          <span className="bg-gitflash-primary text-white p-1 rounded">GF</span>
          GitFlash
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-gitflash-primary transition-colors">
            Startseite
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="text-foreground hover:text-gitflash-primary transition-colors">
                Dashboard
              </Link>
              {profile?.role === 'user' && (
                <Link to="/profile" className="text-foreground hover:text-gitflash-primary transition-colors">
                  Mein Profil
                </Link>
              )}
              {profile?.role === 'business' && (
                <>
                  <Link to="/talents" className="text-foreground hover:text-gitflash-primary transition-colors">
                    Talente finden
                  </Link>
                  <Link to="/interviews" className="text-foreground hover:text-gitflash-primary transition-colors">
                    Interviews
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    {profile?.role === 'user' ? (
                      <User size={18} />
                    ) : (
                      <Building size={18} />
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {profile?.name || 'Mein Konto'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                {profile?.role === 'user' && (
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profil bearbeiten</Link>
                  </DropdownMenuItem>
                )}
                {profile?.role === 'business' && (
                  <DropdownMenuItem asChild>
                    <Link to="/interviews" className="cursor-pointer">Interviews verwalten</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Abmelden</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="bg-gitflash-primary hover:bg-gitflash-secondary">
              <Link to="/login">Anmelden</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
