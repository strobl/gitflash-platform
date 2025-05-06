import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { X, Menu, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const {
    user,
    profile,
    logout,
    isAuthenticated
  } = useAuth();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const getInitials = () => {
    if (!profile?.name) return "U";
    return profile.name.split(" ").map(n => n[0]).join("").toUpperCase();
  };
  const isInterviewsActive = location.pathname.includes("/interviews") || location.pathname === "/interviewsdesign";
  return <header className="flex w-full items-center justify-between bg-white sm:px-6 md:px-8 py-2.5 px-[12px] border-b border-gray-200">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img src="https://gehhxwqlhzsesxzqleks.supabase.co/storage/v1/object/public/gitflash//LogoGF.svg" className="h-5 md:h-6 w-auto object-contain" alt="GitFlash logo" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      {!isMobile && <div className="hidden md:flex items-center gap-6">
          <Link to="/interviewsdesign" className={`text-sm ${isInterviewsActive ? "text-gitflash-primary font-medium" : "text-[#0A2540]"} hover:text-opacity-90`}>
            KI Interviews
          </Link>
          <Link to="/jobs" className="text-sm text-[#0A2540] font-medium hover:text-opacity-90">
            Jobs
          </Link>
          <Link to="/employers" className="text-sm text-[#0A2540] font-medium hover:text-opacity-90">Für Unternehmen</Link>

          {isAuthenticated ? <div className="flex items-center gap-4">
              <Link to="/interviews/explore">
                <button className="bg-white border border-[#0A2540] text-[#0A2540] flex min-h-10 items-center justify-center px-4 py-[10px] rounded-[100px] hover:bg-gray-50 transition-all duration-300 text-sm whitespace-nowrap">
                  Meine Interviews
                </button>
              </Link>
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
                    {profile?.role === "operator" && <span className="ml-2 text-xs bg-[#0A2540] text-white px-2 py-0.5 rounded-full">
                        Admin
                      </span>}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  {profile?.role === "user" && <>
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer w-full">Profil bearbeiten</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/interviews/explore" className="cursor-pointer w-full">Interviews erkunden</Link>
                      </DropdownMenuItem>
                    </>}
                  {(profile?.role === "business" || profile?.role === "operator") && <>
                      <DropdownMenuItem asChild>
                        <Link to="/interviews" className="cursor-pointer w-full">Interviews verwalten</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/interviews/create" className="cursor-pointer w-full">Interview erstellen</Link>
                      </DropdownMenuItem>
                    </>}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Abmelden</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div> : <Link to="/interviews/explore">
              <button className="bg-[#0A2540] flex min-h-10 items-center text-white justify-center px-5 py-[11px] rounded-[100px] hover:bg-opacity-90 transition-all duration-300 hover:brightness-105 text-sm whitespace-nowrap ml-4">
                Log In
              </button>
            </Link>}
        </div>}

      <button onClick={toggleMenu} className="md:hidden" aria-label="Menu">
        {menuOpen ? <X className="h-6 w-6 text-[#0A2540]" /> : <Menu className="h-6 w-6 text-[#0A2540]" />}
      </button>

      {menuOpen && isMobile && <div className="absolute top-[48px] left-0 right-0 bg-white z-50 shadow-lg animate-fade-in">
          <div className="flex flex-col p-4">
            <Link to="/interviewsdesign" className={`py-3 text-sm font-medium border-b border-gray-100 ${isInterviewsActive ? "text-gitflash-primary" : "text-[#0A2540]"} hover:text-opacity-90`} onClick={() => setMenuOpen(false)}>
              KI Interviews
            </Link>
            <Link to="/jobs" className="py-3 text-sm text-[#0A2540] font-medium border-b border-gray-100 hover:text-opacity-90" onClick={() => setMenuOpen(false)}>
              Jobs
            </Link>
            <Link to="/employers" className="py-3 text-sm text-[#0A2540] font-medium border-b border-gray-100 hover:text-opacity-90" onClick={() => setMenuOpen(false)}>
              Für Arbeitgeber
            </Link>
            {isAuthenticated && <Link to="/interviews/explore" className="py-3 text-sm text-[#0A2540] font-medium hover:text-opacity-90" onClick={() => setMenuOpen(false)}>
                Meine Interviews
              </Link>}
            {isAuthenticated && <button onClick={() => {
          logout();
          setMenuOpen(false);
        }} className="py-3 text-sm text-red-500 font-medium mt-2 text-left flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Abmelden</span>
              </button>}
          </div>
        </div>}
    </header>;
};