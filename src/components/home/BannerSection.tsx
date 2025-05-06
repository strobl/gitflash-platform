
export function BannerSection() {
  return (
    <section className="py-16 bg-gitflash-background full-width-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gitflash-primary mb-6">
            Optimieren Sie Ihren Recruiting-Prozess
          </h2>
          <p className="text-xl text-gitflash-text mb-8">
            GitFlash nutzt fortschrittliche KI-Technologie, um den Rekrutierungsprozess zu vereinfachen
            und sowohl für Talente als auch für Unternehmen eine effiziente Plattform zu bieten.
          </p>
          <div className="relative overflow-hidden rounded-xl shadow-2xl h-64 md:h-96">
            <div 
              className="absolute inset-0 bg-center bg-cover"
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')`,
                backgroundPosition: 'center 30%'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gitflash-primary/80 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white max-w-lg">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Finden Sie die richtigen Talente</h3>
              <p className="text-white/90">
                Mit unserer Plattform gewinnen Sie Zugang zu qualifizierten Fachkräften der Baubranche und 
                können Ihren Rekrutierungsprozess erheblich beschleunigen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
