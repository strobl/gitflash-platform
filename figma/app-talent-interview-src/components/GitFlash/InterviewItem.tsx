
import React from "react";
import { Camera } from "lucide-react";

interface InterviewItemProps {
  title: string;
  status: string;
}

const InterviewItem: React.FC<InterviewItemProps> = ({ title, status }) => {
  return (
    <div className="bg-white rounded-lg p-4 flex items-start space-x-3 shadow-sm h-full hover:shadow-md transition-shadow">
      <div className="relative w-10 h-10 flex-shrink-0">
        <div className="w-10 h-10 bg-[#0A2540] opacity-10 absolute rounded-lg" />
        <Camera size={24} className="text-[#0A2540] absolute left-2 top-2" />
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold text-xs text-[#0A2540]">{title}</h3>
        <p className="text-[10px] text-[#3B5166] mt-1.5">{status}</p>
      </div>
    </div>
  );
};

export default InterviewItem;
