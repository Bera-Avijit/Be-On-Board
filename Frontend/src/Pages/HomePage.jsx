import React from "react";
import Hero from "../Components/Hero";
import Companies from "../Components/Companies";
import JobCategory from "../Components/JobCategory";
import WorkingSteps from "../Components/WorkingSteps";
import Testimonials from "../Components/Testimonials";
import Subscribe from "../Components/Subscribe";

const HomePage = () => {
  return (
    <div className="w-full bg-mine-shaft-950 font-['Poppins']">
      <Hero />
      <Companies />
      <JobCategory />
      <WorkingSteps />
      <Testimonials />
      <Subscribe />
    </div>
  );
};

export default HomePage;
