export const User = {
  name: localStorage.getItem("userName") || "Guest User",
  email: localStorage.getItem("userEmail") || "",
  role: localStorage.getItem("userRole") || "CANDIDATE", 
  avatar: localStorage.getItem("userAvatar") || "/avatar.png",
  membership: "Basic",
};

export const isAuthenticated = () => !!localStorage.getItem("token");

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

  if (role === "RECRUITER")
    return [
      { name: "Find Jobs", url: "/find-jobs" },
      { name: "Find Talents", url: "/find-talents" },
      { name: "Post Job", url: "/post-jobs" },
      { name: "Dashboard", url: "/recruiter-dashboard" },
      { name: "About Us", url: "/about-us" },
    ];
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
