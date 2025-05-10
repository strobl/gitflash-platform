
import React from "react";
import { TeamDashboard } from "@/components/team/TeamDashboard";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <TeamDashboard className="w-full h-full min-h-screen md:max-w-3xl lg:max-w-4xl mx-auto" />
    </div>
  );
}
