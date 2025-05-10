import React from "react";

interface ProfileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileNavigation: React.FC<ProfileNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "experience", label: "Berufserfahrung" },
    { id: "education", label: "Ausbildung" },
    { id: "awards", label: "Auszeichnungen" },
    { id: "projects", label: "Projekte" }
  ];

  return (
    <nav className="flex w-full items-center text-xs text-[#546679] font-medium whitespace-nowrap text-center leading-[1.4] pl-4">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`self-stretch gap-[23px] bg-white my-auto p-2 border-b border-solid ${
            activeTab === tab.id
              ? "text-[#0A2540] border-b-[color:var(--dark-dark\_1,#0A2540)]"
              : "text-[#546679] border-b-[color:var(--dark-dark\_6,#E7E9EC)]"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default ProfileNavigation;
