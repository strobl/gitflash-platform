
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
    <header className="border-b-[color:var(--dark-dark\_6,#E7E9EC)] flex w-full items-stretch overflow-hidden justify-between bg-white px-4 sm:px-6 md:px-8 py-2.5 border-b border-solid">
      <div className="flex items-center gap-2">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5af3f7745261372360eae5405e1f9acfab465e53?placeholderIfAbsent=true"
          className="aspect-[11/14] object-contain w-[11px] md:w-[16px] fill-[#0A2540] self-stretch shrink-0 my-auto"
          alt="GitFlash logo icon"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f7d6f66e948d8553b46b9d5fbb78f5e076dcab1?placeholderIfAbsent=true"
          className="aspect-[5.08] object-contain w-[61px] md:w-[80px] fill-[#0A2540] self-stretch shrink-0 my-auto"
          alt="GitFlash logo text"
        />
      </div>

      {!isMobile && (
        <div className="hidden md:flex items-center gap-6">
          <Link to="/jobs" className="text-[#0A2540] font-medium hover:text-gray-600">Jobs</Link>
          <Link to="/employers" className="text-[#0A2540] font-medium hover:text-gray-600">Arbeitgeber</Link>
          <Link to="/about" className="text-[#0A2540] font-medium hover:text-gray-600">Über uns</Link>
          <Link to="/auth" className="text-[#0A2540] font-medium hover:text-gray-600 ml-4">Login</Link>
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
            <Link to="/jobs" className="py-3 text-[#0A2540] font-medium border-b border-gray-100">Jobs</Link>
            <Link to="/employers" className="py-3 text-[#0A2540] font-medium border-b border-gray-100">Arbeitgeber</Link>
            <Link to="/about" className="py-3 text-[#0A2540] font-medium border-b border-gray-100">Über uns</Link>
            <Link to="/auth" className="py-3 text-[#0A2540] font-medium">Login</Link>
          </div>
        </div>
      )}
    </header>
  );
};
