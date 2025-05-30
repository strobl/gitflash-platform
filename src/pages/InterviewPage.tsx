
import React from 'react';
import { useParams } from 'react-router-dom';

export default function InterviewPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Interview Session</h1>
        <p className="mb-4">Session ID: {sessionId}</p>
        <p>Interview-Interface wird noch implementiert.</p>
      </div>
    </div>
  );
}
