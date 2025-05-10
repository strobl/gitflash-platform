
import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JobsPage() {
  // Hier würde später die JobsList-Komponente aus figma/company-jobs-src eingebunden
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Meine Jobs</h1>
        <Link to="/unternehmen/jobs/neu">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>Neuer Job</span>
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500 py-12">
          Hier werden Ihre Jobangebote angezeigt.
          <br />
          In den nächsten Schritten werden wir die Komponenten aus figma/company-jobs-src integrieren.
        </p>
      </div>
    </div>
  );
}
