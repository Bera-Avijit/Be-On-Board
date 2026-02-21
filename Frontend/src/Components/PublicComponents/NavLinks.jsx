import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Find Jobs", url: "/find-jobs" },
  { name: "Find Talents", url: "/find-talents" },
  { name: "Post Jobs", url: "/post-jobs" },
  { name: "About Us", url: "/about-us" },
];

const NavLinks = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex gap-8 items-center h-full">
      {links.map((link, index) => {
        const isActive = pathname === link.url;

        return (
          <Link
            key={index}
            to={link.url}
            className={`
              relative h-full flex items-center transition-all duration-300 ease-in-out font-medium
              /* Text Color */
              ${isActive ? "text-bright-sun-400" : "text-mine-shaft-300 hover:text-bright-sun-300"}
              
              /* 1. The Line Definition */
              after:content-[''] 
              after:absolute 
              after:top-0 
              after:h-1 
              after:bg-bright-sun-400 
              
              /* 2. Center-to-Ends Animation Logic */
              after:left-1/2            /* Anchor the starting point to exact center */
              after:-translate-x-1/2    /* Shift it back by half its own width to keep it centered */
              
              /* 3. Transition properties */
              after:transition-all 
              after:duration-300 
              after:ease-in-out
              
              /* 4. Active State: Width goes from 0 to 100% */
              ${isActive ? "after:w-full" : "after:w-0"}
            `}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
