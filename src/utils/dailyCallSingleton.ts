
import DailyIframe from '@daily-co/daily-js';
import type { DailyCall } from '@daily-co/daily-js';

// Create a singleton instance of the DailyCall object
// This ensures we only have one instance throughout the application
let dailyCallSingleton: DailyCall | null = null;

// Function to get or create the singleton Daily call object
export const getDailyCallInstance = (): DailyCall => {
  if (!dailyCallSingleton) {
    console.log("Creating new Daily call singleton");
    dailyCallSingleton = DailyIframe.createCallObject({
      audioSource: true,
      videoSource: true,
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
