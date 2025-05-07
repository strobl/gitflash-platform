
import DailyIframe from '@daily-co/daily-js';
import type { DailyCall } from '@daily-co/daily-js';

// Create a singleton instance of the DailyCall object
// This ensures we only have one instance throughout the application
let dailyCallSingleton: DailyCall | null = null;

// Function to get or create the singleton Daily call object
export const getDailyCallInstance = (): DailyCall => {
  if (!dailyCallSingleton) {
    console.log("Creating new Daily call singleton");
    
    // Improved configuration for audio/video
    dailyCallSingleton = DailyIframe.createCallObject({
      // Enable both audio input and output explicitly
      audioSource: true,           // Microphone input
      videoSource: true,           // Camera input
      dailyConfig: {
        experimentalChromeVideoMuteLightOff: true,
        userMediaAudioConstraints: {
          echoCancellation: true,
          noiseSuppression: true,
        },
        // Explicitly enable speaker output
        userMediaAudioOutput: true,
      }
    });
    
    // Add listener to track connection state
    dailyCallSingleton.on('participant-updated', (event) => {
      if (event?.participant?.local) {
        console.log("Local participant updated:", 
          "audio:", event.participant.audio, 
          "video:", event.participant.video);
      }
    });
    
    dailyCallSingleton.on('joined-meeting', () => {
      console.log("Successfully joined meeting with audio/video capabilities");
    });
    
    dailyCallSingleton.on('error', (e) => {
      console.error("Daily error:", e);
    });
    
    // Add cleanup for when the app unmounts
    window.addEventListener('beforeunload', () => {
      if (dailyCallSingleton) {
        console.log("Cleaning up Daily call singleton on window unload");
        dailyCallSingleton.destroy().catch(console.error);
        dailyCallSingleton = null;
      }
    });
  } else {
    console.log("Using existing Daily call singleton");
  }
  
  return dailyCallSingleton;
};

// Function to properly destroy the singleton when needed
export const destroyDailyCallInstance = () => {
  if (dailyCallSingleton) {
    console.log("Destroying Daily call singleton");
    dailyCallSingleton.destroy().catch(console.error);
    dailyCallSingleton = null;
  }
};
