import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCampus } from '../context/CampusContext';
import AdminDashboard from '../pages/AdminDashboard';

/**
 * AdminPageRoute Component
 * Extracts /admin/:tab URL parameters and connects AdminDashboard to CampusContext.
 */
function AdminPageRoute() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const campus = useCampus();

  const activeTab = tab ? (
    tab === 'complaints' ? 'all-complaints' : 
    tab === 'workforce' ? 'workforce-analytics' : 
    tab === 'pipeline' || tab === 'astrix' ? 'astrix-pipeline' : 
    tab
  ) : 'admin-dashboard';

  const handleSelectTab = (tabId) => {
    const slug = tabId === 'all-complaints' 
      ? 'complaints' 
      : tabId === 'workforce-analytics' 
      ? 'workforce' 
      : tabId === 'astrix-pipeline' 
      ? 'pipeline' 
      : '';
    navigate(slug ? `/admin/${slug}` : '/admin');
  };

  return (
    <AdminDashboard
      complaints={campus.complaints}
      workers={campus.workers}
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      onAssignWorker={campus.handleSmartAssignWorker}
      onAcknowledgeEscalation={campus.handleAcknowledgeEscalation}
    />
  );
}

export default AdminPageRoute;
