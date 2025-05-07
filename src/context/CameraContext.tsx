
import React, { createContext, useContext, useState, ReactNode } from 'react';
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
};

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export function CameraProvider({ children }: { children: ReactNode }) {
  const [shouldActivateCamera, setShouldActivateCamera] = useState(false);
  const [isInitiallyRequested, setInitiallyRequested] = useState(false);
  const [interviewRedirectId, setInterviewRedirectId] = useState<string | null>(null);
  const [isAutoActivationEnabled, setAutoActivationEnabled] = useState(true);

  const activateCamera = () => {
    console.log("Camera activation requested via context");
    setShouldActivateCamera(true);
  };

  const deactivateCamera = () => {
    console.log("Camera deactivation requested via context");
    setShouldActivateCamera(false);
  };

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
        setAutoActivationEnabled
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
