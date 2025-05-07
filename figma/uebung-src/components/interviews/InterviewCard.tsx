import React from "react";

interface InterviewCardProps {
  imageSrc: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
}

export const InterviewCard: React.FC<InterviewCardProps> = ({
  imageSrc,
  title,
  description,
  duration,
  difficulty,
}) => {
  return (
    <article className="bg-white shadow-[0px_12px_32px_rgba(0,0,0,0.08)] w-full overflow-hidden rounded-xl">
      <img className="aspect-[1.8] object-contain w-full" src={imageSrc} alt={title} />
      <div className="flex w-full flex-col items-stretch px-3 py-4">
        <div className="w-full">
          <h3 className="text-[#0A2540] text-base font-bold">{title}</h3>
          <p className="text-[#546679] text-xs font-normal leading-[18px] mt-2">
            {description}
          </p>
        </div>
        <div className="flex gap-2 text-[10px] font-medium whitespace-nowrap text-right mt-3">
          <div className="justify-center items-center flex flex-col overflow-hidden text-[#0A2540] bg-[#E7E9EC] px-2 py-1 rounded-[100px]">
            <div className="flex items-center gap-1">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/9a561d468909106ed524df57a28644f3738d7fbc?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                alt="Clock icon"
              />
              <span className="text-[#0A2540] self-stretch my-auto">
                {duration}
              </span>
            </div>
          </div>
          <div className="justify-center items-center flex min-h-[22px] flex-col overflow-hidden text-white bg-[#0A2540] px-2 py-[5px] rounded-[100px]">
            <span className="text-white self-stretch gap-1">
              {difficulty}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default InterviewCard;
