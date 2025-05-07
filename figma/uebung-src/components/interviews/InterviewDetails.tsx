import React from "react";

export const InterviewDetails: React.FC = () => {
  return (
    <section className="w-full">
      <div className="w-full">
        <h2 className="text-[#0A2540] text-xl font-bold">
          Technisches Interview – Bauleitung
        </h2>
        <p className="text-[#546679] text-sm font-normal leading-[21px] mt-3">
          Dieses Mock-Interview ist speziell für erfahrene Bauleiter im
          Bereich Hochbau konzipiert. In einer fokussierten,
          30-minütigen Sitzung simulierst du realistische Szenarien, die
          dir in technischen Vorstellungsgesprächen begegnen. Das
          Interview beginnt mit einer kurzen Selbstdarstellung, in der
          du deine Erfahrungen und bisherigen Projekte darstellst.
          Anschließend folgen gezielte Fragen zu Bauabläufen,
          Baustellenorganisation und deinem technischen Fachwissen. Im
          zweiten Teil bearbeitest du einen Fall zur Koordination eines
          typischen Hochbauprojekts, bei dem deine
          Problemlösefähigkeiten, dein Umgang mit Komplexität und dein
          Wissen in Projektsteuerung und Bauqualität geprüft werden.
          Dieses praxisnahe 30-Minuten-Format hilft dir, optimal
          vorbereitet in anspruchsvolle Vorstellungsgespräche zu gehen.
        </p>
      </div>
      <div className="text-[#0A2540] text-sm font-medium mt-4">
        Letzte Aktualisierung vor 3 Monaten
      </div>
      <div className="text-[#3B5166] flex-1 shrink basis-[0%] w-full gap-3 text-sm font-normal leading-[21px] mt-4">
        GitFlash
        <br />
        gitfash.com
      </div>
    </section>
  );
};

export default InterviewDetails;
