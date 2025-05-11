
import React from "react";
import { Link } from "react-router-dom";

interface ProfileHeaderProps {
  username?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username = "Talent" }) => {
  return (
    <div
      className="border-b-[color:var(--dark-dark_6,#E7E9EC)] flex w-full items-stretch gap-5 overflow-hidden justify-between bg-white px-[17px] py-2.5 rounded-[8px_8px_0px_0px] border-b border-solid sticky top-0 z-10"
    >
      <div className="flex items-center gap-2">
        <Link to="/unternehmen/suche">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/1de96eb029155893da8305b1b4774e31a3774ea5?placeholderIfAbsent=true"
            className="aspect-[11/14] object-contain w-[11px] fill-[#0A2540] self-stretch shrink-0 my-auto cursor-pointer"
            alt="Back arrow"
          />
        </Link>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/f70ff9eb78c7331a899d14d6a1d3dd4cf3adc6d9?placeholderIfAbsent=true"
          className="aspect-[5.08] object-contain w-[61px] fill-[#0A2540] self-stretch shrink-0 my-auto"
          alt="Logo"
        />
      </div>
      <div className="flex items-center gap-2 text-xs text-white font-medium text-right">
        <Link to="/unternehmen/suche">
          <button className="justify-center items-center self-stretch flex min-h-6 flex-col overflow-hidden bg-[#0A2540] my-auto px-[15px] py-[5px] rounded-[100px]">
            <div className="text-white gap-[5px]">
              Personal finden
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileHeader;
