
export function VideoCallSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                alt="Video Interview" 
                className="w-full h-[350px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gitflash-primary/30 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <div className="h-16 w-16 rounded-full bg-gitflash-primary flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-gitflash-primary">KI-gestützte Interviews</h2>
            <p className="text-xl mb-6 text-gitflash-text">
              GitFlash revolutioniert den Recruiting-Prozess mit modernster KI-Technologie, die automatisierte Interviews durchführt und auswertet.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-gitflash-primary/20 flex items-center justify-center mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gitflash-primary">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gitflash-primary">Automatisierte Vorstellungsgespräche</h3>
                  <p className="text-gitflash-text">Führen Sie jederzeit und von überall Interviews mit unserer KI durch.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-gitflash-primary/20 flex items-center justify-center mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gitflash-primary">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gitflash-primary">Vollständige Transkription</h3>
                  <p className="text-gitflash-text">Erhalten Sie automatisch eine vollständige Transkription des Interviews.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-gitflash-primary/20 flex items-center justify-center mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gitflash-primary">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gitflash-primary">KI-Analyse und Feedback</h3>
                  <p className="text-gitflash-text">Automatisierte Auswertung Ihrer Antworten und detailliertes Feedback.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-gitflash-primary/20 flex items-center justify-center mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gitflash-primary">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gitflash-primary">Wiederholbare Übungsinterviews</h3>
                  <p className="text-gitflash-text">Üben Sie mit verschiedenen Interview-Szenarien und verbessern Sie Ihre Fähigkeiten.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
