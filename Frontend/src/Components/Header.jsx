import React from "react";
import { IconReportSearch } from "@tabler/icons-react";
import { IconBell } from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
import { Avatar } from "@mantine/core";

const Header = () => {
  return (
    <div className="w-full bg-black h-30 text-white flex items-center justify-between px-6 text-xl">
      <div className="flex items-center gap-2">
        <IconReportSearch stroke={1.5} className="h-8 w-8" />{" "}
        <div className="text-2xl font-semibold">Be OnBoard</div>
      </div>
      <div className="flex gap-3">
        <a href="">Find Jobs</a>
        <a href="">Find Talents</a>
        <a href="">Upload Jobs</a>
        <a href="">About Us</a>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <IconBell />
        </div>
        <div className="flex items-center gap-2">
          <div>
            <Avatar src="avatar.png" alt="it's me" />
          </div>
          <div>Profile</div>
        </div>
        <div>
          <IconSettings />
        </div>
      </div>
    </div>
  );
};

export default Header;
