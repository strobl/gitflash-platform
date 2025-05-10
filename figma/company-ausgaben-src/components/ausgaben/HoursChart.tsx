
import React from "react";
import { BarChart, BarData } from "../ui/BarChart";
import { useIsMobile } from "@/hooks/use-mobile";

export const HoursChart: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Sample data for the chart
  const chartData: BarData[] = [
    { height: 68, color: "#9DA8B3" },
    { height: 108, color: "#6C7C8C" },
    { height: 100, color: "#9DA8B3" },
    { height: 130, color: "#6C7C8C" }
  ];

  return (
    <div className={`bg-white shadow-[0px_12px_32px_rgba(0,0,0,0.08)] ${isMobile ? 'w-full mt-3' : 'flex-1 min-w-[450px]'} p-3 md:p-5 rounded-xl`}>
      <div className="justify-between flex w-full bg-[#F5F6F7] p-3 md:p-5 rounded-xl">
        <div className="md:w-auto md:flex-1">
          <h2 className="text-[#0A2540] text-[15px] md:text-lg font-bold leading-[1.3]">
            Geleistete Stunden
          </h2>
          <p className="text-[#546679] text-[11px] md:text-sm font-medium leading-[14px] md:leading-[1.3] mt-1">
            Erfasste Arbeitsstunden Ihres Teams
          </p>
        </div>
        <div className="flex flex-col whitespace-nowrap w-14 md:w-auto">
          <div className="text-[#546679] text-center md:text-right text-[11px] md:text-sm font-medium leading-[14px] md:leading-[1.3]">
            GesamteStunden
          </div>
          <div className="text-[#0A2540] text-right text-[15px] md:text-lg font-bold leading-[1.3] mt-1">
            140,00
          </div>
        </div>
      </div>
      <div className="w-full mt-3 md:mt-5">
        {isMobile ? (
          <div className="flex w-[197px] max-w-full items-stretch gap-[39px]">
            <div className="flex items-stretch gap-[13px] flex-1">
              <div className="border bg-[#E7E9EC] w-px shrink-0 h-[150px] border-[rgba(231,233,236,1)] border-solid" />
              <div className="flex items-center gap-3">
                <div className="self-stretch overflow-hidden w-[30px] my-auto pt-[82px]">
                  <div className="flex shrink-0 h-[68px] bg-[#9DA8B3] rounded-[8px_8px_0px_0px]" />
                </div>
                <div className="self-stretch overflow-hidden w-[30px] my-auto pt-[42px]">
                  <div className="flex shrink-0 h-[108px] bg-[#6C7C8C] rounded-[8px_8px_0px_0px]" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 flex-1">
              <div className="overflow-hidden w-[30px] pt-[50px]">
                <div className="flex shrink-0 h-[100px] bg-[#9DA8B3] rounded-[8px_8px_0px_0px]" />
              </div>
              <div className="overflow-hidden w-[30px] pt-5">
                <div className="flex shrink-0 h-[130px] bg-[#6C7C8C] rounded-[8px_8px_0px_0px]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-end w-full h-[200px]">
            <div className="border bg-[#E7E9EC] w-px shrink-0 h-[200px] border-[rgba(231,233,236,1)] border-solid" />
            <div className="flex items-end gap-8 pl-4 w-full justify-between max-w-[600px]">
              <div className="flex flex-col items-center">
                <div className="overflow-hidden w-[40px] pt-[132px]">
                  <div className="flex shrink-0 h-[68px] bg-[#9DA8B3] rounded-[8px_8px_0px_0px]" />
                </div>
                <div className="text-xs text-[#546679] mt-2">Woche 1</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="overflow-hidden w-[40px] pt-[92px]">
                  <div className="flex shrink-0 h-[108px] bg-[#6C7C8C] rounded-[8px_8px_0px_0px]" />
                </div>
                <div className="text-xs text-[#546679] mt-2">Woche 2</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="overflow-hidden w-[40px] pt-[100px]">
                  <div className="flex shrink-0 h-[100px] bg-[#9DA8B3] rounded-[8px_8px_0px_0px]" />
                </div>
                <div className="text-xs text-[#546679] mt-2">Woche 3</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="overflow-hidden w-[40px] pt-[70px]">
                  <div className="flex shrink-0 h-[130px] bg-[#6C7C8C] rounded-[8px_8px_0px_0px]" />
                </div>
                <div className="text-xs text-[#546679] mt-2">Woche 4</div>
              </div>
            </div>
          </div>
        )}
        <div className="border bg-[#E7E9EC] shrink-0 h-px border-[rgba(231,233,236,1)] border-solid" />
      </div>
    </div>
  );
};
