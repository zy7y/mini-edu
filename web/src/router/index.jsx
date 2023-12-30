import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Layout from "../pages/layout";
import Detail from "../pages/detail";
import Profile from "../pages/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "course/:id",
        element: <Detail />,
      },
      {
        path: "profile/",
        element: <Profile />,
      },
    ],
  },
]);
export default router;
