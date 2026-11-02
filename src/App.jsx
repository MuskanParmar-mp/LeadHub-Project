
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
import Emp_my_lead from "./pages/Emp_my_lead";
import Emp_follow_up from "./pages/Emp_follow_up";
import Emp_calls from "./pages/Emp_calls";
import Emp_reports from "./pages/Emp_reports";
import Emp_task from "./pages/Emp_task";
import Emp_notification from "./pages/Emp_notification";
import Emp_profile from "./pages/Emp_profile";
import Emp_dashboard from "./pages/Emp_dashboard";
<<<<<<< HEAD
import AdminHeader from "./pages/AdminHeader";
import Profile from "./pages/Profile";
=======
import Super_org_dashboard from "./pages/Super_org_dashboard";
import Super_org_organization from "./pages/Super_org_organization";
import Super_org_plane_and_price from "./pages/Super_org_plane_and_price";
import Super_org_subcripation from "./pages/Super_org_subcripation";
import Super_org_user from "./pages/Super_org_user";
import Super_org_report from "./pages/Super_org_report";
import Super_org_profile from "./pages/Super_org_profile";
import Super_org_support_ticket from "./pages/Super_org_support_ticket";
import Super_org_notification from "./pages/Super_org_notification";
import Super_org_role_and_permission from "./pages/Super_org_role_and_permission";
import Super_org_audit_log from "./pages/Super_org_audit_log";
import Organization from "./pages/Organization_login";
>>>>>>> 9d56081 (multitancy done)

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
<Route
        path="/AdminHeader"
        element={<AdminHeader />}
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
        path="/pages/Emp_my_lead"
        element={<Emp_my_lead />}
      />

{/* emp follow up */}

<Route
        path="/pages/emp_follow_up"
        element={<Emp_follow_up />}
      />

  <Route
        path="/pages/emp_calls"
        element={<Emp_calls />}
      /> 

<Route
        path="/pages/emp_reports"
        element={<Emp_reports />}
      />  

<Route
        path="/pages/emp_task"
        element={<Emp_task/>}
      />     
<Route
        path="/pages/emp_notification"
        element={<Emp_notification/>}
      /> 

<Route
        path="/pages/emp_profile"
        element={<Emp_profile/>}
      /> 

<Route
        path="/pages/emp_dashboard"
        element={<Emp_dashboard/>}
      /> 
<<<<<<< HEAD
<Route path="/profile" element={<Profile />} />
=======



{/* super orgnazation start from here */}

<Route
        path="/pages/Super_org_dashboard"
        element={<Super_org_dashboard />}
      />

<Route
        path="/pages/super_org_organization"
        element={<Super_org_organization />}
      />  

<Route
        path="/pages/super_org_plan_and_price"
        element={<Super_org_plane_and_price />}
      />  
<Route
        path="/pages/super_org_subcripation"
        element={<Super_org_subcripation />}
      />  

<Route
        path="/pages/super_org_user"
        element={<Super_org_user />}
      />  

<Route
        path="/pages/super_org_report"
        element={<Super_org_report />}
      />

<Route
        path="/pages/super_org_profile"
        element={<Super_org_profile />}
      />

<Route
        path="/pages/super_org_support_ticket"
        element={<Super_org_support_ticket />}
      />

<Route
        path="/pages/super_org_notification"
        element={<Super_org_notification />}
      /> 

<Route
        path="/pages/super_org_role_and_permission"
        element={<Super_org_role_and_permission />}
      />

<Route
        path="/pages/super_org_audit_log"
        element={<Super_org_audit_log />}
      />

<Route
        path="/pages/organization"
        element={<Organization />}
      />
>>>>>>> 9d56081 (multitancy done)
<Route
  path="/admin/followups"
  element={
    <ProtectedRoute>
      <FollowUps />
    </ProtectedRoute>
  }
/>


    </Routes>

    // sales excutive side start from here
    

  );
}

export default App;