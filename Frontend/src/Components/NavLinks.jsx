import React from "react";
import { Link, useLocation } from "react-router";

const links = [
  { name: "Find Jobs", url: "/find-jobs" },
  { name: "Find Talents", url: "/find-talents" },
  { name: "Upload Jobs", url: "/upload-jobs" },
  { name: "About Us", url: "/about-us" },
];

const NavLinks = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex gap-5 items-center h-full">
      {links.map((link, index) => {
        const isActive = pathname === link.url;

        return (
          <Link
            key={index}
            to={link.url}
            className={`
              relative h-full flex items-center transition-all duration-300 ease-in-out
              /* Text color change */
              ${isActive ? "text-bright-sun-400" : "text-mine-shaft-300 hover:text-bright-sun-300"}
              
              /* The Animated Border */
              after:content-[''] 
              after:absolute 
              after:top-0 
              
              /* Center positioning logic */
              after:left-1/2 
              after:-translate-x-1/2 
              
              after:h-0.75 
              after:bg-bright-sun-400 
              after:transition-all 
              after:duration-300 
              after:ease-in-out
              
              /* Grow/Shrink from center */
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
