import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Companies from "../Components/Companies";
import JobCategory from "../Components/JobCategory";
import WorkingSteps from "../Components/WorkingSteps";
import Testimonials from "../Components/Testimonials";
import Subscribe from "../Components/Subscribe";
import Footer from "../Components/Footer";

const HomePage = () => {
  return (
    /* flex-col: Stacks Header on top of Hero.
      h-screen: Forces the div to be exactly the height of the window.
      overflow-hidden: Prevents "accidental" scrolls from floating animations.
    */
    <div className="flex flex-col min-h-screen w-full bg-mine-shaft-950 font-['Poppins']">
      <Header />

      {/* flex-1: This tells the Hero container to grow and fill 
        all remaining space perfectly without guessing pixels.
      */}
      <main className="flex-1 w-full">
        <Hero />
        <Companies />
        <JobCategory />
        <WorkingSteps />
        <Testimonials />
        <Subscribe />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
