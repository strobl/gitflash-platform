
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { X, Menu, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const UnifiedNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { user, profile, logout, isAuthenticated } = useAuth();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const getInitials = () => {
    if (!profile?.name) return "U";
    return profile.name.split(" ").map(n => n[0]).join("").toUpperCase();
  };
  
  const isInterviewsActive = location.pathname.includes("/interviews");
  
  // Navigation items based on authentication and role
  const getNavigationItems = () => {
    const publicItems = [
      { label: "KI Interviews", path: "/interviews", isActive: isInterviewsActive },
      { label: "Jobs", path: "/jobs", isActive: false },
      { label: "Für Unternehmen", path: "/unternehmen/suche", isActive: false }
    ];
    
    if (!isAuthenticated) {
      return publicItems;
    }
    
    // Authenticated navigation based on role
    switch (profile?.role) {
      case 'user': // Talent
        return [
          { label: "Startseite", path: "/talent/startseite", isActive: location.pathname === "/talent/startseite" },
          { label: "Erkunden", path: "/talent/erkunden", isActive: location.pathname === "/talent/erkunden" },
          { label: "Interviews", path: "/talent/interviews", isActive: location.pathname === "/talent/interviews" },
          { label: "Bewerbungen", path: "/talent/applications", isActive: location.pathname === "/talent/applications" }
        ];
      case 'business': // Unternehmen
        return [
          { label: "Dashboard", path: "/unternehmen", isActive: location.pathname === "/unternehmen" },
          { label: "Suche", path: "/unternehmen/suche", isActive: location.pathname === "/unternehmen/suche" },
          { label: "Team", path: "/unternehmen/team", isActive: location.pathname === "/unternehmen/team" },
          { label: "Ausgaben", path: "/unternehmen/ausgaben", isActive: location.pathname === "/unternehmen/ausgaben" }
        ];
      case 'operator': // Admin
        return [
          { label: "Admin", path: "/admin", isActive: location.pathname === "/admin" },
          { label: "Profile", path: "/admin/profiles", isActive: location.pathname === "/admin/profiles" }
        ];
      default:
        return publicItems;
    }
  };
  
  const navigationItems = getNavigationItems();
  
  return (
    <header className="flex w-full items-center justify-between bg-white sm:px-6 md:px-8 py-2.5 px-[12px] border-b border-gray-200">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img 
            src="https://gehhxwqlhzsesxzqleks.supabase.co/storage/v1/object/public/gitflash//LogoGF.svg" 
            className="h-5 md:h-6 w-auto object-contain" 
            alt="GitFlash logo" 
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`text-sm ${item.isActive ? "text-gitflash-primary font-medium" : "text-[#0A2540]"} hover:text-opacity-90`}
            >
              {item.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative h-10 w-10 rounded-full overflow-hidden focus:outline-none">
                    <Avatar>
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-[#0A2540] text-white">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  <DropdownMenuLabel>
                    {profile?.name || "Mein Konto"}
                    {profile?.role === "operator" && (
                      <span className="ml-2 text-xs bg-[#0A2540] text-white px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {profile?.role === "user" && (
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer w-full">Profil bearbeiten</Link>
                    </DropdownMenuItem>
                  )}
                  
                  {(profile?.role === "business" || profile?.role === "operator") && (
                    <DropdownMenuItem asChild>
                      <Link to="/interviews/create" className="cursor-pointer w-full">Interview erstellen</Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Abmelden</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button asChild className="bg-[#0A2540] hover:bg-opacity-90 transition-all duration-300 hover:brightness-105 text-white">
              <Link to="/login">Log In</Link>
            </Button>
          )}
        </div>
      )}

      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} className="md:hidden" aria-label="Menu">
        {menuOpen ? <X className="h-6 w-6 text-[#0A2540]" /> : <Menu className="h-6 w-6 text-[#0A2540]" />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && isMobile && (
        <div className="absolute top-[48px] left-0 right-0 bg-white z-50 shadow-lg animate-fade-in">
          <div className="flex flex-col p-4">
            {navigationItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`py-3 text-sm font-medium border-b border-gray-100 ${item.isActive ? "text-gitflash-primary" : "text-[#0A2540]"} hover:text-opacity-90`} 
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <button 
                onClick={() => { logout(); setMenuOpen(false); }}
                className="py-3 text-sm text-red-500 font-medium hover:text-opacity-90 text-left"
              >
                Abmelden
              </button>
            ) : (
              <Link 
                to="/login" 
                className="py-3 text-sm text-[#0A2540] font-medium hover:text-opacity-90" 
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
