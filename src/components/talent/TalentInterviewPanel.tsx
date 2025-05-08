
import React from "react";
import { Plus, PlayCircle, Clock } from "lucide-react";

const TalentInterviewPanel: React.FC = () => {
  // Sample interview data
  const interviews = [
    { 
      id: "1", 
      title: "Intro Interview", 
      status: "completed", 
      score: 87, 
      date: "2023-04-15" 
    },
    { 
      id: "2", 
      title: "Baurecht Fachwissen", 
      status: "pending", 
      date: "2023-05-01" 
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Deine Interviews</h2>
        <button className="flex items-center gap-2 bg-gitflash-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Neues Interview</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map((interview) => (
          <div key={interview.id} className="bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">{interview.title}</h3>
              {interview.status === "completed" ? (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Abgeschlossen
                </span>
              ) : (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                  Ausstehend
                </span>
              )}
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Clock className="w-4 h-4 mr-1" />
              <span>{interview.date}</span>
            </div>
            
            {interview.status === "completed" && (
              <div className="mb-4">
                <div className="text-sm font-medium mb-1">Score</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gitflash-primary h-2.5 rounded-full" 
                    style={{ width: `${interview.score}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm mt-1">{interview.score}%</div>
              </div>
            )}
            
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors">
              {interview.status === "completed" ? (
                <>
                  <PlayCircle className="w-4 h-4" />
                  <span>Ansehen</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4" />
                  <span>Starten</span>
                </>
              )}
            </button>
          </div>
        ))}
        
        {/* Create new interview card */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-5 rounded-lg flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            <Plus className="w-6 h-6 text-gray-500" />
          </div>
          <h3 className="font-semibold mb-2">Neues Interview</h3>
          <p className="text-sm text-gray-600 mb-4">
            Stelle dich vor und verbessere dein Profil
          </p>
          <button className="bg-gitflash-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
            Interview starten
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentInterviewPanel;
