import { Navigate, RouteObject } from "react-router-dom";
import Register from "Modules/Auth/Register";
import AccountType from "Modules/Auth/Register/account-type";
import VerifyEmailPage from "Modules/Auth/Register/forms/verify-email";
import TesterUserLayout from "Shared/layout/testeruser";
import TesterDashboard from "Modules/Tester/Dashboard";
import VerifyUserPage from "Modules/VerifiyUser";
import LoginPage from "Modules/Auth/Login";
import AwaitingVerificationPage from "Modules/VerifiyUser/awaiting";
import AssessmentPage from "Modules/Tester/Assesment";
import LearningMaterialsPage from "Modules/Tester/LearningMaterials";
import TesterSettings from "Modules/Tester/Settings";
import InvoicePage from "Modules/Invoices";
import DeveloperUserLayout from "Shared/layout/developeruser";
import DeveloperUserDashboardLayout from "Shared/layout/developeruser/dashboard-layout";
import DeveloperDashboard from "Modules/Developer/Dashboard";
import DeveloperSettings from "Modules/Developer/Settings";
import DeveloperTasksPage from "Modules/Developer/Tasks";
import DeveloperCreateTasksPage from "Modules/Developer/Tasks/create";
import TestersListPage from "Modules/Developer/Testers";
import MessagesPage from "Modules/Messages";
import DeveloperViewTaskDetailsPage from "Modules/Developer/Tasks/view";
import DeveloperReviewsPage from "Modules/Developer/Reviews";
import HomeLayout from "Shared/layout/home";
import HomeLandingPage from "Modules/Home";
import SingleTaskPage from "Modules/Home/SingleTask";
import TesterBidsPage from "Modules/Tester/Bids";
import TesterTasksPage from "Modules/Tester/Tasks";
import TesterViewTaskDetailsPage from "Modules/Tester/Tasks/view";
import TesterResolvePage from "Modules/Tester/Tasks/resolve";
import TestersReviewsPage from "Modules/Tester/Reviews";
import TesterBookMarksPage from "Modules/Tester/Bookmarks";
import TasksSearchPage from "Modules/Home/Tasks";
import ForgotPasswordPage from "Modules/Auth/ForgotPassword";
import VerifyCodePage from "Modules/Auth/ForgotPassword/verify-code";
import EnterNewPasswordPage from "Modules/Auth/ForgotPassword/enter-password";
import TermsAndConditionsPage from "Modules/TermsAndConditions";
import NotFoundPage from "Modules/NotFound";
import SingleTesterPage from "Modules/Home/SingleTester";
import PlaygroundComponent from "Modules/Playground";
import ChatMessageArea from "Modules/Messages/sections/chat-message-area";
import PaymentsPage from "Modules/Payment";
import VerifyPaymentScreen from "Modules/Payment/verify";

const routes = (isAuth, authType, authUser): RouteObject[] => [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomeLandingPage />,
      },
      {
        path: "tasks/:id",
        element: <SingleTaskPage />,
      },
      {
        path: "testers/:id",
        element: <SingleTesterPage />,
      },
      {
        path: "/tasks",
        element: <TasksSearchPage />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditionsPage />,
      },
      ...(!isAuth ? authRoutes : []),
    ],
  },
  ...(authType === "TesterUser" ? testerUserRoutes(authUser) : []),
  ...(authType === "DeveloperUser" ? developerUserRoutes : []),
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/playground",
    element: <PlaygroundComponent />,
  },
  {
    path: "/payment/verify",
    element: <VerifyPaymentScreen />,
  },
];

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/verify-code",
    element: <VerifyCodePage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/account-type",
    element: <AccountType />,
  },
  {
    path: "/reset-password",
    element: <EnterNewPasswordPage />,
  },

  {
    path: "/verify-email",
    element: <VerifyEmailPage />,
  },
  {
    path: "*",
    element: <Navigate to='/register' />,
  },
];

const testerUserRoutes = (authUser: any): RouteObject[] => [
  {
    path: "/",
    element: <TesterUserLayout />,
    children: authUser?.meta?.isVerified
      ? authUser?.meta?.isApproved
        ? approvedTesterUserRoutes(authUser)
        : verifiedTesterUserRoutes(authUser)
      : unverifiedTesterUserRoutes(authUser),
  },
];

const approvedTesterUserRoutes = (authUser): RouteObject[] => [
  {
    path: "/dashboard",
    children: [
      {
        index: true,
        element: <TesterDashboard />,
      },
      {
        path: "assessments",
        element: <AssessmentPage />,
      },
      {
        path: "tasks",
        element: <TesterTasksPage />,
      },
      {
        path: "bids",
        element: <TesterBidsPage />,
      },
      {
        path: "tasks/:id",
        element: <TesterViewTaskDetailsPage />,
      },
      {
        path: "tasks/:id/resolve",
        element: <TesterResolvePage />,
      },
      {
        path: "messages/*",
        element: <MessagesPage />,
        children: [
          {
            path: ":id",
            element: <ChatMessageArea />,
          },
        ],
      },
      {
        path: "invoice/:id",
        element: <InvoicePage />,
      },
      {
        path: "payment",
        element: <PaymentsPage />,
      },
      {
        path: "settings",
        element: <TesterSettings />,
      },
      {
        path: "reviews",
        element: <TestersReviewsPage />,
      },
      {
        path: "bookmarks",
        element: <TesterBookMarksPage />,
      },
      {
        path: "learning-materials",
        element: <LearningMaterialsPage />,
      },
    ],
  },
];

const verifiedTesterUserRoutes = (authUser): RouteObject[] => [
  {
    path: "/dashboard",
    children: [
      {
        index: true,
        element: <AssessmentPage />,
      },
      {
        path: "learning-materials",
        element: <LearningMaterialsPage />,
      },
      {
        path: "settings",
        element: <TesterSettings />,
      },
    ],
  },
];

const unverifiedTesterUserRoutes = (authUser): RouteObject[] => [
  {
    path: "/dashboard",
    children: [
      {
        index: true,
        element:
          authUser?.meta?.verificationStatus == "Submitted" ? (
            <AwaitingVerificationPage />
          ) : (
            <VerifyUserPage />
          ),
      },
      {
        path: "settings",
        element: <TesterSettings />,
      },
    ],
  },
];

const developerUserRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <DeveloperUserDashboardLayout />,
    children: [
      {
        index: true,
        element: <DeveloperDashboard />,
      },
      {
        path: "tasks",
        element: <DeveloperTasksPage />,
      },
      {
        path: "tasks/:id",
        element: <DeveloperViewTaskDetailsPage />,
      },
      {
        path: "tasks/new",
        element: <DeveloperCreateTasksPage />,
      },
      {
        path: "testers",
        element: <TestersListPage />,
      },
      {
        path: "messages/*",
        element: <MessagesPage />,
        children: [
          {
            path: ":id",
            element: <ChatMessageArea />,
          },
        ],
      },
      {
        path: "invoice/:id",
        element: <InvoicePage />,
      },
      {
        path: "settings",
        element: <DeveloperSettings />,
      },
      {
        path: "payment",
        element: <PaymentsPage />,
      },
      {
        path: "reviews",
        element: <DeveloperReviewsPage />,
      },
    ],
  },
];

export default routes;
