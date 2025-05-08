
import React from "react";
import { User } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white border-b w-full">
      <div className="flex items-center space-x-2">
        <div className="font-bold flex items-center">
          <span className="mr-1">⚡</span> GitFlash
        </div>
      </div>
      <div>
        <User size={20} className="text-gray-700" />
      </div>
    </div>
  );
};

export default Header;
