
import React from "react";

export interface BarData {
  height: number;
  color: string;
}

interface BarChartProps {
  data: BarData[];
  height?: number;
  gap?: number;
  barWidth?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 150,
  gap = 3,
  barWidth = 30,
}) => {
  return (
    <div className="flex items-end gap-[13px]">
      <div className="border bg-[#E7E9EC] w-px shrink-0 h-[150px] md:h-[200px] border-[rgba(231,233,236,1)] border-solid" />
      <div className="flex items-center gap-3 md:gap-8">
        {data.map((bar, index) => (
          <div
            key={index}
            className="overflow-hidden w-[30px] md:w-[40px]"
            style={{ paddingTop: `${height - bar.height}px` }}
          >
            <div
              className="flex shrink-0 rounded-[8px_8px_0px_0px]"
              style={{ 
                height: `${bar.height}px`,
                backgroundColor: bar.color
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
