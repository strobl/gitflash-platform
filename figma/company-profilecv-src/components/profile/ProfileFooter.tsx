
import React from "react";

const ProfileFooter: React.FC = () => {
  return (
    <footer className="justify-center items-stretch shadow-[0px_-5px_10px_0px_rgba(0,49,77,0.10)] flex w-full flex-col bg-white rounded-[0px_0px_12px_12px] sticky bottom-0 z-10">
      <div className="flex items-center gap-[7px] justify-between mx-4">
        <div className="flex flex-col justify-center items-stretch overflow-hidden self-stretch relative aspect-[1.083] w-[52px] border-t-[color:var(--dark-dark\_1,#0A2540)] my-auto py-1.5 border-t border-solid">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/6d71a392d0aaf23f1280ef65884296ed5ba75e8b?placeholderIfAbsent=true"
            className="absolute h-full w-full object-cover inset-0"
            alt="Navigation icon"
          />
          <div className="relative flex shrink-0 h-9" />
        </div>
        <div className="flex flex-col justify-center items-stretch overflow-hidden self-stretch relative aspect-[1.083] w-[52px] text-[9px] text-[#6C7C8C] font-medium whitespace-nowrap text-center leading-loose my-auto py-1.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/67f898f048a1ade1b04c64bcca7834e10e621690?placeholderIfAbsent=true"
            className="absolute h-full w-full object-cover inset-0"
            alt="Navigation icon"
          />
          <div className="relative">
            Jobanzeigen
          </div>
        </div>
        <div className="flex flex-col justify-center items-stretch overflow-hidden self-stretch relative aspect-[1.083] w-[52px] my-auto py-1.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/d252dc21da5021a1b64915d40a8412d8a0c97e90?placeholderIfAbsent=true"
            className="absolute h-full w-full object-cover inset-0"
            alt="Navigation icon"
          />
          <div className="relative flex shrink-0 h-9" />
        </div>
        <div className="flex flex-col justify-center items-stretch overflow-hidden self-stretch relative aspect-[1.083] w-[52px] my-auto py-1.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/c8be931e7d37cd8e5364824f193fd55af182ad58?placeholderIfAbsent=true"
            className="absolute h-full w-full object-cover inset-0"
            alt="Navigation icon"
          />
          <div className="relative flex shrink-0 h-9" />
        </div>
        <div className="flex flex-col justify-center items-stretch overflow-hidden self-stretch relative aspect-[1.083] w-[52px] my-auto py-1.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/1ae6edad2db61c149ed5b1c6b2a3fb20f7681c17?placeholderIfAbsent=true"
            className="absolute h-full w-full object-cover inset-0"
            alt="Navigation icon"
          />
          <div className="relative flex shrink-0 h-9" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-16 py-2">
        <div className="flex w-[72px] shrink-0 h-0.5 bg-[#9DA8B3] rounded-lg" />
      </div>
    </footer>
  );
};

export default ProfileFooter;
