import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import FindJobs from "./Pages/FindJobs";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-mine-shaft-950 font-['Poppins']">
      <Header />
      <main className="flex-1 w-full">
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
