
import React, { useEffect } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

const Impressum: React.FC = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="bg-white overflow-hidden w-full">
        <div className="w-full">
          <div className="bg-white flex w-full flex-col overflow-hidden items-center">
            <div className="max-w-6xl w-full px-6 lg:px-8 mx-auto">
              <Header />
              
              <div className="pt-10 pb-20">
                <h1 className="text-[#0A2540] text-3xl font-bold mb-8">Impressum</h1>
                <h2 className="text-[#0A2540] text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
                
                <div className="text-[#546679] space-y-6">
                  <p>
                    GitFlash GmbH<br />
                    Gemmingenstraße 18<br />
                    85072 Eichstätt<br />
                    Deutschland
                  </p>
                  
                  <div>
                    <h3 className="text-[#0A2540] font-semibold mb-2">Vertreten durch die Geschäftsführer:</h3>
                    <p>Michael Strobl, Christian Strobl</p>
                  </div>
                  
                  <div>
                    <h3 className="text-[#0A2540] font-semibold mb-2">Kontakt:</h3>
                    <p>E-Mail: info@gitflash.com</p>
                  </div>
                  
                  <div>
                    <h3 className="text-[#0A2540] font-semibold mb-2">Registereintrag:</h3>
                    <p>
                      Eintragung im Handelsregister.<br />
                      Registergericht: Amtsgericht Ingolstadt<br />
                      Registernummer: HRB 11668
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-[#0A2540] font-semibold mb-2">Umsatzsteuer-ID:</h3>
                    <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE368731999</p>
                  </div>
                  
                  <div>
                    <h3 className="text-[#0A2540] font-semibold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h3>
                    <p>
                      Christian Strobl<br />
                      Gemmingenstraße 18<br />
                      85072 Eichstätt
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Impressum;
