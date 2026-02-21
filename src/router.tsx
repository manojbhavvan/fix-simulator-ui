import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import { Certifications } from "./pages/Certifications";
import { CertificationResults } from "./pages/CertificationResults";
import SimulatorConfigScreen from "./pages/SimulatorConfig";
import Monitoring from "./pages/Monitoring";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "certifications",
        element: <Certifications />,
      },
      {
        path: "monitoring",
        element: <Monitoring/>
      },
      {
        path: "certifications/results/:id",
        element: <CertificationResults />,
      },
      {
        path: "simulator/config",
        element: <SimulatorConfigScreen />,
      },
    ],
  },
]);
