import { Avatar } from "@mantine/core";
import React from "react";

const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col md:flex-row items-center justify-between px-6 lg:px-20 py-10 bg-mine-shaft-950 overflow-hidden">
      {/* Left Content Area */}
      <div className="z-10 flex flex-col w-full md:w-3/5 space-y-6">
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Find your <span className="text-bright-sun-400">dream job</span>{" "}
          <br />
          with us.
        </h1>

        <p className="max-w-xl text-lg lg:text-xl text-gray-400 font-medium leading-relaxed">
          A good life begins with a good company. Start exploring thousands of
          job opportunities in one place with our smart search engine.
        </p>

        {/* Search / CTA Area */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="px-8 py-4 bg-bright-sun-400/80 hover:bg-bright-sun-500 text-black font-very-bold rounded-xl transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
            Explore Jobs
          </button>
          <button className="px-8 py-4 bg-transparent border border-gray-700 hover:border-bright-sun-400 text-white font-extrabold rounded-xl transition-all">
            How it works
          </button>
        </div>

        {/* Simple Trust Badge */}
        <div className="flex items-center gap-3 pt-6 text-sm text-gray-400">
          <Avatar.Group spacing="sm">
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
              radius="xl"
              border={2}
              className="border-mine-shaft-950"
            />
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              radius="xl"
              border={2}
              className="border-mine-shaft-950"
            />
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png"
              radius="xl"
              border={2}
              className="border-mine-shaft-950"
            />
            <Avatar
              radius="xl"
              className="border-2! border-mine-shaft-950"
              // 2. Target the text (placeholder) specifically here
              styles={{
                placeholder: {
                  color: "#2d2d2d", // This is Mine Shaft 900
                  fontWeight: 700,
                  fontSize: "15px",
                },
              }}
            >
              +7k
            </Avatar>
          </Avatar.Group>

          <p className="ml-2">
            Trusted by{" "}
            <span className="text-gray-300 font-semibold">10,000+</span>{" "}
            candidates
          </p>
        </div>
      </div>

      {/* Right Image Area */}
      <div className="relative flex justify-center items-center w-full md:w-2/5 mt-12 md:mt-0">
        {/* Yellow/White Glow Effect behind image */}
        <div className="absolute w-80 h-80 bg-bright-sun-400/20 rounded-full blur-[100px]" />

        {/* Subtle White Sparkle Glow */}
        <div className="absolute w-40 h-40 bg-white/10 rounded-full blur-[60px] translate-x-10 -translate-y-10" />

        <img
          src="/hero-img.png"
          alt="Job search illustration"
          className="relative z-10 w-full drop-shadow-[0_20px_50px_rgba(250,204,21,0.2)] animate-float"
        />
      </div>
    </section>
  );
};

export default Hero;
