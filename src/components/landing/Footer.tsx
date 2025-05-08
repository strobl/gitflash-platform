
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface FooterColumnProps {
  title: string;
  links: string[];
  highlight?: number;
}

const FooterColumn: React.FC<FooterColumnProps> = ({
  title,
  links,
  highlight = -1
}) => {
  return <div className="w-full md:w-auto">
      <h3 className="text-[#0A2540] font-bold md:text-lg">{title}</h3>
      <div className="w-full text-[#546679] font-normal mt-3">
        {links.map((link, index) => <div key={index} className={`${index > 0 ? "mt-2" : ""} ${highlight === index ? "flex w-full items-center gap-1.5 text-[#0A2540] font-semibold whitespace-nowrap" : "text-[#546679] leading-[21px]"}`}>
            {highlight === index && <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/99d7173b9665ae7524088255ed36f7ace80476ef?placeholderIfAbsent=true" className="aspect-[0.77] object-contain w-2.5 fill-[#0A2540] self-stretch shrink-0 my-auto" alt="Highlight icon" />}
            <span className={highlight === index ? "text-[#0A2540] self-stretch my-auto" : ""}>
              {link}
            </span>
          </div>)}
      </div>
    </div>;
};

export const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Function to scroll to top when navigating
  const navigateAndScrollToTop = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  
  return <footer className="border-b-[color:var(--dark-dark\_6,#E7E9EC)] w-full px-4 sm:px-6 md:px-12 py-8 md:py-16 border-b border-solid">
      <div className="flex h-5 w-[116px] max-w-full items-center gap-[11px]">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/44145df779ecfe5e25db57d7cf3109f26a0d3fc6?placeholderIfAbsent=true" className="aspect-[15.71/20.93] object-contain w-4 md:w-5 fill-[#0A2540] self-stretch shrink-0 my-auto" alt="GitFlash logo icon" />
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/bbd939599d2a9394a53f7298592847fc375fb451?placeholderIfAbsent=true" className="aspect-[4.95] object-contain w-[89px] md:w-[100px] fill-[#0A2540] self-stretch shrink-0 my-auto" alt="GitFlash logo text" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-8 md:mt-12 max-w-6xl mx-auto">
        <FooterColumn title="Für Unternehmen" links={["Personal finden", "Suche", "Shortlist", "Team"]} />
        <FooterColumn 
          title="Für Kandidaten" 
          links={["KI Interviews", "Jobs", "Resume Feedback", "Zahlungen"]} 
          highlight={1} 
        />
        <FooterColumn 
          title="Weitere Angebote" 
          links={["Neukundengewinnung", "Mitarbeiterschulung", "CRM für Kapitalbeschaffung", "Legal Operations", "Individuelle Lösungen"]} 
        />
        <FooterColumn title="Support" links={["Kundenbewertungen", "Wie sieht eine Zusammenarbeit aus?", "Welche Ergebnisse kann ich erwarten?"]} />
        <div className="w-full">
          <h3 className="text-[#0A2540] font-bold md:text-lg">Über GitFlash</h3>
          <div className="w-full text-[#546679] font-normal mt-3">
            <div className="text-[#546679]">Gründungsgeschichte</div>
            <div className="text-[#546679] mt-2">Hauptquartier</div>
            <div className="text-[#546679] mt-2">Standort</div>
            <div className="text-[#546679] mt-2">TÜV-Zertifzierungen</div>
            <div className="text-[#546679] mt-2">Triff das Team</div>
            <div className="text-[#546679] mt-2">Karriere</div>
            <div className="text-[#546679] mt-2">Presse</div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-stretch text-[10px] md:text-xs text-[#546679] font-normal text-center mt-8 md:mt-12 max-w-4xl mx-auto">
        <p className="text-[#546679]">Haftungsausschluss: Die Aussagen auf dieser Seite basieren auf unseren persönlichen Erfahrungen und Beobachtungen aus der Praxis. Wir können Ihnen keine konkreten Ergebnisse garantieren. Was wir Ihnen aber garantieren können: Wer bereit ist, Chancen aktiv zu nutzen, wird langfristig profitieren. Das Internet und insbesondere Künstliche Intelligenz verändern die Spielregeln. In der Vergangenheit fand jeder seinen Weg und seinen Platz – heute allerdings verteilt die Digitalisierung alles neu: Leistung, Effizienz und Transparenz entscheiden darüber, wer erfolgreich wird. Das ist weder unfair noch böse, sondern einfach ein transparentes Ergebnis eines effizienteren Marktes. Akademiker und Fachkräfte, die dies als Chance erkennen und leistungsbereit sind, werden langfristig zu den Gewinnern gehören. Unsere Plattform richtet sich ausdrücklich an Menschen, die bereit sind, Veränderungen aktiv anzunehmen und die Digitalisierung und KI als Chance zu verstehen und zu nutzen.</p>
        
        {/* Centered legal links */}
        <div className="flex flex-col items-center md:flex-row md:justify-center md:gap-6 text-[#0A2540] font-bold whitespace-nowrap mt-6">
          <div className="cursor-pointer" onClick={() => navigateAndScrollToTop("/impressum")}>
            Impressum
          </div>
          <div className="cursor-pointer mt-3 md:mt-0" onClick={() => navigateAndScrollToTop("/agb")}>
            AGB
          </div>
          <div className="cursor-pointer mt-3 md:mt-0" onClick={() => navigateAndScrollToTop("/datenschutz")}>
            Datenschutz
          </div>
        </div>
        
        <div className="mt-3 md:mt-5">
          <p>© Copyright 2025 GitFlash GmbH</p>
          <p className="text-[#546679] mt-3">
            This site is not a part of the Facebook TM website or Facebook TM
            Inc. Additionally, this site is NOT endorsed by FacebookTM in any
            way. FACEBOOK TM is a trademark of FACEBOOK TM, Inc.
          </p>
        </div>
      </div>
    </footer>;
};

