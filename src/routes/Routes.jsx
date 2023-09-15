// Modules
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// Layouts
import PanelLayout from "../layouts/PanelLayout/PanelLayout";
import LoginLayout from "../layouts/LoginLayout/LoginLayout";

// assets
import CancelPDF from '../assets/refund and cancellation page.pdf';
import ShippingPDF from '../assets/shipping page.pdf';
import PrivacyPDF from '../assets/privacy policy page.pdf';
import TermsPDF from '../assets/terms and condition page.pdf';

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
import SpeakingSession from "../pages/SpeakingSession/SpeakingSession";
import CheckSessions from "../pages/SpeakingSession/CheckSessions";
import Contact from "../pages/Contact/Contact";
import Accommodation from "../pages/Accommodation/Accommodation";
import Referral from "../pages/Referral/Referral";

const PaymentRoute = ({ children }) => {

  const { student } = useContext(StudentContext);

  if (!student?.organizationId && !student?.payment) {
    return <>{children}</>
  }

  return <></>

}

const RedirectRoute = ({ redirectURL }) => {
  useEffect(() => {
    if (redirectURL) {
      window.location = redirectURL;
    }
  }, [redirectURL]);
}

const Routes = () => {
  // student provider context
  const { loading, student } = useContext(StudentContext);

  const publicRoutes = [
    {
      path: '/cancellation-policy',
      element: <RedirectRoute redirectURL={CancelPDF} />,
    },
    {
      path: '/shipping-policy',
      element: <RedirectRoute redirectURL={ShippingPDF} />,
    },
    {
      path: '/terms-conditions',
      element: <RedirectRoute redirectURL={TermsPDF} />,
    },
    {
      path: '/privacy-policy',
      element: <RedirectRoute redirectURL={PrivacyPDF} />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
  ];

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
            path: "/ielts-preparation/modules",
            element: <Modules />,
          },
          {
            path: "/ielts-preparation/speaking-session",
            element: <SpeakingSession />,
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
            path: "/speaking-session/check-sessions",
            element: <CheckSessions />,
          },
          {
            path: "/visa-application",
            element: <VisaApplication />,
          },
          {
            path: "/accommodation",
            element: <Accommodation />,
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
            path: "/referral",
            element: <Referral />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
      ...publicRoutes,
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
      ...publicRoutes,
    ]);

  return loading ? <Loader /> : <RouterProvider router={router} />;
};

export default Routes;
