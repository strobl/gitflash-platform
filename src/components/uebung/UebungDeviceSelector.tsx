
import React, { useEffect, useState } from "react";
import { 
  Select, 
  SelectTrigger, 
  SelectContent, 
  SelectItem, 
  SelectValue 
} from "@/components/ui/select";
import { useDevices } from "@daily-co/daily-react";
import { toast } from "sonner";

export const UebungDeviceSelector: React.FC = () => {
  // Get device information from Daily's hook
  const { 
    cameras, microphones, speakers, 
    setCamera, setMicrophone, setSpeaker 
  } = useDevices();
  
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [selectedMicId, setSelectedMicId] = useState<string>('');
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string>('');
  
  // Store selected devices and apply when they change
  useEffect(() => {
    if (cameras && cameras.length > 0) {
      const selected = cameras.find(cam => cam.selected);
      if (selected) {
        setSelectedCameraId(selected.device.deviceId);
      }
    }
  }, [cameras]);
  
  useEffect(() => {
    if (microphones && microphones.length > 0) {
      const selected = microphones.find(mic => mic.selected);
      if (selected) {
        setSelectedMicId(selected.device.deviceId);
      }
    }
  }, [microphones]);
  
  useEffect(() => {
    if (speakers && speakers.length > 0) {
      const selected = speakers.find(spk => spk.selected);
      if (selected) {
        setSelectedSpeakerId(selected.device.deviceId);
      }
    }
  }, [speakers]);
  
  // Custom handlers with error handling and feedback
  const handleCameraChange = (deviceId: string) => {
    try {
      console.log("Changing camera to:", deviceId);
      setCamera(deviceId);
      setSelectedCameraId(deviceId);
      toast.success('Kamera erfolgreich geändert');
    } catch (err) {
      console.error("Error changing camera:", err);
      toast.error('Fehler beim Ändern der Kamera');
    }
  };
  
  const handleMicChange = (deviceId: string) => {
    try {
      console.log("Changing microphone to:", deviceId);
      setMicrophone(deviceId);
      setSelectedMicId(deviceId);
      toast.success('Mikrofon erfolgreich geändert');
    } catch (err) {
      console.error("Error changing microphone:", err);
      toast.error('Fehler beim Ändern des Mikrofons');
    }
  };
  
  const handleSpeakerChange = (deviceId: string) => {
    try {
      console.log("Changing speaker to:", deviceId);
      setSpeaker(deviceId);
      setSelectedSpeakerId(deviceId);
      toast.success('Lautsprecher erfolgreich geändert');
    } catch (err) {
      console.error("Error changing speaker:", err);
      toast.error('Fehler beim Ändern des Lautsprechers');
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gitflash-primary mb-4">
        Geräteauswahl
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        {/* Camera Selection */}
        <div className="space-y-2">
          <label htmlFor="camera-select" className="text-sm font-medium text-gray-700">
            Kamera
          </label>
          <Select 
            value={selectedCameraId}
            onValueChange={handleCameraChange}
            disabled={!cameras || cameras.length === 0}
          >
            <SelectTrigger id="camera-select" className="w-full">
              <SelectValue placeholder="Kamera auswählen" />
            </SelectTrigger>
            <SelectContent>
              {cameras?.map((camera) => (
                <SelectItem 
                  key={camera.device.deviceId} 
                  value={camera.device.deviceId}
                >
                  {camera.device.label || `Kamera ${camera.device.deviceId.slice(0, 5)}...`}
                </SelectItem>
              ))}
              {(!cameras || cameras.length === 0) && (
                <SelectItem value="no-cameras">Keine Kameras gefunden</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        {/* Microphone Selection */}
        <div className="space-y-2">
          <label htmlFor="microphone-select" className="text-sm font-medium text-gray-700">
            Mikrofon
          </label>
          <Select 
            value={selectedMicId}
            onValueChange={handleMicChange}
            disabled={!microphones || microphones.length === 0}
          >
            <SelectTrigger id="microphone-select" className="w-full">
              <SelectValue placeholder="Mikrofon auswählen" />
            </SelectTrigger>
            <SelectContent>
              {microphones?.map((mic) => (
                <SelectItem 
                  key={mic.device.deviceId} 
                  value={mic.device.deviceId}
                >
                  {mic.device.label || `Mikrofon ${mic.device.deviceId.slice(0, 5)}...`}
                </SelectItem>
              ))}
              {(!microphones || microphones.length === 0) && (
                <SelectItem value="no-mics">Keine Mikrofone gefunden</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        {/* Speaker Selection - Only supported in some browsers */}
        <div className="space-y-2">
          <label htmlFor="speaker-select" className="text-sm font-medium text-gray-700">
            Lautsprecher
          </label>
          <Select 
            value={selectedSpeakerId}
            onValueChange={handleSpeakerChange}
            disabled={!speakers || speakers.length === 0}
          >
            <SelectTrigger id="speaker-select" className="w-full">
              <SelectValue placeholder="Lautsprecher auswählen" />
            </SelectTrigger>
            <SelectContent>
              {speakers?.map((speaker) => (
                <SelectItem 
                  key={speaker.device.deviceId} 
                  value={speaker.device.deviceId}
                >
                  {speaker.device.label || `Lautsprecher ${speaker.device.deviceId.slice(0, 5)}...`}
                </SelectItem>
              ))}
              {(!speakers || speakers.length === 0) && (
                <SelectItem value="no-speakers">Keine Lautsprecher gefunden</SelectItem>
              )}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Hinweis: Die Lautsprecherauswahl wird nicht von allen Browsern unterstützt.
          </p>
        </div>
      </div>
    </div>
  );
};
