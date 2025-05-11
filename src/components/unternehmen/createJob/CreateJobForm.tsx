import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { useJobForm } from '@/hooks/useJobForm';
import { ChevronDown } from 'lucide-react';
import TiptapEditor from '@/components/editor/TiptapEditor';

export const CreateJobForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    formData, 
    updateField, 
    submitJob,
    errors,
    isSubmitting,
    isSaved
  } = useJobForm();

  const [isApplicationProcessOpen, setIsApplicationProcessOpen] = useState(false);
  const [isRejectionProcessOpen, setIsRejectionProcessOpen] = useState(false);
  const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitJob();
      toast({
        title: "Erfolg!",
        description: "Ihre Jobanzeige wurde erfolgreich veröffentlicht.",
      });
      navigate("/unternehmen/jobs");
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Es gab ein Problem beim Veröffentlichen der Jobanzeige.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white relative flex w-full flex-col items-stretch justify-center py-8 px-4 sm:pt-8 sm:pb-5 rounded-[8px_8px_0px_0px]">
      {/* Header */}
      <div className="z-0 flex w-full items-center gap-2">
        <h2 className="text-[#0A2540] text-base font-bold self-stretch my-auto">
          Jobanzeige erstellen
        </h2>
        {isSaved && (
          <div className="text-[#546679] text-right text-[10px] font-normal self-stretch flex-1 shrink basis-[0%] my-auto">
            Entwurf gespeichert
          </div>
        )}
      </div>
      
      {/* Progress indicator */}
      <div className="absolute z-0 flex w-80 flex-col h-[18px] px-16 py-2 right-0 top-0">
        <div className="flex w-[72px] shrink-0 h-0.5 bg-[#9DA8B3] rounded-lg" />
      </div>
      
      <form onSubmit={handleSubmit} className="z-0 w-full mt-4">
        {/* Job Title */}
        <div className="w-full text-[10px]">
          <label className="text-[#0A2540] font-bold block" htmlFor="jobTitle">
            Jobtitel
          </label>
          <div className={`border ${errors.title ? 'border-red-500' : 'border-[#6C7C8C]'} flex w-full flex-col overflow-hidden text-[#6C7C8C] font-medium justify-center mt-1.5 px-5 py-[11px] rounded-[30px] border-solid`}>
            <div className="flex items-center gap-2.5">
              <input
                id="jobTitle"
                type="text"
                placeholder="Z.B: Baujurust:in, Projektleit"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="text-[#6C7C8C] self-stretch my-auto bg-transparent border-none outline-none w-full"
              />
            </div>
          </div>
          {errors.title && (
            <p className="text-red-500 text-[10px] mt-1">{errors.title}</p>
          )}
        </div>
        
        {/* Location */}
        <div className="w-full text-[10px] mt-2">
          <label className="text-[#0A2540] font-bold block" htmlFor="location">
            Ort
          </label>
          <div className={`border ${errors.location ? 'border-red-500' : 'border-[#6C7C8C]'} flex w-full flex-col overflow-hidden text-[#6C7C8C] font-medium whitespace-nowrap justify-center mt-1.5 px-5 py-[11px] rounded-[30px] border-solid`}>
            <div className="flex items-center gap-2.5">
              <input
                id="location"
                type="text"
                placeholder="Remote"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                className="text-[#6C7C8C] self-stretch my-auto bg-transparent border-none outline-none w-full"
              />
            </div>
          </div>
          {errors.location && (
            <p className="text-red-500 text-[10px] mt-1">{errors.location}</p>
          )}
        </div>
        
        {/* Description */}
        <div className="w-full font-normal mt-2">
          <label className="text-[#0A2540] text-xs font-bold block" htmlFor="description">
            Beschreibung
          </label>
          <TiptapEditor 
            content={formData.description} 
            onChange={(content) => updateField('description', content)} 
          />
          <div className="text-[#546679] text-[10px] mt-2">
            Je mehr Informationen Sie angeben, desto wahrscheinlicher ist
            es, dass qualifzierte Kandidat:innen sich bewerben.
          </div>
          {errors.description && (
            <p className="text-red-500 text-[10px] mt-1">{errors.description}</p>
          )}
        </div>
        
        {/* Contract Type */}
        <div className="w-full text-[10px] mt-2">
          <label className="text-[#0A2540] font-bold block" htmlFor="contractType">
            Vertragsart
          </label>
          <div className="justify-center items-stretch border border-[#6C7C8C] flex w-full gap-[40px_100px] overflow-hidden text-[#6C7C8C] font-medium whitespace-nowrap mt-1.5 px-5 py-[11px] rounded-[30px] border-solid">
            <div className="flex items-center gap-2.5 flex-1">
              <select
                id="contractType"
                value={formData.contractType}
                onChange={(e) => updateField('contractType', e.target.value as any)}
                className="text-[#6C7C8C] self-stretch my-auto bg-transparent border-none outline-none w-full appearance-none"
              >
                <option value="fulltime">Vollzeit</option>
                <option value="parttime">Teilzeit</option>
                <option value="freelance">Freiberuflich</option>
                <option value="temporary">Befristet</option>
              </select>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-[#6C7C8C]" />
          </div>
          {errors.contractType && (
            <p className="text-red-500 text-[10px] mt-1">{errors.contractType}</p>
          )}
        </div>
        
        {/* Billing Type */}
        <div className="w-full text-[10px] mt-2">
          <label className="text-[#0A2540] font-bold block" htmlFor="billingType">
            Abrechnung
          </label>
          <div className="justify-center items-stretch border border-[#6C7C8C] flex w-full gap-[40px_100px] overflow-hidden text-[#6C7C8C] font-medium whitespace-nowrap mt-1.5 px-5 py-[11px] rounded-[30px] border-solid">
            <div className="flex items-center gap-2.5 flex-1">
              <select
                id="billingType"
                value={formData.billingType}
                onChange={(e) => updateField('billingType', e.target.value as any)}
                className="text-[#6C7C8C] self-stretch my-auto bg-transparent border-none outline-none w-full appearance-none"
              >
                <option value="Stunden">Stunden</option>
                <option value="Tage">Tage</option>
                <option value="Monat">Monat</option>
              </select>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-[#6C7C8C]" />
          </div>
          {errors.billingType && (
            <p className="text-red-500 text-[10px] mt-1">{errors.billingType}</p>
          )}
        </div>
        
        {/* Hourly Rate */}
        <div className="w-full text-[10px] mt-2">
          <label className="text-[#0A2540] font-bold block">
            Stundensatz
          </label>
          <div className="flex w-full items-center gap-1.5 text-[#6C7C8C] font-medium whitespace-nowrap mt-1.5">
            <div className="border border-[#6C7C8C] self-stretch flex flex-col overflow-hidden justify-center flex-1 shrink basis-[0%] my-auto px-5 py-3 rounded-[30px] border-solid">
              <input
                type="text"
                value={`€${formData.hourlyRateMin}`}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  updateField('hourlyRateMin', value);
                }}
                className="text-[#6C7C8C] self-stretch bg-transparent border-none outline-none w-full"
              />
            </div>
            <div className="text-[#546679] font-normal self-stretch my-auto">
              bis
            </div>
            <div className="border border-[#6C7C8C] self-stretch flex flex-col overflow-hidden justify-center flex-1 shrink basis-[0%] my-auto px-5 py-3 rounded-[30px] border-solid">
              <input
                type="text"
                value={`€${formData.hourlyRateMax}`}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  updateField('hourlyRateMax', value);
                }}
                className="text-[#6C7C8C] self-stretch bg-transparent border-none outline-none w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Referral Bonus */}
        <div className="w-full text-[10px] mt-2">
          <label className="text-[#0A2540] font-bold block" htmlFor="referralBonus">
            Empfehlungsbonus
          </label>
          <div className="border border-[#6C7C8C] flex w-full flex-col overflow-hidden text-[#6C7C8C] font-medium whitespace-nowrap justify-center mt-1.5 px-5 py-[11px] rounded-[30px] border-solid">
            <input
              id="referralBonus"
              type="text"
              value={formData.referralBonus}
              onChange={(e) => updateField('referralBonus', e.target.value)}
              className="text-[#6C7C8C] self-stretch my-auto bg-transparent border-none outline-none w-full"
            />
          </div>
        </div>
        
        <div className="text-[#546679] text-[10px] font-normal mt-2">
          Fügen Sie eine Empfehlungsprämie hinzu: Für jede erfolgreiche
          Vermittlung über diese Anzeige kann ein Bonus vergeben werden.
        </div>
        
        {/* Collapsible Sections */}
        {/* Application Process */}
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
                  value={formData.interview}
                  onChange={(e) => updateField('interview', e.target.value as any)}
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
              
              {/* Form Section */}
              <div className="mt-4">
                <label className="text-[#0A2540] text-xs font-bold block mb-2">Formular</label>
                <select
                  value={formData.form}
                  onChange={(e) => updateField('form', e.target.value as any)}
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
        
        {/* Rejection Process */}
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
                  onChange={(content) => updateField('rejectionEmail', content)}
                />
                
                <div className="text-[#546679] text-[10px] mt-2">
                  Sie können die Variable <span>&#123;&#123;first_name&#125;&#125;</span> verwenden, um die Nachricht für jede:n Kandidat:in individuell anzupassen.
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Advanced Settings */}
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
                  checked={formData.automaticCommunication}
                  onCheckedChange={(checked) => updateField('automaticCommunication', !!checked)}
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
                  checked={formData.automaticRedirect}
                  onCheckedChange={(checked) => updateField('automaticRedirect', !!checked)}
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
          disabled={isSubmitting}
          className="justify-center items-center flex min-h-9 w-full flex-col overflow-hidden text-sm text-white font-medium text-right bg-[#0A2540] mt-4 px-[25px] py-2.5 rounded-[100px] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="text-white gap-[5px]">
            {isSubmitting ? "Wird veröffentlicht..." : "Anzeige veröfentlichen"}
          </span>
        </button>
      </form>
    </div>
  );
};
