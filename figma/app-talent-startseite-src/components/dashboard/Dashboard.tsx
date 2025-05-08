
import React from "react";
import Header from "./Header";
import WelcomeSection from "./WelcomeSection";
import TabNavigation from "./TabNavigation";
import EmptyStateCard from "./EmptyStateCard";
import BottomNavigation from "./BottomNavigation";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 pb-24">
        <WelcomeSection userName="James" />
        <div className="px-4">
          <TabNavigation />
          <EmptyStateCard />
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
