
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import Leads from "./pages/Leads";

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

    </Routes>
  );
}

export default App;