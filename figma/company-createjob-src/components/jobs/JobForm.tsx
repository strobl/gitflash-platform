import React, { useState } from 'react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import TiptapEditor from '@/components/editor/TiptapEditor';
import { Checkbox } from '@/components/ui/checkbox';

interface JobFormProps {
  onClose: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: 'Remote',
    description: '',
    contractType: 'Stundenweise',
    billingType: 'Stunden',
    hourlyRateMin: '0',
    hourlyRateMax: '0',
    referralBonus: '$250',
    interview: 'Keine',
    form: 'Keins',
    rejectionEmail: 'Hallo {{first_name}},\nvielen Dank für Ihr Interesse an dieser Position.\nLeider können wir Ihre Bewerbung in diesem Fall nicht weiter berücksichtigen.\n\nSie können gerne über aktuelle Möglichkeiten auf dem Laufenden bleiben.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setFormData(prev => ({ ...prev, description: content }));
  };

  const handleRejectionEmailChange = (content: string) => {
    setFormData(prev => ({ ...prev, rejectionEmail: content }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Close the form after submission
    onClose();
  };

  const [isApplicationProcessOpen, setIsApplicationProcessOpen] = useState(false);
  const [isRejectionProcessOpen, setIsRejectionProcessOpen] = useState(false);
  const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(false);
  const [automaticCommunication, setAutomaticCommunication] = useState(false);
  const [automaticRedirect, setAutomaticRedirect] = useState(false);

  return (
    <div className="bg-white relative flex w-full flex-col items-stretch justify-center pt-8 pb-5 px-4 rounded-[8px_8px_0px_0px]">
      <div className="z-0 flex w-full items-center gap-2">
        <h2 className="text-[#0A2540] text-base font-bold self-stretch my-auto">
          Jobanzeige erstellen
        </h2>
        <div className="text-[#546679] text-right text-[10px] font-normal self-stretch flex-1 shrink basis-[0%] my-auto">
          Entwurf gespeichert
        </div>
      </div>
      
      <div className="absolute z-0 flex w-80 flex-col h-[18px] px-16 py-2 right-0 top-0">
        <div className="flex w-[72px] shrink-0 h-0.5 bg-[#9DA8B3] rounded-lg" />
      </div>
      
      <button 
        onClick={onClose}
        className="absolute z-0 right-2.5 top-2.5"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/2d5f09fead57c2daae00b0c466cb11a6b97b272a?placeholderIfAbsent=true"
          className="aspect-[1] object-contain w-3 h-3"
          alt="Close"
        />
      </button>
      
      <form onSubmit={handleSubmit} className="z-0 w-full mt-4">
        <div className="w-full text-[10px]">
          <label className="text-[#0A2540] font-bold block" htmlFor="jobTitle">
            Jobtitel
          </label>
          <div className="border border-[color:var(--dark-dark\_4,#6C7C8C)] flex w-full flex-col overflow-hidden text-[#6C7C8C] font-medium justify-center mt-1.5 px-5 py-[11px] rounded-[30px] border-solid">
            <div className="flex items-center gap-2.5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/04408bd42f8baf19469d818f5b188a00a82ec055?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                alt="Job"
              />
              <input
                id="jobTitle"
                name="title"
                type="text"
                placeholder="Z.B: Baujurust:in, Projektleit"
                value={formData.title}
                onChange={handleChange}
                className="text-[#6C7C8C] self-stretch my-auto bg-transparent border-none outline-none w-full"
              />
            </div>
          </div>
        </div>
        
        <div className="w-full text-[10px] mt-2">
          <label className="text-[#0A2540] font-bold block" htmlFor="location">
            Ort
          </label>
          <div className="border border-[color:var(--dark-dark\_4,#6C7C8C)] flex w-full flex-col overflow-hidden text-[#6C7C8C] font-medium whitespace-nowrap justify-center mt-1.5 px-5 py-[11px] rounded-[30px] border-solid">
            <div className="flex items-center gap-2.5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/04408bd42f8baf19469d818f5b188a00a82ec055?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                alt="Location"
              />
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Remote"
                value={formData.location}
                onChange={handleChange}
                className="text-[#6C7C8C] self-stretch my-auto bg-transparent border-none outline-none w-full"
              />
            </div>
          </div>
        </div>
        
        <div className="w-full font-normal mt-2">
          <label className="text-[#0A2540] text-xs font-bold block" htmlFor="description">
            Beschreibung
          </label>
          <TiptapEditor 
            content={formData.description} 
            onChange={handleEditorChange} 
          />
          <div className="text-[#546679] text-[10px] mt-2">
            Je mehr Informationen Sie angeben, desto wahrscheinlicher ist
            es, dass qualifzierte Kandidat:innen sich bewerben.
          </div>
        </div>
        
        <div className="w-full text-[10px] mt-2">
          <label className="text-[#0A2540] font-bold block" htmlFor="contractType">
            Vertragsart
          </label>
          <div className="justify-center items-stretch border border-[color:var(--dark-dark\_4,#6C7C8C)] flex w-full gap-[40px_100px] overflow-hidden text-[#6C7C8C] font-medium whitespace-nowrap mt-1.5 px-5 py-[11px] rounded-[30px] border-solid">
            <div className="flex items-center gap-2.5 flex-1">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/facd7c26898c657bfb8e5a5ec4a186eb5f55449b?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                alt="Contract"
              />
              <select
                id="contractType"
                name="contractType"
                value={formData.contractType}
                onChange={(e) => setFormData(prev => ({ ...prev, contractType: e.target.value }))}
                className="text-[#6C7C8C] self-stretch my-auto bg-transparent border-none outline-none w-full appearance-none"
              >
                <option value="Stundenweise">Stundenweise</option>
                <option value="Festanstellung">Festanstellung</option>
                <option value="Projektbasis">Projektbasis</option>
              </select>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/76e2d5e17b2096a82340d3d8c04901347a3cae68?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-3.5 shrink-0"
              alt="Dropdown"
            />
          </div>
        </div>
        
        <div className="w-full text-[10px] mt-2">
          <label className="text-[#0A2540] font-bold block" htmlFor="billingType">
            Abrechnung
          </label>
          <div className="justify-center items-stretch border border-[color:var(--dark-dark\_4,#6C7C8C)] flex w-full gap-[40px_100px] overflow-hidden text-[#6C7C8C] font-medium whitespace-nowrap mt-1.5 px-5 py-[11px] rounded-[30px] border-solid">
            <div className="flex items-center gap-2.5 flex-1">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/facd7c26898c657bfb8e5a5ec4a186eb5f55449b?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                alt="Billing"
              />
              <select
                id="billingType"
                name="billingType"
                value={formData.billingType}
                onChange={(e) => setFormData(prev => ({ ...prev, billingType: e.target.value }))}
                className="text-[#6C7C8C] self-stretch my-auto bg-transparent border-none outline-none w-full appearance-none"
              >
                <option value="Stunden">Stunden</option>
                <option value="Tage">Tage</option>
                <option value="Monat">Monat</option>
              </select>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/76e2d5e17b2096a82340d3d8c04901347a3cae68?placeholderIfAbsent=true"
              className="aspect-[1] object-contain w-3.5 shrink-0"
              alt="Dropdown"
            />
          </div>
        </div>
        
        <div className="w-full text-[10px] mt-2">
          <label className="text-[#0A2540] font-bold block">
            Stundensatz
          </label>
          <div className="flex w-full items-center gap-1.5 text-[#6C7C8C] font-medium whitespace-nowrap mt-1.5">
            <div className="border border-[color:var(--dark-dark\_4,#6C7C8C)] self-stretch flex flex-col overflow-hidden justify-center flex-1 shrink basis-[0%] my-auto px-5 py-3 rounded-[30px] border-solid">
              <input
                type="text"
                name="hourlyRateMin"
                value={`€${formData.hourlyRateMin}`}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setFormData(prev => ({ ...prev, hourlyRateMin: value }));
                }}
                className="text-[#6C7C8C] self-stretch bg-transparent border-none outline-none w-full"
              />
            </div>
            <div className="text-[#546679] font-normal self-stretch my-auto">
              bis
            </div>
            <div className="border border-[color:var(--dark-dark\_4,#6C7C8C)] self-stretch flex flex-col overflow-hidden justify-center flex-1 shrink basis-[0%] my-auto px-5 py-3 rounded-[30px] border-solid">
              <input
                type="text"
                name="hourlyRateMax"
                value={`€${formData.hourlyRateMax}`}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setFormData(prev => ({ ...prev, hourlyRateMax: value }));
                }}
                className="text-[#6C7C8C] self-stretch bg-transparent border-none outline-none w-full"
              />
            </div>
          </div>
        </div>
        
        <div className="w-full text-[10px] mt-2">
          <label className="text-[#0A2540] font-bold block" htmlFor="referralBonus">
            Empfehlungsbonus
          </label>
          <div className="border border-[color:var(--dark-dark\_4,#6C7C8C)] flex w-full flex-col overflow-hidden text-[#6C7C8C] font-medium whitespace-nowrap justify-center mt-1.5 px-5 py-[11px] rounded-[30px] border-solid">
            <div className="flex items-center gap-2.5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/a69ef77fc2e5440bb24529f01076d6b8/d805ce79edf1b37d04b7293c18637d02ea235ba8?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-3.5 self-stretch shrink-0 my-auto"
                alt="Bonus"
              />
              <input
                id="referralBonus"
                name="referralBonus"
                type="text"
                value={formData.referralBonus}
                onChange={handleChange}
                className="text-[#6C7C8C] self-stretch my-auto bg-transparent border-none outline-none w-full"
              />
            </div>
          </div>
        </div>
        
        <div className="text-[#546679] text-[10px] font-normal mt-2">
          Fügen Sie eine Empfehlungsprämie hinzu: Für jede erfolgreiche
          Vermittlung über diese Anzeige kann ein Bonus vergeben werden.
          Jede Person kann einen
        </div>
        
        {/* Collapsible Menus - Linksbündig ausgerichtet */}
        <Collapsible 
          className="w-full mt-2" 
          open={isApplicationProcessOpen}
          onOpenChange={setIsApplicationProcessOpen}
        >
          <CollapsibleTrigger className="w-full text-left flex items-center justify-between bg-[#F5F6F7] px-5 py-[11px] rounded-[30px]">
            <div className="flex items-center">
              <span className="text-[10px] text-[#6C7C8C] font-medium">Bewerbungsprozess</span>
            </div>
            <ChevronDown className={`h-3.5 w-3.5 text-[#6C7C8C] transition-transform duration-200 ${isApplicationProcessOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-3 mt-1 bg-white border border-[#E7E9EC] rounded-lg">
            <div className="text-[10px] text-[#546679] mb-4">
              Definieren Sie den Bewerbungsprozess für diese Stelle.
            </div>
            
            <div className="space-y-4">
              {/* Interview Section */}
              <div>
                <label className="text-[#0A2540] text-xs font-bold block mb-2">Interview</label>
                <select
                  name="interview"
                  value={formData.interview}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-[30px] text-[10px] text-[#6C7C8C] appearance-none bg-white"
                >
                  <option value="Keine">Keine</option>
                  <option value="Telefoninterview">Telefoninterview</option>
                  <option value="Videointerview">Videointerview</option>
                  <option value="Vor-Ort-Interview">Vor-Ort-Interview</option>
                </select>
              </div>
              
              <button type="button" className="flex items-center justify-center w-full bg-[#F2F4F5] text-[#0A2540] text-[10px] font-medium py-3 px-4 rounded-[30px]">
                <span className="mr-2">+</span>
                Interview erstellen
              </button>
              
              <div className="text-[10px] text-[#546679]">
                Wählen Sie ein Interview aus, das Bewerbende absolvieren sollen.
              </div>
              
              {/* Formular Section */}
              <div className="mt-4">
                <label className="text-[#0A2540] text-xs font-bold block mb-2">Formular</label>
                <select
                  name="form"
                  value={formData.form}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-[30px] text-[10px] text-[#6C7C8C] appearance-none bg-white"
                >
                  <option value="Keins">Keins</option>
                  <option value="Standardformular">Standardformular</option>
                  <option value="Benutzerdefinierts Formular">Benutzerdefinierts Formular</option>
                </select>
              </div>
              
              <button type="button" className="flex items-center justify-center w-full bg-[#F2F4F5] text-[#0A2540] text-[10px] font-medium py-3 px-4 rounded-[30px]">
                <span className="mr-2">+</span>
                Formular erstellen
              </button>
              
              <div className="text-[10px] text-[#546679]">
                Fügen Sie ein Formular hinzu, um zusätzliche Fragen an Bewerbende zu stellen.
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible 
          className="w-full mt-2"
          open={isRejectionProcessOpen}
          onOpenChange={setIsRejectionProcessOpen}
        >
          <CollapsibleTrigger className="w-full text-left flex items-center justify-between bg-[#F5F6F7] px-5 py-[11px] rounded-[30px]">
            <div className="flex items-center">
              <span className="text-[10px] text-[#6C7C8C] font-medium">Absageprozess</span>
            </div>
            <ChevronDown className={`h-3.5 w-3.5 text-[#6C7C8C] transition-transform duration-200 ${isRejectionProcessOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-3 mt-1 bg-white border border-[#E7E9EC] rounded-lg">
            <div className="text-[10px] text-[#546679] mb-4">
              Definieren Sie den Prozess für Absagen bei dieser Stelle.
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[#0A2540] text-xs font-bold">Inhalt der Absage-E-Mail</label>
                  <button 
                    type="button"
                    className="text-[#0A2540] bg-white text-[10px] font-medium py-1 px-3 rounded-[30px] border border-[#0A2540]"
                  >
                    Vorlage wählen
                  </button>
                </div>

                <TiptapEditor 
                  content={formData.rejectionEmail} 
                  onChange={handleRejectionEmailChange}
                />
                
                <div className="text-[#546679] text-[10px] mt-2">
                  Sie können die Variable <span>&#123;&#123;first_name&#125;&#125;</span> verwenden, um die Nachricht für jede:n Kandidat:in individuell anzupassen.
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible 
          className="w-full mt-2"
          open={isAdvancedSettingsOpen}
          onOpenChange={setIsAdvancedSettingsOpen}
        >
          <CollapsibleTrigger className="w-full text-left flex items-center justify-between bg-[#F5F6F7] px-5 py-[11px] rounded-[30px]">
            <div className="flex items-center">
              <span className="text-[10px] text-[#6C7C8C] font-medium">Erweiterte Einstellungen</span>
            </div>
            <ChevronDown className={`h-3.5 w-3.5 text-[#6C7C8C] transition-transform duration-200 ${isAdvancedSettingsOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-3 mt-1 bg-white border border-[#E7E9EC] rounded-lg">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="automaticCommunication" 
                  checked={automaticCommunication}
                  onCheckedChange={(checked) => setAutomaticCommunication(checked === true)}
                  className="mt-0.5"
                />
                <div>
                  <label 
                    htmlFor="automaticCommunication" 
                    className="text-[#0A2540] text-[10px] font-bold cursor-pointer"
                  >
                    Automatische Kommunikation senden?
                  </label>
                  <p className="text-[#546679] text-[10px]">
                    Wir senden automatisierte Nachrichten an Ihre Bewerber:innen während des Bewerbungsprozesses, um die Erfolgsquote zu erhöhen. Diese Funktion kann jederzeit
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="automaticRedirect" 
                  checked={automaticRedirect}
                  onCheckedChange={(checked) => setAutomaticRedirect(checked === true)}
                  className="mt-0.5"
                />
                <div>
                  <label 
                    htmlFor="automaticRedirect" 
                    className="text-[#0A2540] text-[10px] font-bold cursor-pointer"
                  >
                    Automatisch zur Bewerbung weiterleiten?
                  </label>
                  <p className="text-[#546679] text-[10px]">
                    Kandidat:innen automatisch zur Bewerbungsseite weiterleiten, wenn sie die Anzeige aufrufen.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <button 
          type="submit"
          className="justify-center items-center flex min-h-9 w-full flex-col overflow-hidden text-sm text-white font-medium text-right bg-[#0A2540] mt-4 px-[25px] py-2.5 rounded-[100px]"
        >
          <span className="text-white gap-[5px]">
            Anzeige veröfentlichen
          </span>
        </button>
      </form>
    </div>
  );
};

export default JobForm;
