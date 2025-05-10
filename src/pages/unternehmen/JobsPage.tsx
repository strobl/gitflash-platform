
import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JobsPage() {
  // Hier würde später die JobsOverview-Komponente aus figma/company-jobs-src eingebunden
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Meine Jobs</h1>
        <Link to="/unternehmen/jobs/neu">
          <Button className="flex items-center gap-2 bg-gitflash-primary hover:bg-gitflash-primary/90">
            <Plus size={16} />
            <span>Neuer Job</span>
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center text-gray-500 py-12">
          <p className="mb-4">Sie haben noch keine Jobs erstellt.</p>
          <p>In den nächsten Schritten werden wir die Komponenten aus figma/company-jobs-src integrieren.</p>
        </div>
      </div>
    </div>
  );
}
