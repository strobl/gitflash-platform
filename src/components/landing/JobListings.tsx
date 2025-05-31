
import React from "react";
import { usePublicJobs } from "@/hooks/usePublicJobs";
import { JobListItem } from "@/components/jobs/JobListItem";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase } from "lucide-react";

export const JobListings: React.FC = () => {
  const { jobs, isLoading, error } = usePublicJobs();

  // Show only the first 3 jobs for the landing page
  const featuredJobs = jobs.slice(0, 3);

  if (isLoading) {
    return (
      <section className="bg-[rgba(242,244,246,1)] w-full px-4 sm:px-6 md:px-12 py-8 md:py-16">
        <div className="flex w-full flex-col items-stretch text-center max-w-3xl mx-auto">
          <div className="flex max-w-full mx-auto flex-col font-bold">
            <span className="text-[#3B5166] text-[10px] md:text-xs">
              Der direkte Weg zu exklusiven Jobs
            </span>
            <h2 className="text-[#0A2540] text-2xl md:text-3xl lg:text-4xl mt-1">
              Ein KI-Interview. Tausende Unternehmen erreichen.
            </h2>
          </div>
          <p className="text-[#546679] text-sm md:text-base font-normal leading-[21px] mt-3 md:mt-5">
            Absolvieren Sie ein einziges KI-Interview – ohne Vorbereitung von
            Anschreiben oder Lebenslauf. GitFlash analysiert Ihre Stärken und
            verbindet Sie gezielt mit Top-Arbeitgebern.
          </p>
        </div>
        <div className="w-full mt-6 md:mt-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-[#0A2540]/20 border-t-[#0A2540] rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[rgba(242,244,246,1)] w-full px-4 sm:px-6 md:px-12 py-8 md:py-16">
        <div className="flex w-full flex-col items-stretch text-center max-w-3xl mx-auto">
          <div className="flex max-w-full mx-auto flex-col font-bold">
            <span className="text-[#3B5166] text-[10px] md:text-xs">
              Der direkte Weg zu exklusiven Jobs
            </span>
            <h2 className="text-[#0A2540] text-2xl md:text-3xl lg:text-4xl mt-1">
              Ein KI-Interview. Tausende Unternehmen erreichen.
            </h2>
          </div>
          <p className="text-[#546679] text-sm md:text-base font-normal leading-[21px] mt-3 md:mt-5">
            Absolvieren Sie ein einziges KI-Interview – ohne Vorbereitung von
            Anschreiben oder Lebenslauf. GitFlash analysiert Ihre Stärken und
            verbindet Sie gezielt mit Top-Arbeitgebern.
          </p>
        </div>
        <div className="w-full mt-6 md:mt-10 max-w-3xl mx-auto">
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Briefcase className="w-12 h-12 text-[#0A2540] mx-auto mb-4" />
            <p className="text-[#3B5166] mb-4">Stellenanzeigen konnten nicht geladen werden.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[rgba(242,244,246,1)] w-full px-4 sm:px-6 md:px-12 py-8 md:py-16">
      <div className="flex w-full flex-col items-stretch text-center max-w-3xl mx-auto">
        <div className="flex max-w-full mx-auto flex-col font-bold">
          <span className="text-[#3B5166] text-[10px] md:text-xs">
            Der direkte Weg zu exklusiven Jobs
          </span>
          <h2 className="text-[#0A2540] text-2xl md:text-3xl lg:text-4xl mt-1">
            Ein KI-Interview. Tausende Unternehmen erreichen.
          </h2>
        </div>
        <p className="text-[#546679] text-sm md:text-base font-normal leading-[21px] mt-3 md:mt-5">
          Absolvieren Sie ein einziges KI-Interview – ohne Vorbereitung von
          Anschreiben oder Lebenslauf. GitFlash analysiert Ihre Stärken und
          verbindet Sie gezielt mit Top-Arbeitgebern.
        </p>
      </div>
      
      <div className="w-full mt-6 md:mt-10 max-w-4xl mx-auto">
        {featuredJobs.length > 0 ? (
          <div className="space-y-4">
            {featuredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <JobListItem job={job} />
              </div>
            ))}
            
            {/* Show "Alle Jobs anzeigen" button if there are more jobs */}
            {jobs.length > 3 && (
              <div className="text-center mt-8">
                <Button asChild className="bg-[#0A2540] hover:bg-[#0A2540]/90 text-white">
                  <Link to="/jobs" className="inline-flex items-center">
                    Alle {jobs.length} Jobs anzeigen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Briefcase className="w-16 h-16 text-[#0A2540] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#0A2540] mb-2">
              Bald verfügbar
            </h3>
            <p className="text-[#546679] mb-6">
              Neue Stellenanzeigen werden bald verfügbar sein.
            </p>
            <Button asChild className="bg-[#0A2540] hover:bg-[#0A2540]/90 text-white">
              <Link to="/jobs">
                Alle Jobs anzeigen
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
