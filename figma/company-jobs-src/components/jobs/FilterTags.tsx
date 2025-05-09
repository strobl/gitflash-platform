import React, { useState } from 'react';

interface FilterDropdownProps {
  icon: React.ReactNode;
  label: string;
  options: string[];
  isActive?: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ icon, label, options, isActive = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className={`flex h-6 justify-center items-center gap-2.5 px-2.5 py-[7px] rounded-[100px] ${
          isActive 
            ? 'bg-[#0A2540] text-white' 
            : 'border border-[#546679] text-[#546679]'
        }`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-start gap-[5px]">
          <div>{icon}</div>
          <div className={`text-xs ${isActive ? 'text-white' : 'text-[#546679]'}`}>{label}</div>
          <div>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-[16px] h-[16px]"
            >
              <path 
                d="M8 10.6667L4 6.66667H12L8 10.6667Z" 
                fill={isActive ? "white" : "#546679"}
              />
            </svg>
          </div>
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md z-10 min-w-[120px]">
          <ul className="py-1">
            {options.map((option, index) => (
              <li key={index} className="px-3 py-2 hover:bg-gray-100 text-xs cursor-pointer">
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const FilterTags: React.FC = () => {
  const sortIcon = (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-[16px] h-[16px]"
    >
      <path d="M7.96686 5.29983L7.02406 6.24264L5.33419 4.552L5.33369 13.3333H4.00035L4.00085 4.552L2.31 6.24264L1.36719 5.29983L4.66702 2L7.96686 5.29983ZM14.6335 10.7002L11.3337 14L8.03386 10.7002L8.97666 9.75733L10.6675 11.448L10.667 2.66667H12.0003L12.0009 11.448L13.6907 9.75733L14.6335 10.7002Z" fill="white" />
    </svg>
  );

  const statusIcon = (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-[16px] h-[16px]"
    >
      <path d="M8.00053 2C11.5953 2 14.5859 4.58651 15.2129 8C14.5859 11.4135 11.5953 14 8.00053 14C4.40574 14 1.41509 11.4135 0.788086 8C1.41509 4.58651 4.40574 2 8.00053 2ZM8.00053 12.6667C10.8243 12.6667 13.2405 10.7013 13.8521 8C13.2405 5.29869 10.8243 3.33333 8.00053 3.33333C5.17673 3.33333 2.76047 5.29869 2.14885 8C2.76047 10.7013 5.17673 12.6667 8.00053 12.6667ZM8.00053 11C6.34365 11 5.0005 9.65687 5.0005 8C5.0005 6.34315 6.34365 5 8.00053 5C9.65733 5 11.0005 6.34315 11.0005 8C11.0005 9.65687 9.65733 11 8.00053 11ZM8.00053 9.66667C8.92099 9.66667 9.66719 8.92047 9.66719 8C9.66719 7.07953 8.92099 6.33333 8.00053 6.33333C7.08006 6.33333 6.33383 7.07953 6.33383 8C6.33383 8.92047 7.08006 9.66667 8.00053 9.66667Z" fill="#546679" />
    </svg>
  );

  const visibilityIcon = (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-[16px] h-[16px]"
    >
      <g clipPath="url(#clip0_11493_1185)">
        <path d="M11.9221 12.8645C10.7879 13.5837 9.44286 14.0001 8.00053 14.0001C4.40574 14.0001 1.41509 11.4136 0.788086 8.00013C1.07921 6.41521 1.87987 5.0086 3.01397 3.95638L0.929433 1.87184L1.87225 0.929031L15.0716 14.1283L14.1288 15.0712L11.9221 12.8645ZM3.95739 4.8998C3.07148 5.70676 2.42553 6.77813 2.14885 8.00013C2.76047 10.7014 5.17673 12.6668 8.00053 12.6668C9.06679 12.6668 10.075 12.3865 10.9499 11.8923L9.59766 10.5401C9.13519 10.8315 8.58753 11.0001 8.00053 11.0001C6.34365 11.0001 5.0005 9.65693 5.0005 8.00013C5.0005 7.41306 5.16911 6.8654 5.46053 6.40294L3.95739 4.8998ZM8.60959 9.552L6.44863 7.39107C6.37453 7.57973 6.33383 7.78513 6.33383 8.00013C6.33383 8.9206 7.08006 9.6668 8.00053 9.6668C8.21546 9.6668 8.42093 9.62607 8.60959 9.552ZM13.8715 11.0617L12.9177 10.1078C13.3549 9.48453 13.6773 8.7724 13.8521 8.00013C13.2405 5.29879 10.8243 3.33344 8.00053 3.33344C7.43659 3.33344 6.88893 3.41182 6.36865 3.55878L5.31663 2.50676C6.14784 2.17972 7.05319 2.0001 8.00053 2.0001C11.5953 2.0001 14.5859 4.58661 15.2129 8.00013C15.0048 9.1332 14.5362 10.1752 13.8715 11.0617ZM7.81559 5.00571C7.87673 5.00199 7.93839 5.0001 8.00053 5.0001C9.65733 5.0001 11.0005 6.34325 11.0005 8.00013C11.0005 8.0622 10.9986 8.12387 10.9949 8.185L7.81559 5.00571Z" fill="#546679" />
      </g>
      <defs>
        <clipPath id="clip0_11493_1185">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div className="flex items-start gap-1 flex-wrap max-sm:gap-2">
      <FilterDropdown 
        icon={sortIcon} 
        label="Sortieren" 
        options={["Neueste zuerst", "Älteste zuerst", "A-Z", "Z-A"]} 
        isActive={true}
      />
      <FilterDropdown 
        icon={statusIcon} 
        label="Status" 
        options={["Alle", "Aktiv", "Inaktiv", "Entwurf"]} 
      />
      <FilterDropdown 
        icon={visibilityIcon} 
        label="Sichtbarkeit" 
        options={["Alle", "Öffentlich", "Privat"]} 
      />
    </div>
  );
};

export default FilterTags;
