import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
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

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-mine-shaft-950 font-['Poppins'] text-mine-shaft-100">
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
                element: <FindTalents />,
            },
            {
                path: "talent-profile/:id",
                element: <TalentProfilePage />,
            },
            {
                path: "post-jobs",
                element: <PostJob />,
            },
            {
                path: "job-details/:id",
                element: <JobDetailsPage />,
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


