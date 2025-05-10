import React from "react";

const ProfileCard: React.FC = () => {
  return (
    <div className="items-stretch flex w-full flex-col text-[#0A2540] whitespace-nowrap justify-center bg-white px-4 py-8">
      <div className="bg-white border relative flex w-full items-start gap-3 p-3 rounded-lg border-[rgba(189,198,207,1)] border-solid">
        <div className="z-0 flex min-w-60 w-full flex-col items-stretch justify-center flex-1 shrink basis-[0%] my-auto">
          <div className="flex w-full items-center gap-3 text-sm font-bold">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2fa290b1fbbb960c9f978ec0dced4ef3670fa4e9?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-9 self-stretch shrink-0 my-auto rounded-[50%]"
              alt="Profile"
            />
            <div
              className="text-[#0A2540] self-stretch flex-1 shrink basis-[0%] my-auto"
            >
              V.D.
            </div>
          </div>
          <div className="flex w-full gap-3 font-medium mt-4">
            <div className="flex min-w-60 w-full flex-col items-stretch justify-center flex-1 shrink basis-[0%]">
              <div
                className="text-[#0A2540] text-xs"
              >
                Expertise:
              </div>
              <div className="flex w-full items-center gap-1 text-[8px] text-right mt-2">
                <div
                  className="text-white self-stretch gap-2 bg-[#0A2540] my-auto px-1.5 py-[3px] rounded-[30px]"
                >
                  Baurecht
                </div>
                <div
                  className="text-[#0A2540] self-stretch bg-[rgba(10,37,64,0.1)] gap-2 my-auto px-1.5 py-[3px] rounded-[30px]"
                >
                  Vergaberecht/B
                </div>
                <div
                  className="text-[#0A2540] self-stretch bg-[rgba(10,37,64,0.1)] gap-2 my-auto px-1.5 py-[3px] rounded-[30px]"
                >
                  Vertragsgestaltung
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/b7364ac92c8d52fa869627c22c60b3e57090c43b?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-6 absolute z-0 shrink-0 h-6 right-3 top-3"
          alt="More options"
        />
      </div>
    </div>
  );
};

export default ProfileCard;
