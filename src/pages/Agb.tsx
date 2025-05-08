
import React, { useEffect } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

const Agb: React.FC = () => {
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
                <h1 className="text-[#0A2540] text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
                
                <div className="text-[#546679] space-y-6">
                  <p>
                    Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") regeln die Nutzung der GitFlash-Plattform (nachfolgend „Plattform"), 
                    betrieben von der GitFlash GmbH, Gemmingenstraße 18, 85072 Eichstätt („GitFlash"), durch Unternehmen („Kunden") sowie Kandidaten („Kandidaten"). 
                    Durch Nutzung der Plattform stimmen Kunden und Kandidaten diesen AGB verbindlich zu.
                  </p>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">1. Leistungsgegenstand</h2>
                    <p>
                      GitFlash bietet eine Online-Plattform zur Vermittlung von Kandidaten an Unternehmen an. 
                      Dies umfasst die Identifikation, Evaluierung und Vorstellung von Kandidaten mittels KI-gestützter Interviews und Assessments.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">2. Nicht-Umgehung</h2>
                    <p>
                      Der Kunde erkennt an, dass GitFlash ein geschütztes Interesse an den Beziehungen zu Kandidaten besitzt, die über die Plattform 
                      identifiziert oder vorgestellt werden. Dem Kunden ist es untersagt, ohne vorherige ausdrückliche Zustimmung von GitFlash, 
                      Kandidaten direkt oder indirekt abzuwerben, einzustellen oder eigene Vertragsbeziehungen außerhalb der Plattform einzugehen. 
                      Ein Verstoß gegen diese Regelung stellt eine wesentliche Vertragsverletzung dar und führt zu Schadensersatzpflichten.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">3. Verbot der Datenextraktion</h2>
                    <p>
                      Die Nutzung der Plattform ist ausschließlich zur Ansicht und Evaluierung der bereitgestellten Informationen gestattet. 
                      Das Herunterladen, Kopieren oder die Extraktion von Daten (inkl. Lebensläufen, Interview-Aufzeichnungen, Transkripten und 
                      sonstigen Kandidatendaten) ist strengstens untersagt. Verstöße werden rechtlich verfolgt.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">4. Gehaltsverhandlungen</h2>
                    <p>
                      Alle Gehaltsverhandlungen zwischen Kunden und Kandidaten erfolgen ausschließlich über GitFlash. 
                      Der Kunde verpflichtet sich, keine direkten Gehaltsverhandlungen mit Kandidaten zu führen. 
                      Wünsche bezüglich der Anpassung von Gehältern sind GitFlash mitzuteilen.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">5. Vermittlungsgebühr</h2>
                    <p>
                      Sollte ein Kunde Kandidaten, die über GitFlash vorgestellt wurden, direkt beschäftigen oder direkt entlohnen, 
                      fällt eine Vermittlungsgebühr an. Diese Gebühr beträgt in der Regel 30 % der vereinbarten Jahresvergütung. 
                      GitFlash behält sich jedoch das Recht vor, die Gebühr je nach Kandidatenprofil, Branche oder sonstigen Faktoren anzupassen. 
                      Die Festsetzung der Gebühr durch GitFlash ist verbindlich.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">6. Zahlungsbedingungen</h2>
                    <p>
                      Die Vermittlungsgebühr wird innerhalb von 30 Tagen nach Arbeitsbeginn des Kandidaten fällig. 
                      Bei verspäteter Zahlung ist GitFlash berechtigt, Verzugszinsen in Höhe von 1,5 % pro Monat oder dem gesetzlich 
                      zulässigen Höchstsatz zu berechnen.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">7. Ausschluss von der Plattform</h2>
                    <p>
                      GitFlash behält sich vor, Kunden oder Kandidaten jederzeit und nach eigenem Ermessen von der Nutzung der Plattform auszuschließen. 
                      Gründe hierfür sind insbesondere Zahlungsverzug, Verletzung dieser AGB, missbräuchliches Verhalten gegenüber Kandidaten oder 
                      jegliches Verhalten, das GitFlash als schädigend einstuft.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">8. Haftungsfreistellung</h2>
                    <p>
                      Kunden und Kandidaten verpflichten sich gegenseitig, GitFlash sowie deren Mitarbeiter, Geschäftsführer und 
                      Vertreter von sämtlichen Ansprüchen, Schäden oder Kosten freizustellen, die aus der Nutzung der Plattform oder 
                      aus Verletzungen dieser AGB resultieren.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">9. Datenschutz</h2>
                    <p>
                      Die Erhebung, Verarbeitung und Nutzung personenbezogener Daten erfolgt gemäß der Datenschutzerklärung von GitFlash, 
                      die integraler Bestandteil dieser AGB ist.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">10. Änderung der AGB</h2>
                    <p>
                      GitFlash behält sich vor, diese AGB jederzeit ohne vorherige Ankündigung zu ändern oder anzupassen. 
                      Änderungen treten mit Veröffentlichung auf der Plattform in Kraft. Nutzer werden über wesentliche Änderungen informiert, 
                      sind jedoch eigenverantwortlich verpflichtet, die AGB regelmäßig auf Aktualisierungen zu prüfen. 
                      Die fortgesetzte Nutzung der Plattform nach Änderung der AGB gilt als Zustimmung zu den aktualisierten Bedingungen.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">11. Schlussbestimmungen</h2>
                    <p>
                      Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen 
                      hiervon unberührt. Anstelle der unwirksamen Regelung gilt eine wirksame Regelung als vereinbart, die dem ursprünglichen 
                      Zweck am nächsten kommt.
                    </p>
                    <p className="mt-3">
                      Gerichtsstand ist Ingolstadt, soweit gesetzlich zulässig.
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <p>
                      GitFlash GmbH<br />
                      Gemmingenstraße 18<br />
                      85072 Eichstätt<br />
                      Deutschland
                    </p>
                    <p className="mt-3">
                      Kontakt: security@gitflash.com
                    </p>
                  </div>
                </div>
              </div>
              
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agb;
