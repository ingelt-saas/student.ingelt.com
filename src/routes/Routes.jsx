// Modules
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

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
import { StudentContext } from "../contexts";
import Loader from "../components/shared/Loader/Loader";
import Notes from "../pages/Notes/Notes";
import SetNewPassword from "../pages/SetNewPassword/SetNewPassword";

const Routes = () => {
  // student provider context
  const { loading, student } = useContext(StudentContext);

  const router = student
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
                  path: "/assignments",
                  element: <Assignments />,
                },
                {
                  // it's route for mobile
                  path: "/assignments/:assignmentId",
                  element: <SingleAssignment />,
                },
              ],
            },
            {
              path: "/discussion",
              element: <Discussions />,
            },
            {
              path: "/notes",
              element: <Notes />,
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
          path: "/reset-password",
          element: <SetNewPassword />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ]);

  return loading ? <Loader /> : <RouterProvider router={router} />;
};

export default Routes;
