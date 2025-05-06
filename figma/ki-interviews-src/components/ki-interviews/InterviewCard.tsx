import React from "react";

interface InterviewCardProps {
  image: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
}

export const InterviewCard: React.FC<InterviewCardProps> = ({
  image,
  title,
  description,
  duration,
  difficulty,
}) => {
  return (
    <article className="bg-white shadow-[0px_12px_32px_rgba(0,0,0,0.08)] w-full overflow-hidden rounded-xl">
      <img src={image} className="aspect-[1.8] object-contain w-full" alt={title} />
      <div className="flex w-full flex-col items-stretch px-3 py-4">
        <h3 className="text-[#0A2540] text-xl font-bold">{title}</h3>
        <p className="text-[#546679] text-xs font-normal leading-[18px] mt-3">
          {description}
        </p>
        <div className="flex gap-2 text-[10px] font-medium whitespace-nowrap text-right leading-[1.3] mt-3">
          <div className="justify-center items-center flex flex-col overflow-hidden text-[#0A2540] bg-[#E7E9EC] px-2 py-1 rounded-[100px]">
            <div className="flex items-center gap-1">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/a218785a2a5b3240d77e349cb7d1a7a60b6d184e?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                alt="Clock icon"
              />
              <div className="text-[#0A2540] self-stretch my-auto">
                {duration}
              </div>
            </div>
          </div>
          <div className="justify-center items-center flex min-h-[22px] flex-col overflow-hidden text-white bg-[#0A2540] px-2 py-[5px] rounded-[100px]">
            <div className="text-white self-stretch gap-1">
              {difficulty}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};