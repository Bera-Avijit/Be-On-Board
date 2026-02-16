import { Avatar, Divider, Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

const Hero = () => {
  return (
    /* h-full: Fills the flex-1 space. 
       gap-10: Creates a physical "No-Entry" zone between left and right. 
       flex-col: Stacks vertically on mobile. */
    <section className="relative flex h-full w-full flex-col md:flex-row items-center justify-between px-6 lg:px-20 gap-10 md:gap-16 bg-mine-shaft-950">
      {/* LEFT SECTION: 3/5 Portion (60%) */}
      <div className="z-10 flex flex-col w-full md:w-3/5 space-y-6 lg:space-y-8 mt-10 md:mt-0 md:pt-4">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Find your{" "}
          <span className="text-bright-sun-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">
            dream job
          </span>{" "}
          with us.
        </h1>

        <p className="max-w-xl text-base lg:text-xl text-gray-400 font-medium">
          Good life begins with a good company. Start exploring thousands of job
          opportunities in one place with our smart search engine.
        </p>

        {/* Search Bar */}
        <div className="flex items-center gap-2 lg:gap-4 bg-mine-shaft-900/40 p-3 lg:p-4 rounded-3xl border border-mine-shaft-800 backdrop-blur-xl w-full lg:w-6/7 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] transition-all hover:border-mine-shaft-300">
          <div className="flex flex-col flex-1 px-2 lg:px-4">
            <label className="text-[12px] lg:text-[14px] uppercase tracking-wider text-bright-sun-400 font-bold mb-1">
              Job Title
            </label>
            <input
              type="text"
              placeholder="Software Engineer"
              className="bg-transparent text-white outline-none placeholder:text-gray-200/40 text-sm lg:text-base w-full font-semibold"
            />
          </div>

          <Divider
            orientation="vertical"
            className="hidden lg:block border-mine-shaft-700 h-10"
            size="xs"
          />

          <div className="flex flex-col flex-1 px-2 lg:px-4 border-l lg:border-l-0 border-mine-shaft-800 lg:border-none">
            <label className="text-[12px] lg:text-[14px] uppercase tracking-wider text-bright-sun-400 font-bold mb-1">
              Job Type
            </label>
            <Select
              placeholder="Full Time"
              variant="unstyled"
              data={["Full Time", "Part Time", "Internship", "Contract"]}
              defaultValue="Full Time"
              className="text-white"
              styles={{
                input: { color: "white", height: "24px", minHeight: "unset", fontWeight: 700 },
                dropdown: {
                  backgroundColor: "#0a0a0a",
                  border: "1px solid #1f1f1f",
                  borderRadius: "12px",
                  padding: '4px',
                  zIndex: 1000,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)' // Added for better depth
                },
                option: {
                  color: "#9ca3af", // mine-shaft-400 equivalent
                  fontWeight: 700,
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  // Default Hover (Unselected)
                  '&[data-hovered]': {
                    backgroundColor: "#1a1a1a !important", // Very dark grey/black
                    color: "#fae62d !important" // Bright Sun Yellow for readability
                  },
                  // Selected State
                  '&[data-selected]': {
                    backgroundColor: "#fae62d !important",
                    color: "#000000 !important",
                    '&[data-hovered]': {
                      backgroundColor: "#e5d122 !important", // Slightly darker yellow on hover if already selected
                      color: "#000000 !important"
                    }
                  }
                }
              }}
            />
          </div>

          <button className="flex items-center justify-center h-10 w-10 lg:h-14 lg:w-14 bg-bright-sun-400 hover:bg-bright-sun-500 text-mine-shaft-950 rounded-2xl transition-all transform hover:scale-110 active:scale-95 shadow-lg shrink-0 cursor-pointer">
            <IconSearch size={24} stroke={3} />
          </button>
        </div>
      </div>

      {/* RIGHT SECTION: 2/5 Portion (40%) - The "Safe Zone" */}
      <div className="relative w-full max-w-sm lg:max-w-md md:translate-x-12 lg:translate-x-10 transition-transform duration-300">
        {/* Inner Container: Floating elements are locked to this relative box */}
        <div className="relative w-full max-w-sm lg:max-w-md">
          <img
            src="/hero-img.png"
            alt="Hero"
            className="w-full drop-shadow-[0_20px_50px_rgba(250,204,21,0.15)] animate-float"
          />

          {/* COMPACT FLOATING CARD: Software Engineer */}
          {/* Changed 'left' to percentages so it stays relative to the IMAGE, not the screen */}
          <div className="absolute top-[28%] left-[-24%] z-20 bg-mine-shaft-900/40 border border-bright-sun-200/50 p-2 lg:p-2 rounded-2xl backdrop-blur-sm w-44 md:w-60 shadow-2xl animate-float transform scale-90 lg:scale-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-mine-shaft-800/60 rounded-lg border border-white/5 shrink-0">
                <Avatar
                  src="https://i.pinimg.com/originals/68/3d/9a/683d9a1a8150ee8b29bfd25d46804605.png"
                  radius="sm"
                  size="md"
                />
              </div>
              <div className="overflow-hidden">
                <h3 className="text-white font-bold text-[11px] lg:text-sm leading-tight truncate">
                  Software Engineer
                </h3>
                <p className="text-[9px] lg:text-[10px] text-gray-400 truncate">
                  Google • New York
                </p>
              </div>
            </div>
            <div className="flex justify-between text-[8px] lg:text-[10px] text-gray-400 border-t border-white/10 px-2 pt-2">
              <span>1 day ago</span>
              <span className="text-bright-sun-400 font-semibold">
                120 Applicants
              </span>
            </div>
          </div>

          {/* COMPACT TRUSTED BADGE: Bottom Right */}
          <div className="absolute bottom-[4%] -right-[-2%] z-20 bg-mine-shaft-900/40 border border-bright-sun-300/50 px-3 py-2 rounded-2xl backdrop-blur-sm flex flex-col items-center gap-1 shadow-2xl animate-float [animation-delay:1s] transform scale-90 lg:scale-100">
            <Avatar.Group spacing="xs">
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                size="md"
                radius="xl"
                className="border-mine-shaft-950!"
              />
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png"
                size="md"
                radius="xl"
                className="border-mine-shaft-950!"
              />
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                size="md"
                radius="xl"
                className="border-mine-shaft-950!"
              />
              <Avatar
                radius="xl"
                size="md"
                className="border-mine-shaft-950! bg-mine-shaft-100!"
                styles={{
                  placeholder: {
                    color: "#2d2d2d",
                    fontSize: "10px",
                    fontWeight: 900,
                  },
                }}
              >
                +10k
              </Avatar>
            </Avatar.Group>

            <div className="text-center">
              <p className="text-[9px] text-gray-200 uppercase font-bold tracking-wide">
                Trusted by
              </p>
              <p className="text-[10px] lg:text-[12px] font-bold text-bright-sun-400">
                10k+ Candidates
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
