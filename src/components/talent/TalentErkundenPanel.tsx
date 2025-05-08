
import React from "react";
import { Search, Filter, MapPin, Building, Briefcase } from "lucide-react";

const TalentErkundenPanel: React.FC = () => {
  // Sample job data
  const jobs = [
    {
      id: "1",
      title: "Projektmanager im Bauwesen",
      company: "BauPro GmbH",
      location: "Berlin",
      type: "Remote",
      salary: "65.000€ - 80.000€",
      match: 92
    },
    {
      id: "2",
      title: "Bauingenieur",
      company: "ArchBau AG",
      location: "München",
      type: "Vollzeit",
      salary: "55.000€ - 75.000€",
      match: 85
    },
    {
      id: "3",
      title: "Baurechtsexperte",
      company: "Rechtsbau Consulting",
      location: "Hamburg",
      type: "Teilzeit",
      salary: "Verhandlungsbasis",
      match: 78
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Projekte erkunden</h2>
      
      {/* Search and filter bar */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Suche nach Projekten, Unternehmen, Skills..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gitflash-primary"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>
      
      {/* Job listings */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <Building className="w-4 h-4 mr-1" />
                  <span className="text-sm">{job.company}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{job.location}</span>
                </div>
              </div>
              
              {/* Match percentage */}
              <div className="bg-[#EEFAF3] text-[#1D9A6C] px-3 py-1 rounded-full text-sm font-medium">
                {job.match}% Match
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                {job.type}
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                {job.salary}
              </span>
            </div>
            
            <div className="mt-4 flex gap-3">
              <button className="flex-1 bg-gitflash-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Details
              </button>
              <button className="flex-1 border border-gitflash-primary text-gitflash-primary px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
                Bewerben
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalentErkundenPanel;
