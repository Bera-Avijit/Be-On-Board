import React from "react";
import { IconReportSearch } from "@tabler/icons-react";
import { IconBell } from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
import { Avatar, Indicator } from "@mantine/core";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <div className="w-full bg-mine-shaft-950 h-20 text-white flex items-center justify-between px-6 text-xl">
      <div className="flex items-center gap-2 text-bright-sun-400">
        <IconReportSearch stroke={1.5} className="h-8 w-8" />{" "}
        <div className="text-2xl font-semibold">Be On Board</div>
      </div>
      <NavLinks />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div>
            <Avatar src="avatar.png" alt="it's me" />
          </div>
          <div>Profile</div>
        </div>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <IconSettings stroke={1.5} />
        </div>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator color="red" offset={6} size={8} processing>
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </div>
    </div>
  );
};

export default Header;
