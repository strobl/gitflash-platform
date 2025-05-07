
import DailyIframe from '@daily-co/daily-js';
import type { DailyCall } from '@daily-co/daily-js';

// Create a singleton instance of the DailyCall object
// This ensures we only have one instance throughout the application
let dailyCallSingleton: DailyCall | null = null;

// Function to get or create the singleton Daily call object
export const getDailyCallInstance = (): DailyCall => {
  if (!dailyCallSingleton) {
    console.log("Creating new Daily call singleton");
    
    // Use the correct configuration properties according to the Daily API types
    dailyCallSingleton = DailyIframe.createCallObject({
      // Use the supported properties for camera and microphone
      audioSource: true,
      videoSource: true,
      dailyConfig: {
        // Use supported properties from DailyAdvancedConfig
        userMediaAudioConstraints: {
          echoCancellation: true,
          noiseSuppression: true,
        },
        // Chrome video light fix - removed unsupported property
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
        try {
          dailyCallSingleton.destroy();
        } catch (error) {
          console.error("Error destroying Daily call:", error);
        }
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
    try {
      dailyCallSingleton.destroy();
    } catch (error) {
      console.error("Error destroying Daily call:", error);
    }
    dailyCallSingleton = null;
  }
};
