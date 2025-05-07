import React from "react";

export const InterviewPrep: React.FC = () => {
  const handleStartInterview = () => {
    // Handle interview start logic
    console.log("Starting interview...");
  };

  const handleTechnicalIssues = () => {
    // Handle technical issues logic
    console.log("Reporting technical issues...");
  };

  return (
    <section className="items-stretch flex min-h-[414px] w-full flex-col bg-white px-4 py-9">
      <div className="w-full text-[#0A2540]">
        <h2 className="text-[#0A2540] text-base font-bold">
          Bauleiter - Hochbau
        </h2>
        <div className="items-stretch flex w-full flex-col text-sm text-white font-normal text-center bg-[#3B5166] mt-3 px-4 py-6 rounded-lg" role="alert">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/e9f7e25123a7838e3c00ff481b403a3e227e0624?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-6 self-center"
            alt="Camera access required"
          />
          <p className="text-white mt-2">
            ⚠️ Bitte erlaube den Kamerazugriff in deinen Browser-Einstellungen
          </p>
        </div>
        <div className="flex max-w-full w-72 flex-col text-center mt-3">
          <h3 className="text-[#0A2540] text-base font-bold">
            Bereit für Ihr Interview?
          </h3>
          <p className="text-[#0A2540] text-xs font-normal mt-1">
            GitFlash Ki ist bereit.
          </p>
        </div>
      </div>
      <div className="self-center w-[197px] max-w-full font-medium text-right mt-6">
        <button 
          onClick={handleStartInterview}
          className="bg-[rgba(10,37,64,1)] flex min-h-10 w-full flex-col overflow-hidden items-center text-sm text-white justify-center px-[25px] py-[11px] rounded-[100px]"
          aria-label="Start interview"
        >
          <div className="flex gap-[5px]">
            <span className="text-white">Interview starten</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/b3f83e8faff380686bf09b0d48284c8ae16c6a06?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-[18px] shrink-0"
              alt="Start arrow"
            />
          </div>
        </button>
        <button 
          onClick={handleTechnicalIssues}
          className="flex w-full items-center gap-[5px] text-xs text-[#546679] justify-center mt-3"
          aria-label="Report technical issues"
        >
          <span className="text-[#546679] self-stretch my-auto">
            Ich habe technische Probleme
          </span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/9e47ff4d590ed95b3120e1615908c1ea6fc9903d?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
            alt="Help icon"
          />
        </button>
      </div>
      <p className="text-[#0A2540] text-center text-xs font-normal mt-6">
        GitFlash verwendet KI, um das Interview durchzuführen.
      </p>
    </section>
  );
};

export default InterviewPrep;
