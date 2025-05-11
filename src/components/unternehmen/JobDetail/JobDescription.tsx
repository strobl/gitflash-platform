
import React from 'react';

interface JobDescriptionProps {
  description: string;
}

export const JobDescription: React.FC<JobDescriptionProps> = ({ description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};
