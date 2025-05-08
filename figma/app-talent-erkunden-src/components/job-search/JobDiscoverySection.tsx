import React from "react";
import JobTabs from "./JobTabs";
import JobCard from "./JobCard";

const JobDiscoverySection: React.FC = () => {
  const jobs = [
    {
      id: 1,
      logo: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/e8f8df023f10787acc595a49ab29405b1fd35f6f?placeholderIfAbsent=true",
      title: "Projektleiter Hochbau",
      salary: "€85.000 Jahresgehalt",
      location: "München",
      recentHires: 10,
    },
    {
      id: 2,
      logo: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/63c9d1ec4dbd729e4930441181aa0e9f5d48ef93?placeholderIfAbsent=true",
      title: "Projektentwickler Immobilien",
      salary: "€78.000 Jahresgehalt",
      location: "Frankfurt",
      recentHires: 10,
    },
    {
      id: 3,
      logo: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/3249d0d589b5ffe4f596fce5295ea78fd113f803?placeholderIfAbsent=true",
      title: "Jurist Baurecht",
      salary: "€350 pro Stunde",
      location: "Remote",
      recentHires: 10,
    },
    {
      id: 4,
      logo: "https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/3249d0d589b5ffe4f596fce5295ea78fd113f803?placeholderIfAbsent=true",
      title: "Projektentwickler Immobilien",
      salary: "€78.000 Jahresgehalt",
      location: "Frankfurt",
      recentHires: 10,
    },
  ];

  return (
    <section className="bg-[rgba(242,244,246,1)] flex w-full flex-col items-stretch py-8">
      <div className="self-center flex w-full flex-col items-stretch text-center">
        <h2 className="text-[#0A2540] text-xl font-bold self-center">
          Jobs entdecken
        </h2>
        <JobTabs />
      </div>
      <div className="w-full mt-6">
        {jobs.map((job, index) => (
          <JobCard
            key={job.id}
            logo={job.logo}
            title={job.title}
            salary={job.salary}
            location={job.location}
            recentHires={job.recentHires}
            className={index > 0 ? "mt-2" : ""}
          />
        ))}
      </div>
    </section>
  );
};

export default JobDiscoverySection;
