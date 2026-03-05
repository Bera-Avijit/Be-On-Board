// Helper to get formatted date
import { JOBS_DATA } from "./JobsData";

const getTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Initial Mock Data Structure
const INITIAL_APPLICATIONS = [
  {
    id: "app-1",
    jobId: "1", // Referring to JOBS_DATA id
    jobTitle: "Full Stack Developer",
    company: "Google",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    status: "APPLIED",
    appliedDate: "15 Feb 2026",
    resume: null,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    coverLetter: "I am very interested in this role...",
  },
];

// LocalStorage Keys
const STORAGE_KEY = "be_on_board_applications";
const SAVED_JOBS_KEY = "be_on_board_saved_jobs";

export const ApplicationStatuses = {
  APPLIED: "APPLIED",
  SHORTLISTED: "SHORTLISTED",
  INTERVIEW: "INTERVIEW",
  HIRED: "HIRED",
  REJECTED: "REJECTED",
};

// Get all applications
export const getApplications = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  let apps = [];
  if (!stored) {
    apps = INITIAL_APPLICATIONS;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  } else {
    try {
      apps = JSON.parse(stored);
    } catch (e) {
      console.error("Error parsing applications from localStorage", e);
      apps = INITIAL_APPLICATIONS;
    }
  }

  // Data migration/normalization: Ensure fullName exists and other fields are stable
  const normalizedApps = apps.map((app) => {
    const fullName = app.fullName || app.candidateName || "Anonymous Applicant";
    return {
      ...app,
      fullName,
      status: app.status || ApplicationStatuses.APPLIED,
      appliedDate: app.appliedDate || getTodayDate(),
      jobTitle: app.jobTitle || "Untitled Position",
      company: app.company || "Unknown Company",
    };
  });

  return normalizedApps;
};

// Add a new application
export const addApplication = (applicationData) => {
  const apps = getApplications();
  const newApp = {
    ...applicationData,
    id: `app-${Date.now()}`,
    status: ApplicationStatuses.APPLIED,
    appliedDate: getTodayDate(),
  };
  const updatedApps = [newApp, ...apps];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
  return newApp;
};

// Update status of an application with optional review comment
export const updateApplicationStatus = (appId, newStatus, comment = "") => {
  const apps = getApplications();
  const today = new Date().toLocaleString();

  const updatedApps = apps.map((app) => {
    if (app.id === appId) {
      const history = app.history || [];
      const newHistoryItem = {
        from: app.status,
        to: newStatus,
        date: today,
        comment: comment || "No specific comment provided.",
      };
      return {
        ...app,
        status: newStatus,
        history: [...history, newHistoryItem],
      };
    }
    return app;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
  return updatedApps;
};

// Remove an application (Withdraw)
export const deleteApplication = (appId) => {
  const apps = getApplications();
  const updatedApps = apps.filter((app) => app.id !== appId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
  return updatedApps;
};

// Update application details (Edit)
export const updateApplicationDetails = (appId, newDetails) => {
  const apps = getApplications();
  const updatedApps = apps.map((app) =>
    app.id === appId ? { ...app, ...newDetails } : app,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
  return updatedApps;
};

// --- SAVED JOBS LOGIC ---
export const getSavedJobs = () => {
  const stored = localStorage.getItem(SAVED_JOBS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveJob = (jobId) => {
  const saved = getSavedJobs();
  if (!saved.includes(jobId)) {
    const updated = [...saved, jobId];
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
    return updated;
  }
  return saved;
};

export const unsaveJob = (jobId) => {
  const saved = getSavedJobs();
  const updated = saved.filter((id) => id !== jobId);
  localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updated));
  return updated;
};

export const isJobSaved = (jobId) => {
  return getSavedJobs().includes(jobId);
};

// Find a specific application by ID
export const getApplicationById = (appId) => {
  const apps = getApplications();
  return apps.find((app) => app.id === appId);
};
