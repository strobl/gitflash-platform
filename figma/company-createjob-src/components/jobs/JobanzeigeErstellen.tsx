import React, { useState } from 'react';
import JobHeader from './JobHeader';
import JobSearch from './JobSearch';
import JobCard from './JobCard';
import JobForm from './JobForm';

const JobanzeigeErstellen: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(true);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const jobs = [
    {
      id: 1,
      title: 'Bauleiter:in Hoch',
      project: null,
      status: 'Aktiv',
      visibility: 'Öfentlich',
      lastUpdated: '12.04.2025',
    },
    {
      id: 2,
      title: 'Jurist:in Baurecht',
      project: 'Sanierung Lagerh',
      status: 'In Prüfu',
      visibility: 'Nur intern',
      lastUpdated: '10.04.2025',
    },
    {
      id: 3,
      title: 'BIM-Koordinator:i',
      project: 'BIM Einführung',
      status: 'Entwurf',
      visibility: 'Öfentlich',
      lastUpdated: '08.04.2025',
    },
    {
      id: 4,
      title: 'Kostenplaner:in',
      project: 'Kostenanalyse Q2',
      status: 'Aktiv',
      visibility: 'Öfentlich',
      lastUpdated: '',
    },
  ];

  return (
    <div className="bg-white max-w-[480px] w-full overflow-hidden mx-auto rounded-xl relative">
      <div className="w-full">
        <JobHeader />
        <div className="w-full bg-white pl-4 py-8">
          <div className="flex w-full items-center gap-2 text-[#0A2540]">
            <h1 className="text-[#0A2540] text-xl font-bold self-stretch flex-1 shrink basis-[30px] my-auto">
              Jobanzeigen
            </h1>
            <button 
              className="justify-center items-center border border-[color:var(--dark-dark\_1,#0A2540)] self-stretch flex min-h-6 flex-col overflow-hidden text-xs font-medium text-right my-auto px-[15px] py-1 rounded-[100px] border-solid"
              onClick={toggleForm}
            >
              <div className="flex gap-[5px]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/95a528d7d40eb6ec5333923aab92bd1d82d7160f?placeholderIfAbsent=true"
                  className="aspect-[1] object-contain w-4 shrink-0"
                />
                <span className="text-[#0A2540]">
                  Job erstellen
                </span>
              </div>
            </button>
          </div>
          
          <JobSearch />
          
          <div className="w-full font-medium bg-white pb-8">
            <div className="w-full">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {isFormVisible && (
        <div className="bg-[rgba(10,37,64,1)] fixed bottom-0 left-0 right-0 z-10 max-w-[480px] mx-auto">
          <JobForm onClose={() => setIsFormVisible(false)} />
        </div>
      )}
    </div>
  );
};

export default JobanzeigeErstellen;
