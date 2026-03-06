import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Error from "../shared/Pages/Error"; 
import Unauthorized from "../shared/Pages/Unauthorized";
 
 
 
import ManagerLayout from "../dashboards/manager/layouts/ManagerLayout";
 
import RefreshPage from "../shared/Pages/RefreshPage";
 
import Notification from "../shared/Pages/Notification";
import NotificationLayout from "../shared/Layouts/NotificationLayout";
 
import EmployeeJobListing from "../modules/job/pages/EmployeeJobListing";
import EmployeeJobReferrals from "../modules/job/pages/EmployeeJobReferrals";
import EmployeeJobShares from "../modules/job/pages/EmployeeJobShares";
 
import EmployeeJobDetails from "../modules/job/pages/EmployeeJobDetails";
 
 
 
import Login from "../shared/Pages/Login";
import HRLayout from "../dashboards/hr/layouts/HRLayout";
import HRDashboard from "../dashboards/hr/pages/HRDashboard";
import Game from "../modules/game/pages/Game";
import GameConfig from "../modules/game/pages/GameConfig";
import { PostDashboard } from "../modules/post/pages/PostDashboard";
import HRTravelDetails from "../modules/travel/pages/HRTravelDetails";
import HRExpense from "../modules/travel/pages/HRExpense";
import HRDocument from "../modules/travel/pages/HRDocument";
import HRUpdate from "../modules/travel/pages/HRUpdate";
import EmployeeLayout from "../dashboards/employee/layouts/EmployeeLayout";
import OrgChart from "../modules/org-chart/pages/OrgChart";
import EmployeeDashboard from "../dashboards/employee/pages/EmployeeDashboard";
import EmpTravelDetails from "../modules/travel/pages/EmpTravelDetails";
import EmpExpenseDocument from "../modules/travel/pages/EmpExpenseDocument";
import GameDetails from "../modules/game/pages/GameDetails";
import ManagerDashboard from "../dashboards/manager/pages/ManagerDashboard";
import ManagerDocDetails from "../modules/travel/pages/ManagerDocDetails";
import HRJobDashboard from "../modules/job/pages/HRJobDashboard";
import HRJobDetails from "../modules/job/pages/HRJobDetails";
import Header from "../shared/Components/Header";
import ManagerTeamMember from "../dashboards/manager/pages/ManagerTeamMember";
import SystemConfig from "../shared/Pages/SystemConfig";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },

  {
    element: <ProtectedRoute allowedRoles={["hr"]} />,
    children: [
      {
        path: "/hr",
        element: <HRLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/hr/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <HRDashboard />,
          },
          {
            path: "game",
            children: [
              {
                path: "details",
                element: <Game view="hr" />,
              },
              {
                path: "details/:id",
                element: <GameConfig />,
              },
            ],
          },
          {
            path: "achievement",
            children: [
              {
                path: "posts",
                element: <PostDashboard view="hr" />,
              },
            ],
          },
          {
            path: "travel",
            children: [
              {
                path: "details",
                element: <HRTravelDetails />,
              },
              {
                path: "expense",
                element: <HRExpense />,
              },
              {
                path: "document",
                element: <HRDocument />,
              },
              {
                path: "details/update/:id",
                element: <HRUpdate />,
              },
            ],
          },

          {
            path: "job",
            children: [
              {
                path: "dashboard",
                element: <HRJobDashboard />,
              },
              {
                path: "config/:id",
                element: <HRJobDetails />,
              },
            ],
          },
          {
            path: "system-config",
            element: <SystemConfig />,
          },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["employee"]} />,
    children: [
      {
        path: "/employee",
        element: <EmployeeLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/employee/dashboard" replace />,
          },
          {
            path: "org-chart/:id",
                element: <OrgChart />,
            
          },

          {
            path: "dashboard",
            element: <EmployeeDashboard />,
          },
          {
            path: "travel",
            children: [
              {
                path: "details",
                element: <EmpTravelDetails />,
              },
              {
                path: "details/:id",
                element: <EmpExpenseDocument />,
              },
            ],
          },
          {
            path: "game",
            children: [
              {
                path: "details",
                element: <Game />,
              },
              {
                path: "details/:id",
                element: <GameDetails />,
              },
            ],
          },
          {
            path: "achievement",
            children: [
              {
                path: "posts",
                element: <PostDashboard view="employee" />,
              },
            ],
          },
          {
            path: "job",
            children: [
              {
                path: "listing",
                element: <EmployeeJobListing />,
              },
              {
                path: "details/:id",
                element: <EmployeeJobDetails />,
              },
              {
                path: "referrals",
                element: <EmployeeJobReferrals />,
              },
              {
                path: "shares",
                element: <EmployeeJobShares />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/",
    element: <Header />,
  },

  {
    element: <ProtectedRoute allowedRoles={["manager"]} />,
    children: [
      {
        path: "/manager",
        element: <ManagerLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/manager/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <ManagerDashboard />,
          },
          {
            path: "tarvel-document-detail",
            element: <ManagerDocDetails />,
          },
          {
            path: "team-member",
            element: <ManagerTeamMember />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={["employee", "hr", "manager"]} />,
    children: [
      {
        path: "/notification",
        element: <NotificationLayout />,
        children: [
          {
            path: "all",
            element: <Notification />,
          },
        ],
      },
    ],
  },

  {
    path: "/refresh",
    element: <RefreshPage />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
