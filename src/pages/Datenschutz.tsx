
import React, { useEffect } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

const Datenschutz: React.FC = () => {
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
                <h1 className="text-[#0A2540] text-3xl font-bold mb-8">Datenschutzerklärung</h1>
                
                <div className="text-[#546679] space-y-6">
                  <p>
                    Wir freuen uns über Ihr Interesse an unserer Website. Der Schutz Ihrer Daten ist uns ein wichtiges Anliegen. 
                    Im Folgenden informieren wir Sie über die Erhebung, Verarbeitung und Nutzung personenbezogener Daten bei der 
                    Nutzung unserer Website gemäß der Datenschutz-Grundverordnung (DSGVO).
                  </p>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">1. Verantwortlicher</h2>
                    <p>
                      GitFlash GmbH<br />
                      Gemmingenstraße 18<br />
                      85072 Eichstätt<br />
                      Deutschland
                    </p>
                    <p className="mt-3">E-Mail: security@gitflash.com</p>
                    <p className="mt-3">Verantwortlich im Sinne der DSGVO ist die GitFlash GmbH.</p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">2. Zugriffsdaten und Hosting</h2>
                    <p>
                      Beim Besuch unserer Website werden automatisch sogenannte Server-Logfiles erfasst, die Ihr Browser übermittelt. 
                      Dazu gehören:
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-1">
                      <li>Browsertyp und -version</li>
                      <li>Verwendetes Betriebssystem</li>
                      <li>Referrer-URL</li>
                      <li>Hostname des zugreifenden Rechners</li>
                      <li>Uhrzeit der Serveranfrage</li>
                      <li>IP-Adresse</li>
                    </ul>
                    <p className="mt-3">
                      Die Verarbeitung dieser Daten erfolgt zur Gewährleistung eines reibungslosen Verbindungsaufbaus der 
                      Website und zur Systemsicherheit. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">3. Cookies und Einwilligungsmanagement</h2>
                    <p>Unsere Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die auf Ihrem Endgerät gespeichert werden.</p>
                    <ul className="list-disc pl-6 mt-3 space-y-2">
                      <li><strong>Technisch notwendige Cookies:</strong> Diese sind erforderlich, um die Website korrekt darzustellen.</li>
                      <li><strong>Einwilligungsbedürftige Cookies:</strong> Für Dienste wie Clarity, Meta Pixel oder LinkedIn Insight Tag holen wir über ein Cookie-Banner Ihre ausdrückliche Einwilligung ein (Art. 6 Abs. 1 lit. a DSGVO).</li>
                    </ul>
                    <p className="mt-3">Ihre Einwilligung können Sie jederzeit über das Cookie-Banner widerrufen oder ändern.</p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">4. Kontaktaufnahme</h2>
                    <p>
                      Wenn Sie uns kontaktieren (z. B. per E-Mail), verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage sowie für mögliche Anschlussfragen. 
                      Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung oder vorvertragliche Maßnahmen).
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">5. Microsoft Clarity</h2>
                    <p>
                      Diese Website nutzt Microsoft Clarity, einen Dienst der Microsoft Corporation zur Analyse der Benutzerinteraktionen 
                      (z. B. Mausbewegungen, Klicks, Scrollverhalten). Die Verarbeitung dient der Verbesserung der Benutzererfahrung.
                    </p>
                    <p className="mt-3">Clarity verarbeitet Informationen wie:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>IP-Adresse (gekürzt)</li>
                      <li>Gerätetyp und Browserinformationen</li>
                      <li>Besuchsdauer und Interaktionen</li>
                    </ul>
                    <p className="mt-3">
                      Daten können an Server außerhalb der EU, insbesondere in die USA, übertragen werden. Die Verarbeitung erfolgt nur nach Ihrer Einwilligung 
                      (Art. 6 Abs. 1 lit. a DSGVO).
                    </p>
                    <p className="mt-3">Details: <a href="https://privacy.microsoft.com/de-de/privacystatement" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://privacy.microsoft.com/de-de/privacystatement</a></p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">6. Meta (Facebook) Pixel</h2>
                    <p>
                      Wir setzen das Meta Pixel ein, um Besucheraktionen auf unserer Website nachvollziehen zu können und unsere Facebook-/Instagram-Werbeanzeigen zu optimieren.
                    </p>
                    <p className="mt-3">Verarbeitete Daten:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>IP-Adresse</li>
                      <li>Geräteinformationen</li>
                      <li>Interaktionen und aufgerufene Seiten</li>
                      <li>(Bei eingeloggten Nutzern) Verknüpfung mit Facebook-Profil</li>
                    </ul>
                    <p className="mt-3">
                      Die Datenverarbeitung erfolgt nur mit Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). 
                      Informationen: <a href="https://www.facebook.com/about/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://www.facebook.com/about/privacy</a>
                    </p>
                    <p className="mt-3">
                      Widerspruchsmöglichkeit: <a href="https://www.facebook.com/settings?tab=ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://www.facebook.com/settings?tab=ads</a>
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">7. LinkedIn Insight Tag</h2>
                    <p>
                      Unsere Website nutzt den LinkedIn Insight Tag, ein Tool der LinkedIn Ireland Unlimited Company zur Conversion-Messung und Zielgruppenanalyse.
                    </p>
                    <p className="mt-3">Erfasste Daten:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>IP-Adresse</li>
                      <li>Geräte- und Browserinformationen</li>
                      <li>Seitenaufrufe</li>
                      <li>Zeitstempel</li>
                    </ul>
                    <p className="mt-3">
                      Die Datenverarbeitung erfolgt auf Basis Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Eine Übermittlung an Server in den USA kann nicht ausgeschlossen werden.
                    </p>
                    <p className="mt-3">
                      Details: <a href="https://www.linkedin.com/legal/privacy-policy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/legal/privacy-policy</a><br />
                      Opt-out: <a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out</a>
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">8. Ihre Rechte</h2>
                    <p>Sie haben das Recht:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>auf Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                      <li>auf Berichtigung (Art. 16 DSGVO)</li>
                      <li>auf Löschung (Art. 17 DSGVO)</li>
                      <li>auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                      <li>auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                      <li>auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                    </ul>
                    <p className="mt-3">
                      Zur Ausübung Ihrer Rechte senden Sie bitte eine E-Mail an: security@gitflash.com
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">9. Beschwerderecht bei der Aufsichtsbehörde</h2>
                    <p>
                      Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen Datenschutzrecht verstößt, haben Sie das Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde:
                    </p>
                    <p className="mt-3">
                      Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)<br />
                      Promenade 27<br />
                      91522 Ansbach<br />
                      <a href="https://www.lda.bayern.de" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://www.lda.bayern.de</a>
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-[#0A2540] text-xl font-semibold mb-4">10. Aktualisierungen</h2>
                    <p>
                      Diese Datenschutzerklärung kann sich aufgrund gesetzlicher Änderungen oder neuer technischer Gegebenheiten ändern. 
                      Bitte informieren Sie sich regelmäßig über den aktuellen Stand.
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

export default Datenschutz;
