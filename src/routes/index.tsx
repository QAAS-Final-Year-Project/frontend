import { Navigate, RouteObject } from "react-router-dom";
import Register from "Modules/Auth/Register";
import AccountType from "Modules/Auth/Register/account-type";
import VerifyEmailPage from "Modules/Auth/Register/forms/verify-email";
import TesterUserLayout from "Shared/layout/testeruser";
import TesterDashboard from "Modules/Tester/Dashboard";
import TesterMessages from "Modules/Tester/Messages";
import VerifyUserPage from "Modules/VerifiyUser";
import LoginPage from "Modules/Auth/Login";
import AwaitingVerificationPage from "Modules/VerifiyUser/awaiting";
import AssessmentPage from "Modules/Tester/Assesment";
import LearningMaterialsPage from "Modules/Tester/LearningMaterials";
import Settings from "Modules/Tester/Settings";
import InvoicePage from "Modules/Invoices";
import DeveloperUserLayout from "Shared/layout/developeruser";
import DeveloperUserDashboardLayout from "Shared/layout/developeruser/dashboard-layout";
import DeveloperDashboard from "Modules/Developer/Dashboard";
import DeveloperSettings from "Modules/Developer/Settings";
import TasksPage from "Modules/Developer/Tasks";
import CreateTasksPage from "Modules/Developer/Tasks/create";
import TestersListPage from "Modules/Developer/Testers";
import DeveloperMessages from "Modules/Developer/Messages";
import ViewTaskDetailsPage from "Modules/Developer/Tasks/view";
import DeveloperReviewsPage from "Modules/Developer/Reviews";
import HomeLayout from "Shared/layout/home";
import HomeLandingPage from "Modules/Home";
import SingleTaskPage from "Modules/Home/SingleTask";
import TesterBidsPage from "Modules/Tester/Bids";

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
      ...(!isAuth ? authRoutes : []),
    ],
  },
  ...(authType === "TesterUser" ? testerUserRoutes(authUser) : []),
  ...(authType === "DeveloperUser" ? developerUserRoutes : []),
];

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
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
        element: <TasksPage />,
      },
      {
        path: "bids",
        element: <TesterBidsPage />,
      },
      {
        path: "tasks/:id",
        element: <ViewTaskDetailsPage />,
      },
      {
        path: "tasks/new",
        element: <CreateTasksPage />,
      },
      {
        path: "testers",
        element: <TestersListPage />,
      },
      {
        path: "messages",
        element: <DeveloperMessages />,
      },
      {
        path: "invoice",
        element: <InvoicePage />,
      },
      {
        path: "settings",
        element: <DeveloperSettings />,
      },
      {
        path: "reviews",
        element: <DeveloperReviewsPage />,
      },
      {
        path: "learning-materials",
        element: <LearningMaterialsPage />,
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
    index: true,
    element: <AssessmentPage />,
  },
  {
    path: "learning-materials",
    element: <LearningMaterialsPage />,
  },
  {
    path: "profile",
    element: <div>Profile</div>,
  },
];

const unverifiedTesterUserRoutes = (authUser): RouteObject[] => [
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
    path: "profile",
    element: <div>Profile</div>,
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
        element: <TasksPage />,
      },
      {
        path: "tasks/:id",
        element: <ViewTaskDetailsPage />,
      },
      {
        path: "tasks/new",
        element: <CreateTasksPage />,
      },
      {
        path: "testers",
        element: <TestersListPage />,
      },
      {
        path: "messages",
        element: <DeveloperMessages />,
      },
      {
        path: "invoice",
        element: <InvoicePage />,
      },
      {
        path: "settings",
        element: <DeveloperSettings />,
      },
      {
        path: "reviews",
        element: <DeveloperReviewsPage />,
      },
    ],
  },
];

export default routes;
