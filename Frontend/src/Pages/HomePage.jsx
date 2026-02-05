import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";

const HomePage = () => {
  return (
    /* flex-col: Stacks Header on top of Hero.
      h-screen: Forces the div to be exactly the height of the window.
      overflow-hidden: Prevents "accidental" scrolls from floating animations.
    */
    <div className="flex flex-col h-screen w-full bg-mine-shaft-950 font-['Poppins'] overflow-hidden">
      <Header />

      {/* flex-1: This tells the Hero container to grow and fill 
        all remaining space perfectly without guessing pixels.
      */}
      <main className="flex-1 w-full">
        <Hero />
      </main>
    </div>
  );
};

export default HomePage;
