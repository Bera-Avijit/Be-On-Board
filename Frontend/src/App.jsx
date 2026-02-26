import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import FindJobs from "./Pages/FindJobs";
import Header from "./Components/PublicComponents/Header";
import Footer from "./Components/PublicComponents/Footer";
import FindTalents from "./Pages/FindTalents";
import TalentProfilePage from "./Pages/TalentProfilePage";
import PostJob from "./Pages/PostJob";
import JobDetailsPage from "./Pages/JobDetailsPage";
import AboutUs from "./Pages/AboutUs";
import ApplyJobPage from "./Pages/ApplyJobPage";
import RecruiterDashboard from "./Pages/RecruiterDashboard";
import CandidateDashboard from "./Pages/CandidateDashboard";
import AdminTracking from "./Pages/AdminTracking";

import ProtectedRoute from "./Components/Protected/ProtectedRoute";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-mine-shaft-950 font-['Poppins'] text-mine-shaft-100">
            <ScrollRestoration />
            <Header />
            <main className="flex-1 w-full pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "find-jobs",
                element: <FindJobs />,
            },
            {
                path: "find-talents",
                element: (
                    <ProtectedRoute allowedRoles={["RECRUITER", "ADMIN"]}>
                        <FindTalents />
                    </ProtectedRoute>
                ),
            },
            {
                path: "talent-profile/:id",
                element: (
                    <ProtectedRoute allowedRoles={["RECRUITER", "ADMIN"]}>
                        <TalentProfilePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "post-jobs",
                element: (
                    <ProtectedRoute allowedRoles={["RECRUITER"]}>
                        <PostJob />
                    </ProtectedRoute>
                ),
            },
            {
                path: "recruiter-dashboard",
                element: (
                    <ProtectedRoute allowedRoles={["RECRUITER"]}>
                        <RecruiterDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "applications",
                element: (
                    <ProtectedRoute allowedRoles={["CANDIDATE"]}>
                        <CandidateDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "admin/tracking",
                element: (
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <AdminTracking />
                    </ProtectedRoute>
                ),
            },
            {
                path: "job-details/:id",
                element: <JobDetailsPage />,
            },
            {
                path: "apply-job/:id",
                element: (
                    <ProtectedRoute allowedRoles={["CANDIDATE"]}>
                        <ApplyJobPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "about-us",
                element: <AboutUs />,
            },
        ],
    },
    {
        path: "*",
        element: <HomePage />,
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;


