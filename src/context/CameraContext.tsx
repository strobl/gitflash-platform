
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getDailyCallInstance } from "@/utils/dailyCallSingleton";

type CameraContextType = {
  shouldActivateCamera: boolean;
  activateCamera: () => void;
  deactivateCamera: () => void;
  isInitiallyRequested: boolean;
  setInitiallyRequested: (value: boolean) => void;
  interviewRedirectId: string | null;
  setInterviewRedirectId: (id: string | null) => void;
  isAutoActivationEnabled: boolean;
  setAutoActivationEnabled: (value: boolean) => void;
  hasRedirectedFromLogin: boolean;
  setHasRedirectedFromLogin: (value: boolean) => void;
};

const CameraContext = createContext<CameraContextType | undefined>(undefined);

// Using localStorage to persist important flags between page navigations
const getStoredValue = (key: string, defaultValue: any) => {
  try {
    const stored = localStorage.getItem(`camera_context_${key}`);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const storeValue = (key: string, value: any) => {
  try {
    localStorage.setItem(`camera_context_${key}`, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing ${key} to localStorage:`, error);
  }
};

export function CameraProvider({ children }: { children: ReactNode }) {
  // Initialize state with values from localStorage if available
  const [shouldActivateCamera, setShouldActivateCamera] = useState(false);
  const [isInitiallyRequested, setInitiallyRequested] = useState(false);
  const [interviewRedirectId, setInterviewRedirectIdState] = useState<string | null>(
    getStoredValue('interviewRedirectId', null)
  );
  const [isAutoActivationEnabled, setAutoActivationEnabledState] = useState(
    getStoredValue('isAutoActivationEnabled', false)
  );
  const [hasRedirectedFromLogin, setHasRedirectedFromLoginState] = useState(
    getStoredValue('hasRedirectedFromLogin', false)
  );

  // Use effect to persist values to localStorage
  useEffect(() => {
    storeValue('interviewRedirectId', interviewRedirectId);
  }, [interviewRedirectId]);

  useEffect(() => {
    storeValue('isAutoActivationEnabled', isAutoActivationEnabled);
  }, [isAutoActivationEnabled]);

  useEffect(() => {
    storeValue('hasRedirectedFromLogin', hasRedirectedFromLogin);
  }, [hasRedirectedFromLogin]);

  const activateCamera = () => {
    console.log("CameraContext: Camera activation requested via context");
    setShouldActivateCamera(true);
  };

  const deactivateCamera = () => {
    console.log("CameraContext: Camera deactivation requested via context");
    setShouldActivateCamera(false);
  };

  const setInterviewRedirectId = (id: string | null) => {
    console.log("CameraContext: setInterviewRedirectId", id);
    setInterviewRedirectIdState(id);
  };

  const setAutoActivationEnabled = (value: boolean) => {
    console.log("CameraContext: setAutoActivationEnabled", value);
    setAutoActivationEnabledState(value);
  };

  const setHasRedirectedFromLogin = (value: boolean) => {
    console.log("CameraContext: setHasRedirectedFromLogin", value);
    setHasRedirectedFromLoginState(value);
  };

  // Log current state for debugging
  useEffect(() => {
    console.log("CameraContext current state:", {
      interviewRedirectId,
      isAutoActivationEnabled,
      hasRedirectedFromLogin,
      shouldActivateCamera
    });
  }, [interviewRedirectId, isAutoActivationEnabled, hasRedirectedFromLogin, shouldActivateCamera]);

  return (
    <CameraContext.Provider
      value={{
        shouldActivateCamera,
        activateCamera,
        deactivateCamera,
        isInitiallyRequested,
        setInitiallyRequested,
        interviewRedirectId,
        setInterviewRedirectId,
        isAutoActivationEnabled,
        setAutoActivationEnabled,
        hasRedirectedFromLogin,
        setHasRedirectedFromLogin
      }}
    >
      {children}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  const context = useContext(CameraContext);
  if (context === undefined) {
    throw new Error('useCamera must be used within a CameraProvider');
  }
  return context;
}
