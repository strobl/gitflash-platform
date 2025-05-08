import React from "react";
import { cn } from "@/lib/utils";

interface JobCardProps {
  logo: string;
  title: string;
  salary: string;
  location: string;
  recentHires: number;
  className?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  logo,
  title,
  salary,
  location,
  recentHires,
  className,
}) => {
  return (
    <article className={cn("bg-white flex w-full items-center gap-3 overflow-hidden p-2.5 rounded-lg", className)}>
      <div className="self-stretch flex min-w-60 w-full items-center gap-3 flex-1 shrink basis-[0%] my-auto">
        <div className="self-stretch flex items-center gap-3 flex-1 shrink basis-[0%] my-auto">
          <img
            src={logo}
            className="aspect-[1] object-contain w-10 self-stretch shrink-0 my-auto rounded-[0px_0px_0px_0px]"
            alt={`${title} company logo`}
          />
          <div className="self-stretch flex-1 shrink basis-[0%] my-auto">
            <h3 className="text-[#0A2540] text-xs font-bold">
              {title}
            </h3>
            <p className="text-[#3B5166] text-[10px] font-normal mt-1.5">
              {salary} · {location}
            </p>
          </div>
        </div>
        <div className="text-[#0A2540] text-right text-[10px] font-medium self-stretch w-[52px] my-auto">
          {recentHires} kürzlich eingestellt
        </div>
      </div>
    </article>
  );
};

export default JobCard;
