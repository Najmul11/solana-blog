import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home";
import AllBlogs from "../pages/blogs/AllBlogs";
import Dashboard from "../pages/dashboard/Dashboard";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/blogs",
            element: <AllBlogs />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
