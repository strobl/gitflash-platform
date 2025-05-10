
import React from "react";

interface EmptyTeamStateProps {
  className?: string;
  onCreateTeam?: () => void;
}

export function EmptyTeamState({ className = "", onCreateTeam }: EmptyTeamStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center px-4 py-8 ${className}`}>
      <div className="flex flex-col items-center max-w-sm gap-6">
        <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.6663 19.0027V21.7885C17.8322 21.4937 16.9347 21.3333 15.9997 21.3333C11.5814 21.3333 7.99967 24.9151 7.99967 29.3333H5.33301C5.33301 23.4423 10.1086 18.6667 15.9997 18.6667C16.9205 18.6667 17.8141 18.7833 18.6663 19.0027ZM15.9997 17.3333C11.5797 17.3333 7.99967 13.7533 7.99967 9.33333C7.99967 4.91333 11.5797 1.33333 15.9997 1.33333C20.4197 1.33333 23.9997 4.91333 23.9997 9.33333C23.9997 13.7533 20.4197 17.3333 15.9997 17.3333ZM15.9997 14.6667C18.9463 14.6667 21.333 12.28 21.333 9.33333C21.333 6.38666 18.9463 3.99999 15.9997 3.99999C13.053 3.99999 10.6663 6.38666 10.6663 9.33333C10.6663 12.28 13.053 14.6667 15.9997 14.6667ZM23.9997 22.6667V18.6667H26.6663V22.6667H30.6663V25.3333H26.6663V29.3333H23.9997V25.3333H19.9997V22.6667H23.9997Z"
              fill="#0A2540"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-3 text-center">
          <h3 className="text-[#0A2540] text-lg font-bold">
            Ihr Team hat aktuell keine Mitglieder in diesem Projekt.
          </h3>
          <p className="text-[#546679] text-sm">
            Nutzen Sie die Suchfunktion, um Personen zu Ihrem Team
            hinzuzufügen.
          </p>
        </div>
        <button 
          className="w-full h-12 bg-[#0A2540] text-white text-sm font-medium px-6 py-3 rounded-full"
          onClick={onCreateTeam}
        >
          Team zusammenstellen
        </button>
      </div>
    </div>
  );
}
