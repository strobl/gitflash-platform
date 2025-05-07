import React from "react";
import NavBar from "./NavBar";
import InterviewPrep from "./InterviewPrep";
import InterviewDetails from "./InterviewDetails";
import SimilarInterviews from "./SimilarInterviews";

const AlleInterviews: React.FC = () => {
  return (
    <main className="bg-white max-w-[480px] w-full overflow-hidden mx-auto pb-[53px] rounded-xl">
      <div className="w-full">
        <NavBar />
        <InterviewPrep />
        <section className="w-full bg-white pb-8 px-4">
          <InterviewDetails />
          <SimilarInterviews />
        </section>
      </div>
    </main>
  );
};

export default AlleInterviews;
