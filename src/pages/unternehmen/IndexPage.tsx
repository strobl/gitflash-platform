
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function UnternehmenIndexPage() {
  // Diese Seite leitet automatisch zur Jobs-Übersicht weiter
  return <Navigate to="/unternehmen/jobs" replace />;
}
