// Modules
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";

// Layouts
import PanelLayout from "../layouts/PanelLayout/PanelLayout";
import LoginLayout from "../layouts/LoginLayout/LoginLayout";

// Pages
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import Assignments from "../pages/Assignments/Assignments";
import Discussions from "../pages/Discussions/Discussions";
import Documents from "../pages/Documents/Documents";
import Notes from "../pages/Notes/Notes";
import Settings from "../pages/Settings/Settings";

const Routes = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const router = loggedIn
    ? createBrowserRouter([
      {
        path: "/",
        element: <PanelLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/assignments",
            element: <Assignments />,
          },
          {
            path: "/discussions",
            element: <Discussions />,
          },
          {
            path: "/documents",
            element: <Documents />,
          },
          {
            path: "/notes",
            element: <Notes />,
          },
          {
            path: "/setting",
            element: <Settings />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ])
    : createBrowserRouter([
      {
        path: "/",
        element: <LoginLayout />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]);

  return <RouterProvider router={router} />;
};

export default Routes;
