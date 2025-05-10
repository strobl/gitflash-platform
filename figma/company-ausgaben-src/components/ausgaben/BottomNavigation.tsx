import React from "react";

export const BottomNavigation: React.FC = () => {
  return (
    <div className="justify-center items-stretch shadow-[0px_-5px_10px_0px_rgba(0,49,77,0.10)] flex w-full flex-col bg-white rounded-[0px_0px_12px_12px]">
      <nav className="self-center flex w-full max-w-72 items-center gap-[7px] justify-between">
        <button className="flex flex-col justify-center items-stretch overflow-hidden self-stretch relative aspect-[1.083] w-[52px] my-auto py-1.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/4c553a6a98d843dbb4bcd2d1bd6f9cf7d79eb37d?placeholderIfAbsent=true"
            className="absolute h-full w-full object-cover inset-0"
            alt="Navigation item 1"
          />
          <div className="relative flex shrink-0 h-9" />
        </button>
        <button className="flex flex-col justify-center items-stretch overflow-hidden self-stretch relative aspect-[1.083] w-[52px] text-[9px] text-[#6C7C8C] font-medium whitespace-nowrap text-center leading-loose my-auto py-1.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/67f898f048a1ade1b04c64bcca7834e10e621690?placeholderIfAbsent=true"
            className="absolute h-full w-full object-cover inset-0"
            alt="Navigation item 2"
          />
          <div className="relative">
            Jobanzeigen
          </div>
        </button>
        <button className="flex flex-col justify-center items-stretch overflow-hidden self-stretch relative aspect-[1.083] w-[52px] my-auto py-1.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/d252dc21da5021a1b64915d40a8412d8a0c97e90?placeholderIfAbsent=true"
            className="absolute h-full w-full object-cover inset-0"
            alt="Navigation item 3"
          />
          <div className="relative flex shrink-0 h-9" />
        </button>
        <button className="flex flex-col justify-center items-stretch overflow-hidden self-stretch relative aspect-[1.083] w-[52px] border-t-[color:var(--dark-dark\_1,#0A2540)] my-auto py-1.5 border-t border-solid">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/9d82d789047fd438c542fe9a03d27867e5ecccad?placeholderIfAbsent=true"
            className="absolute h-full w-full object-cover inset-0"
            alt="Navigation item 4"
          />
          <div className="relative flex shrink-0 h-9" />
        </button>
        <button className="flex flex-col justify-center items-stretch overflow-hidden self-stretch relative aspect-[1.083] w-[52px] my-auto py-1.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/1ae6edad2db61c149ed5b1c6b2a3fb20f7681c17?placeholderIfAbsent=true"
            className="absolute h-full w-full object-cover inset-0"
            alt="Navigation item 5"
          />
          <div className="relative flex shrink-0 h-9" />
        </button>
      </nav>
      <div className="flex flex-col items-center justify-center px-16 py-2">
        <div className="flex w-[72px] shrink-0 h-0.5 bg-[#9DA8B3] rounded-lg" />
      </div>
    </div>
  );
};
