// Helper to get formatted date
const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
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
        phone: "1234567890",
        status: "APPLIED",
        appliedDate: "15 Feb 2026",
        resume: null,
        coverLetter: "I am very interested in this role..."
    }
];

// LocalStorage Keys
const STORAGE_KEY = 'be_on_board_applications';

export const ApplicationStatuses = {
    APPLIED: "APPLIED",
    SHORTLISTED: "SHORTLISTED",
    INTERVIEW: "INTERVIEW",
    HIRED: "HIRED",
    REJECTED: "REJECTED"
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
    const normalizedApps = apps.map(app => {
        const fullName = app.fullName || app.candidateName || "Anonymous Applicant";
        return {
            ...app,
            fullName,
            status: app.status || ApplicationStatuses.APPLIED,
            appliedDate: app.appliedDate || getTodayDate(),
            jobTitle: app.jobTitle || "Untitled Position",
            company: app.company || "Unknown Company"
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
        appliedDate: getTodayDate()
    };
    const updatedApps = [newApp, ...apps];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
    return newApp;
};

// Update status of an application
export const updateApplicationStatus = (appId, newStatus) => {
    const apps = getApplications();
    const updatedApps = apps.map(app =>
        app.id === appId ? { ...app, status: newStatus } : app
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
    return updatedApps;
};

// Remove an application (Withdraw)
export const deleteApplication = (appId) => {
    const apps = getApplications();
    const updatedApps = apps.filter(app => app.id !== appId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
    return updatedApps;
};
