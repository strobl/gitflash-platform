import React from "react";
import InterviewHeader from "./InterviewHeader";
import FeedbackList from "./FeedbackList";
import BottomNavigation from "./BottomNavigation";

const InterviewFeedback: React.FC = () => {
  return (
    <div className="flex flex-col w-80 h-[676px] bg-[#F2F4F6] rounded-xl">
      <div className="flex flex-col h-[677px] w-full">
        <div className="flex flex-col w-full">
          <InterviewHeader />
          <div className="flex flex-col gap-6 bg-[#F2F4F6] px-4 py-8">
            <h1 className="text-[#0A2540] text-xl font-bold">
              Sehen Sie Feedback zu Ihren bisherigen Interview-Leistungen
            </h1>
            <FeedbackList />
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default InterviewFeedback;
