import React from "react";
import { IconReportSearch, IconBell, IconSettings } from "@tabler/icons-react";
import { Avatar, Indicator } from "@mantine/core";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <nav className="w-full bg-mine-shaft-950 h-18 text-white flex items-center justify-between px-6 lg:px-20 border-b border-mine-shaft-900 z-50">
      {/* Logo Section - Self-centered vertically */}
      <Link to="/" className="flex items-center gap-2 text-bright-sun-400 cursor-pointer shrink-0 py-4">
        <IconReportSearch stroke={2} className="h-10 w-10" />
        <div className="text-2xl font-bold tracking-tighter hidden sm:block">
          Be On Board
        </div>
      </Link>

      {/* Center NavLinks - No padding here so links can reach the top-0 border */}
      <div className="hidden md:flex items-center h-full">
        <NavLinks />
      </div>

      {/* Profile & Icons Section - Self-centered vertically */}
      <div className="flex items-center gap-3 lg:gap-6 py-4">
        <div className="flex items-center gap-3 bg-mine-shaft-900/50 py-2 px-4 rounded-full border border-mine-shaft-800 hover:bg-mine-shaft-800 transition-all cursor-pointer">
          <Avatar src="avatar.png" alt="Profile" size="sm" radius="xl" />
          <div className="text-sm font-semibold hidden lg:block">Profile</div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <div className="bg-mine-shaft-900 p-2.5 rounded-full text-gray-400 hover:text-bright-sun-400 cursor-pointer transition-all">
            <IconSettings stroke={1.5} size={22} />
          </div>
          <div className="bg-mine-shaft-900 p-2.5 rounded-full text-gray-400 hover:text-bright-sun-400 cursor-pointer transition-all">
            <Indicator color="red" offset={5} size={8} processing>
              <IconBell stroke={1.5} size={22} />
            </Indicator>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
