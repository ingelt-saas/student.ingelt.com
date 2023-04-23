// Modules
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";

// Layouts
import PanelLayout from "../layouts/PanelLayout/PanelLayout";
import LoginLayout from "../layouts/LoginLayout/LoginLayout";

// Pages
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import Assignments from "../pages/Assignments/Assignments";
import Discussions from "../pages/Discussions/Discussions";
import Documents from "../pages/Documents/Documents";
import Library from "../pages/Library/Library";
import Settings from "../pages/Settings/Settings";
import SingleAssignment from "../pages/Assignments/SingleAssignment";

const Routes = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(false);
  }, [loggedIn]);

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
            children: [
              {
                path: '/assignments',
                element: <Assignments />,
              },
              {
                // it's route for mobile 
                path: '/assignments/:assignmentId',
                element: <SingleAssignment />,
              }
            ]
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
            path: "/centralized-library",
            element: <Library />,
          },
          {
            path: "/settings",
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
