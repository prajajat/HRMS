import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../Pages/Login";
import Error from "../Pages/Error";
import EmpTravelDetails from "../Pages/EmpTravelDetails";
import HRTravelDetails from "../Pages/HRTravelDetails";
import EmpExpenseDocument from "../Pages/EmpExpenseDocument";
import EmployeeDashboard from "../Pages/EmployeeDashboard";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import HRLayout from "../Layouts/HRLayout";
import HRDashboard from "../Pages/HRDashboard";
import HRExpense from "../Pages/HRExpense";
import HRDocument from "../Pages/HRDocument";
import HRUpdate from "../Pages/HRUpdate";
import Unauthorized from "../Pages/Unauthorized";
import Header from "../Components/Header";
import OrgChart from "../Pages/OrgChart";
import OrgChartLayout from "../Layouts/OrgChartLayout";
import ManagerLayout from "../Layouts/ManagerLayout";
import ManagerDashboard from "../Pages/ManagerDashboard";
import ManagerDocDetails from "../Pages/ManagerDocDetails";
import RefreshPage  from "../Pages/RefreshPage";

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
        ],
      },
    ],
  },

  {
    path: "/",
    element: <Header />,
  },
   {
    element: <ProtectedRoute allowedRoles={["employee", "hr", "manager"]} />,
    children: [
      {
        path: "/org-chart",
        element: <OrgChartLayout />,
        children: [
         
           {
              path: ":id",
              element: <OrgChart  />,
            },]
          }
        ]
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
        ]
      }
    ]
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
