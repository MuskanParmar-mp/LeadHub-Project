
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import Leads from "./pages/Leads";
import Uploads from "./pages/Uploads";
import FollowUps from "./pages/FollowUps";
import Employees from "./pages/Employees";
import Filter from "./pages/Filter";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Calls from "./pages/Calls";



function App() {
  return (
    <Routes>

      {/* Website Opening */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/employees"
        element={<Employees />}
      />
      <Route
        path="/filter"
        element={<Filter />}
      />
      <Route
        path="/reports"
        element={<Reports />}
      />
      <Route
        path="/settings"
        element={<Settings />}
      />
      <Route
        path="/calls"
        element={<Calls />}
      />


      {/* Protected Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Unknown URL */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

      <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route path="/admin/leads" element={
    <ProtectedRoute>
      <Leads />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/uploads"
  element={
    <ProtectedRoute>
      <Uploads />
    </ProtectedRoute>
  }
/>


<Route
  path="/admin/followups"
  element={
    <ProtectedRoute>
      <FollowUps />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;