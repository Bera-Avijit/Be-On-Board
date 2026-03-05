export const User = {
  name: "Avijit Bera",
  email: "avijit@example.com",
  role: localStorage.getItem("userRole") || "RECRUITER", // Dynamic check for development
  avatar: "/avatar.png",
  membership: "Pro",
};

export const isRecruiter = () => User.role === "RECRUITER";
export const isCandidate = () => User.role === "CANDIDATE";
export const isAdmin = () => User.role === "ADMIN";

export const getNavLinks = (role) => {
  const commonLinks = [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "About Us", url: "/about-us" },
  ];

  const recruiterLinks = [
    { name: "Post Job", url: "/post-jobs" },
    { name: "Find Talents", url: "/find-talents" },
    { name: "Dashboard", url: "/recruiter-dashboard" },
  ];

  const candidateLinks = [
    { name: "My Applications", url: "/applications" },
    { name: "Network", url: "/find-talents" },
    { name: "Build Resume", url: "/build-resume" },
  ];

  const adminLinks = [{ name: "Global Tracking", url: "/admin/tracking" }];

  if (role === "RECRUITER") return [...commonLinks, ...recruiterLinks];
  if (role === "CANDIDATE")
    return [
      { name: "Find Jobs", url: "/find-jobs" },
      { name: "Network", url: "/find-talents" },
      { name: "My Applications", url: "/applications" },
      { name: "Build Resume", url: "/build-resume" },
      { name: "About Us", url: "/about-us" },
    ];
  if (role === "ADMIN") return [...commonLinks, ...adminLinks];

  return commonLinks;
};
