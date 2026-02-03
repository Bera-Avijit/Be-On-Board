import { RouterProvider } from "react-router";
import "./App.css";
import HomePage from "./Pages/HomePage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([{ path: "*", element: <HomePage /> }]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
