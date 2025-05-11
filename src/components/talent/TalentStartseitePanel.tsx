import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const TalentStartseitePanel: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Willkommen bei GitFlash</h2>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="text-gray-700">
            Hier findest du deine personalisierte Startseite mit allen wichtigen Informationen und Aktualisierungen.
          </p>
        </CardContent>
      </Card>
      
      {/* Add more content here as needed */}
    </div>
  );
};

export default TalentStartseitePanel;
