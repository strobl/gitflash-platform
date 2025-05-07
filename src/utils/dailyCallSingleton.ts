
import DailyIframe from '@daily-co/daily-js';
import type { DailyCall } from '@daily-co/daily-js';

// Create a singleton instance of the DailyCall object
// This ensures we only have one instance throughout the application
let dailyCallSingleton: DailyCall | null = null;
let currentAudioOutputDeviceId: string | null = null;

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
        }
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
      
      // Set audio output device if one was previously selected
      if (currentAudioOutputDeviceId) {
        try {
          console.log(`Setting audio output device to ${currentAudioOutputDeviceId}`);
          dailyCallSingleton?.setOutputDeviceAsync({ outputDeviceId: currentAudioOutputDeviceId });
        } catch (error) {
          console.error("Failed to set audio output device on join:", error);
        }
      }
    });
    
    // New event listener for track-started to handle audio tracks
    dailyCallSingleton.on('track-started', (event) => {
      if (event.track.kind === 'audio' && !event.participant.local) {
        console.log("Remote audio track started");
        
        // When a remote audio track starts, ensure the output device is set
        if (currentAudioOutputDeviceId) {
          setTimeout(() => {
            try {
              console.log(`Setting audio output device for new track to ${currentAudioOutputDeviceId}`);
              dailyCallSingleton?.setOutputDeviceAsync({ outputDeviceId: currentAudioOutputDeviceId });
            } catch (error) {
              console.error("Failed to set audio output device for new track:", error);
            }
          }, 500); // Small delay to ensure the track is fully initialized
        }
      }
    });
    
    dailyCallSingleton.on('error', (e) => {
      console.error("Daily error:", e);
    });
    
    // Add cleanup for when the app unmounts
    window.addEventListener('beforeunload', () => {
      if (dailyCallSingleton) {
        console.log("Cleaning up Daily call singleton on window unload");
        try {
          dailyCallSingleton.leave();
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

// Function to set the audio output device
export const setAudioOutputDevice = async (deviceId: string): Promise<void> => {
  currentAudioOutputDeviceId = deviceId;
  
  if (dailyCallSingleton) {
    try {
      console.log(`Setting audio output device to ${deviceId}`);
      await dailyCallSingleton.setOutputDeviceAsync({ outputDeviceId: deviceId });
    } catch (error) {
      console.error("Error setting audio output device:", error);
      throw error;
    }
  } else {
    console.log("Daily call singleton not available, device ID will be applied when created");
  }
};

// Function to test audio output with a test sound
export const testAudioOutput = async (): Promise<void> => {
  if (!dailyCallSingleton) {
    console.error("Cannot test audio - Daily call singleton not available");
    throw new Error("Daily call singleton not available");
  }
  
  try {
    // Create and play a test tone
    const audioContext = new AudioContext();
    
    // Attempt to resume the AudioContext if needed (for autoplay policies)
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 440; // A4 note
    gainNode.gain.value = 0.1;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    // Play for 1 second then stop
    setTimeout(() => {
      oscillator.stop();
      audioContext.close();
    }, 1000);
    
    return Promise.resolve();
  } catch (error) {
    console.error("Error testing audio output:", error);
    throw error;
  }
};

// Function to properly destroy the singleton when needed
export const destroyDailyCallInstance = () => {
  if (dailyCallSingleton) {
    console.log("Destroying Daily call singleton");
    try {
      dailyCallSingleton.leave();
      dailyCallSingleton.destroy();
    } catch (error) {
      console.error("Error destroying Daily call:", error);
    }
    dailyCallSingleton = null;
  }
};
