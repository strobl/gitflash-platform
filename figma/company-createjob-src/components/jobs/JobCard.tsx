import React from 'react';

interface JobCardProps {
  job: {
    id: number;
    title: string;
    project?: string | null;
    status: string;
    visibility: string;
    lastUpdated: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="border border-[color:var(--dark-dark\_6,#E7E9EC)] bg-white w-full max-w-72 mt-3 py-3 rounded-xl border-solid first:mt-0">
      <div className="justify-between items-center border-b-[color:var(--dark-dark\_6,#E7E9EC)] flex w-full pb-2 px-3 border-b border-solid">
        <div className="text-[#0A2540] text-xs self-stretch flex-1 shrink basis-[0%] my-auto">
          Jobtitel
        </div>
        <div className="text-[#546679] text-right text-[10px] self-stretch flex-1 shrink basis-[0%] my-auto">
          {job.title}
        </div>
      </div>
      
      {job.id === 1 && (
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/8564348a7624580d313494b5fa3a38f723d9d8ef?placeholderIfAbsent=true"
          className="aspect-[9.01] object-contain w-full border-b-[color:var(--dark-dark\_6,#E7E9EC)] py-2 border-b border-solid"
          alt="Job details"
        />
      )}
      
      {job.project && (
        <div className="justify-between items-center border-b-[color:var(--dark-dark\_6,#E7E9EC)] flex w-full px-3 py-2 border-b border-solid">
          <div className="text-[#0A2540] text-xs self-stretch flex-1 shrink basis-[0%] my-auto">
            Projekt
          </div>
          <div className="text-[#546679] text-right text-[10px] self-stretch flex-1 shrink basis-[0%] my-auto">
            {job.project}
          </div>
        </div>
      )}
      
      <div className="justify-between items-center border-b-[color:var(--dark-dark\_6,#E7E9EC)] flex w-full whitespace-nowrap px-3 py-2 border-b border-solid">
        <div className="text-[#0A2540] text-xs self-stretch flex-1 shrink basis-[0%] my-auto">
          Statu
        </div>
        <div className="text-[#546679] text-right text-[10px] self-stretch flex-1 shrink basis-[0%] my-auto">
          {job.status}
        </div>
      </div>
      
      <div className="justify-between items-center border-b-[color:var(--dark-dark\_6,#E7E9EC)] flex w-full whitespace-nowrap px-3 py-2 border-b border-solid">
        <div className="text-[#0A2540] text-xs self-stretch flex-1 shrink basis-[0%] my-auto">
          Sichtbark
        </div>
        <div className="text-[#546679] text-right text-[10px] self-stretch flex-1 shrink basis-[0%] my-auto">
          {job.visibility}
        </div>
      </div>
      
      {job.lastUpdated && (
        <div className="flex w-full items-center justify-between pt-2 px-3">
          <div className="text-[#0A2540] text-xs self-stretch flex-1 shrink basis-[0%] my-auto">
            Letzte Aktualisieru
          </div>
          <div className="text-[#546679] text-right text-[10px] self-stretch flex-1 shrink basis-[0%] my-auto">
            {job.lastUpdated}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
