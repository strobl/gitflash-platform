
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
  hasRedirectedFromLogin: boolean;
  setHasRedirectedFromLogin: (value: boolean) => void;
};

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export function CameraProvider({ children }: { children: ReactNode }) {
  const [shouldActivateCamera, setShouldActivateCamera] = useState(false);
  const [isInitiallyRequested, setInitiallyRequested] = useState(false);
  const [interviewRedirectId, setInterviewRedirectId] = useState<string | null>(null);
  const [isAutoActivationEnabled, setAutoActivationEnabled] = useState(false);
  const [hasRedirectedFromLogin, setHasRedirectedFromLogin] = useState(false);

  const activateCamera = () => {
    console.log("CameraContext: Camera activation requested via context");
    setShouldActivateCamera(true);
  };

  const deactivateCamera = () => {
    console.log("CameraContext: Camera deactivation requested via context");
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
        setInterviewRedirectId: (id) => {
          console.log("CameraContext: setInterviewRedirectId", id);
          setInterviewRedirectId(id);
        },
        isAutoActivationEnabled,
        setAutoActivationEnabled: (value) => {
          console.log("CameraContext: setAutoActivationEnabled", value);
          setAutoActivationEnabled(value);
        },
        hasRedirectedFromLogin,
        setHasRedirectedFromLogin: (value) => {
          console.log("CameraContext: setHasRedirectedFromLogin", value);
          setHasRedirectedFromLogin(value);
        }
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
