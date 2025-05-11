
import React from "react";

interface ProfileCardProps {
  name?: string;
  profileImage?: string;
  expertise?: string[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  name = "T.P.", 
  profileImage = "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2fa290b1fbbb960c9f978ec0dced4ef3670fa4e9?placeholderIfAbsent=true",
  expertise = ["Baurecht", "Vergaberecht/B", "Vertragsgestaltung"]
}) => {
  // Get initials from name, default to T.P.
  const initials = name ? 
    name.split(' ').map(n => n[0]).join('.') + '.' : 
    "T.P.";
  
  // Get the first expertise as primary (dark background)
  const primaryExpertise = expertise && expertise.length > 0 ? expertise[0] : "Baurecht";
  
  // Get the rest as secondary (light background)
  const secondaryExpertise = expertise && expertise.length > 1 ? expertise.slice(1) : ["Vergaberecht/B", "Vertragsgestaltung"];
  
  return (
    <div className="items-stretch flex w-full flex-col text-[#0A2540] whitespace-nowrap justify-center bg-white px-4 py-8">
      <div className="bg-white border relative flex w-full items-start gap-3 p-3 rounded-lg border-[rgba(189,198,207,1)] border-solid">
        <div className="z-0 flex min-w-60 w-full flex-col items-stretch justify-center flex-1 shrink basis-[0%] my-auto">
          <div className="flex w-full items-center gap-3 text-sm font-bold">
            <img
              src={profileImage}
              className="aspect-[1] object-contain w-9 self-stretch shrink-0 my-auto rounded-[50%]"
              alt="Profile"
            />
            <div
              className="text-[#0A2540] self-stretch flex-1 shrink basis-[0%] my-auto"
            >
              {initials}
            </div>
          </div>
          <div className="flex w-full gap-3 font-medium mt-4">
            <div className="flex min-w-60 w-full flex-col items-stretch justify-center flex-1 shrink basis-[0%]">
              <div
                className="text-[#0A2540] text-xs"
              >
                Expertise:
              </div>
              <div className="flex w-full items-center gap-1 text-[8px] text-right mt-2 flex-wrap">
                <div
                  className="text-white self-stretch gap-2 bg-[#0A2540] my-auto px-1.5 py-[3px] rounded-[30px]"
                >
                  {primaryExpertise}
                </div>
                {secondaryExpertise.map((item, index) => (
                  <div
                    key={index}
                    className="text-[#0A2540] self-stretch bg-[rgba(10,37,64,0.1)] gap-2 my-auto px-1.5 py-[3px] rounded-[30px]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/b7364ac92c8d52fa869627c22c60b3e57090c43b?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-6 absolute z-0 shrink-0 h-6 right-3 top-3"
          alt="More options"
        />
      </div>
    </div>
  );
};

export default ProfileCard;
