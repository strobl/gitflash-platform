
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { X, Menu } from "lucide-react";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex w-full items-center justify-between bg-white px-4 sm:px-6 md:px-8 py-2.5">
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
          <Link to="/interviewsdesign" className="text-[#0A2540] font-medium hover:text-gray-600 link-underline">Interviews</Link>
          <Link to="/jobs" className="text-[#0A2540] font-medium hover:text-gray-600 link-underline">Jobs</Link>
          <Link to="/employers" className="text-[#0A2540] font-medium hover:text-gray-600 link-underline">Für Arbeitgeber</Link>
          <Link to="/interviews/explore">
            <button className="bg-[rgba(10,37,64,1)] flex min-h-10 items-center text-sm text-white justify-center px-5 py-[11px] rounded-[100px] hover:bg-opacity-90 transition-all duration-300 hover:brightness-110 whitespace-nowrap ml-4">
              Leistungsträger finden
            </button>
          </Link>
        </div>
      )}

      <button onClick={toggleMenu} className="md:hidden" aria-label="Menu">
        {menuOpen ? (
          <X className="h-6 w-6 text-[#0A2540]" />
        ) : (
          <Menu className="h-6 w-6 text-[#0A2540]" />
        )}
      </button>

      {menuOpen && isMobile && (
        <div className="absolute top-[48px] left-0 right-0 bg-white z-50 shadow-lg animate-fade-in">
          <div className="flex flex-col p-4">
            <Link to="/interviewsdesign" className="py-3 text-[#0A2540] font-medium border-b border-gray-100 link-underline">Interviews</Link>
            <Link to="/jobs" className="py-3 text-[#0A2540] font-medium border-b border-gray-100 link-underline">Jobs</Link>
            <Link to="/employers" className="py-3 text-[#0A2540] font-medium link-underline">Für Arbeitgeber</Link>
          </div>
        </div>
      )}
    </header>
  );
};
