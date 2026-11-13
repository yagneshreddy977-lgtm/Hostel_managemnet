import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import StudentDashboard from '../pages/StudentDashboard';
import CreateComplaint from '../pages/CreateComplaint';
import ComplaintDetails from '../pages/ComplaintDetails';
import DepartmentsDirectory from '../pages/DepartmentsDirectory';
import NotificationsPage from '../pages/NotificationsPage';
import NotFoundPage from '../pages/NotFoundPage';
import RouteSync from './RouteSync';
import WorkerPageRoute from './WorkerPageRoute';
import InChargePageRoute from './InChargePageRoute';
import AdminPageRoute from './AdminPageRoute';

/**
 * AppRoutes Component
 * Central declarative route table for the application.
 */
export function AppRoutes() {
  return (
    <>
      <RouteSync />
      <Routes>
        <Route element={<MainLayout />}>
          {/* Default redirect to student portal */}
          <Route path="/" element={<Navigate to="/student" replace />} />

          {/* Student Resident Portal */}
          <Route path="/student" element={<StudentDashboard />} />

          {/* Faculty & Staff Service Portal */}
          <Route path="/staff" element={<StudentDashboard />} />

          {/* Complaints Lifecycle */}
          <Route path="/complaints/new" element={<CreateComplaint />} />
          <Route path="/complaints/:id" element={<ComplaintDetails />} />

          {/* Campus Maintenance Worker Operations */}
          <Route path="/worker" element={<WorkerPageRoute />} />
          <Route path="/worker/:tab" element={<WorkerPageRoute />} />

          {/* Department In-Charge Command Center */}
          <Route path="/incharge" element={<Navigate to="/incharge/Electrical" replace />} />
          <Route path="/incharge/:department" element={<InChargePageRoute />} />
          <Route path="/incharge/:department/:tab" element={<InChargePageRoute />} />

          {/* Institution Administrator Intelligence */}
          <Route path="/admin" element={<AdminPageRoute />} />
          <Route path="/admin/departments" element={<DepartmentsDirectory />} />
          <Route path="/admin/:tab" element={<AdminPageRoute />} />

          {/* System Notifications Feed */}
          <Route path="/notifications" element={<NotificationsPage />} />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
