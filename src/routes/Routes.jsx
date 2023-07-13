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
import ShortlistUniversity from "../pages/ShortlistUniversity/ShortlistUniversity";

import EducationLoan from "../pages/EducationLoan/EducationLoan";

import Modules from "../pages/Modules/Modules";
import FindInstitute from "../pages/FindInstitute/FindInstitute";
import Institute from "../pages/Institute/Institute";

import VisaApplication from "../pages/VisaApplication/VisaApplication";
import IELTSClasses from "../pages/IELTSClasses/IELTSClasses";
import OnlineClasses from "../pages/IELTSClasses/OnlineClasses";

const PaymentRoute = ({ children }) => {

  const { student } = useContext(StudentContext);

  if (!student?.organizationId && !student?.payment) {
    return <>{children}</>
  }

  return <></>

}

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
            path: "/shortlist-university",
            element: <ShortlistUniversity />,
          },
          {
            path: "/education-loan",
            element: <EducationLoan />,
          },
          {
            path: "/modules",
            element: <Modules />,
          },
          {
            path: "/ielts-classes",
            element: <PaymentRoute>
              <IELTSClasses />
            </PaymentRoute>,
          },
          {
            path: "/ielts-classes/online-classes",
            element: <PaymentRoute>
              <OnlineClasses />
            </PaymentRoute>,
          },
          {
            path: "/visa-application",
            element: <VisaApplication />,
          },
          {
            path: "/institute",
            element: <Institute />,
          },
          {
            path: "/find-institute",
            element: <FindInstitute />,
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
