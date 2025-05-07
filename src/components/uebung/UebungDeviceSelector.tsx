
import React from "react";
import { 
  Select, 
  SelectTrigger, 
  SelectContent, 
  SelectItem, 
  SelectValue 
} from "@/components/ui/select";
import { useDevices } from "@daily-co/daily-react";

export const UebungDeviceSelector: React.FC = () => {
  // Get device information from Daily's hook
  const { 
    cameras, microphones, speakers, 
    setCamera, setMicrophone, setSpeaker 
  } = useDevices();
  
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
      <h3 className="text-lg font-semibold text-gitflash-primary mb-4">
        Geräteauswahl
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Camera Selection */}
        <div className="space-y-2">
          <label htmlFor="camera-select" className="text-sm font-medium text-gray-700">
            Kamera
          </label>
          <Select 
            value={cameras?.find(cam => cam.selected)?.device?.deviceId || ''}
            onValueChange={(deviceId) => setCamera(deviceId)}
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
            value={microphones?.find(mic => mic.selected)?.device?.deviceId || ''}
            onValueChange={(deviceId) => setMicrophone(deviceId)}
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
            value={speakers?.find(spk => spk.selected)?.device?.deviceId || ''}
            onValueChange={(deviceId) => setSpeaker(deviceId)}
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
