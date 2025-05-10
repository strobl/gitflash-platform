
import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import ProfileNavigation from "./ProfileNavigation";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import AwardsSection from "./AwardsSection";
import ProjectsSection from "./ProjectsSection";
import ProfileFooter from "./ProfileFooter";

const ProfileView: React.FC = () => {
  const [activeTab, setActiveTab] = useState("experience");

  const renderActiveSection = () => {
    switch (activeTab) {
      case "experience":
        return <ExperienceSection />;
      case "education":
        return <EducationSection />;
      case "awards":
        return <AwardsSection />;
      case "projects":
        return <ProjectsSection />;
      default:
        return <ExperienceSection />;
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white flex w-full flex-col mx-auto rounded-xl md:w-3/4 lg:w-2/3 xl:w-1/2 relative">
        <div className="w-full flex flex-col">
          <ProfileHeader />
          <div className="mb-16"> {/* Added padding at the bottom to prevent content from being hidden behind the footer */}
            <ProfileCard />
            <ProfileNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="min-h-[60vh]"> {/* Ensure content area has minimum height */}
              {renderActiveSection()}
            </div>
          </div>
          <ProfileFooter />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
