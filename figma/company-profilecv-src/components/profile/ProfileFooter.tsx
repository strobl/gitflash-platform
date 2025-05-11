
import React from "react";
import { Link } from "react-router-dom";

interface ProfileFooterProps {
  cvUrl?: string;
}

const ProfileFooter: React.FC<ProfileFooterProps> = ({ cvUrl }) => {
  return (
    <div className="border-t-[color:var(--dark-dark_6,#E7E9EC)] flex items-center w-full justify-between bg-white px-[17px] py-3.5 border-t border-solid sticky bottom-0 z-10">
      <div className="flex items-center gap-3">
        {cvUrl ? (
          <a 
            href={cvUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="justify-center items-center flex min-h-[35px] flex-col overflow-hidden rounded-[100px] hover:bg-gitflash-primary/90 transition-colors bg-[#0A2540] px-[15px] py-[5px]"
          >
            <div className="text-white text-xs gap-[5px]">
              CV öffnen
            </div>
          </a>
        ) : (
          <button disabled className="justify-center items-center flex min-h-[35px] flex-col overflow-hidden rounded-[100px] bg-[#0A2540]/50 px-[15px] py-[5px] cursor-not-allowed">
            <div className="text-white text-xs gap-[5px]">
              Kein CV verfügbar
            </div>
          </button>
        )}
      </div>
      <div className="flex items-center gap-1">
        <Link 
          to="/unternehmen/suche" 
          className="justify-center items-center flex min-h-[35px] flex-col overflow-hidden rounded-[100px] bg-white px-[15px] py-[5px] border border-[#0A2540]"
        >
          <div className="text-[#0A2540] text-xs gap-[5px]">
            Zurück
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileFooter;
