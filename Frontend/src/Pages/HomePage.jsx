import React from "react";
import Hero from "../Components/HomePage/Hero";
import Companies from "../Components/HomePage/Companies";
import JobCategory from "../Components/HomePage/JobCategory";
import WorkingSteps from "../Components/HomePage/WorkingSteps";
import Testimonials from "../Components/HomePage/Testimonials";
import Subscribe from "../Components/HomePage/Subscribe";

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
