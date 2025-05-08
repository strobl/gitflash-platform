
import React from "react";
import { Home, FileText, Camera, Lock, Search } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false }) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className={`text-xs mt-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
        {label}
      </span>
      {isActive && <div className="h-1 w-12 bg-blue-600 rounded-t-md mt-2" />}
    </div>
  );
};

const AppNavigation: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 px-4">
      <NavItem icon={<Home size={20} />} label="Startseite" />
      <NavItem icon={<FileText size={20} />} label="Lebenslauf" />
      <NavItem icon={<Camera size={20} />} label="Interview" isActive={true} />
      <NavItem icon={<Lock size={20} />} label="Zahlungen" />
      <NavItem icon={<Search size={20} />} label="Erkunden" />
    </div>
  );
};

export default AppNavigation;
