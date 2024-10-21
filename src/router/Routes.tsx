import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home";
import AllBlogs from "../pages/blogs/AllBlogs";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/dashboard/profile-page/Profile";
import CreatePost from "../pages/dashboard/create-post/CreatePost";

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
      {
        path: "dashboard/",
        element: <RootLayout isDashboard={true} />,
        children: [
          {
            path: "/dashboard/all-posts",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/profile",
            element: <Profile />,
          },
          {
            path: "/dashboard/create-post",
            element: <CreatePost />,
          },
        ],
      },
    ],
  },
]);
