import React from "react";

interface FeedbackItemProps {
  title: string;
  status: string;
  iconType: "camera" | "cameraStock";
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ title, status, iconType }) => {
  return (
    <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 relative">
          <div className="w-10 h-10 bg-[#0A2540] opacity-10 absolute rounded-lg" />
          {iconType === "camera" ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[24px] h-[24px] absolute left-[8px] top-[8px]"
            >
              <path
                d="M13 6V4H5V2H15V6H16C16.5523 6 17 6.44772 17 7V9.2L22.2133 5.55071C22.4395 5.39235 22.7513 5.44737 22.9096 5.6736C22.9684 5.75764 23 5.85774 23 5.96033V18.0397C23 18.3158 22.7761 18.5397 22.5 18.5397C22.3974 18.5397 22.2973 18.5081 22.2133 18.4493L17 14.8V19C17 19.5523 16.5523 20 16 20H2C1.44772 20 1 19.5523 1 19V7C1 6.44772 1.44772 6 2 6H13ZM5 10V12H7V10H5Z"
                fill="#0A2540"
              ></path>
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[24px] h-[24px] absolute left-[8px] top-[8px]"
            >
              <path
                d="M13 6V4H5V2H15V6H16C16.5523 6 17 6.44772 17 7V9.2L22.2133 5.55071C22.4395 5.39235 22.7513 5.44737 22.9096 5.6736C22.9684 5.75764 23 5.85774 23 5.96033V18.0397C23 18.3158 22.7761 18.5397 22.5 18.5397C22.3974 18.5397 22.2973 18.5081 22.2133 18.4493L17 14.8V19C17 19.5523 16.5523 20 16 20H2C1.44772 20 1 19.5523 1 19V7C1 6.44772 1.44772 6 2 6H13ZM15 8H3V18H15V8ZM17 12.3587L21 15.1587V8.84131L17 11.6413V12.3587ZM5 10H7V12H5V10Z"
                fill="#0A2540"
              ></path>
            </svg>
          )}
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="text-[#0A2540] text-xs font-bold">{title}</div>
          <div className="text-[#3B5166] text-[10px]">{status}</div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackItem;
