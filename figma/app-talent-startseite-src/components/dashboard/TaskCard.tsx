
import React from "react";
import { ArrowRightIcon } from "../icons";
import { useIsMobile } from "@/hooks/use-mobile";

interface TaskCardProps {
  title: string;
  description: string;
  actionText: string;
  icon: React.ReactNode;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  actionText,
  icon,
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex flex-col gap-3 bg-[#F5F6F7] p-4 rounded-xl relative flex-1 ${isMobile ? "min-w-[200px] max-w-[75vw]" : "min-w-[247px]"}`}>
      <div className="absolute right-4 top-4">{icon}</div>
      <div className="flex flex-col gap-2 pr-6">
        <h3 className="text-[#0A2540] text-base font-bold">{title}</h3>
        <p className="text-[#546679] text-xs leading-[18px]">{description}</p>
      </div>
      <button className="flex items-center gap-1 text-left bg-transparent border-none p-0 cursor-pointer w-fit">
        <span className="text-[#0A2540] text-xs font-medium">{actionText}</span>
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default TaskCard;
