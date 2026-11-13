import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCampus } from '../context/CampusContext';
import { departmentHeads } from '../data/mockData';
import InChargeDashboard from '../pages/InChargeDashboard';

/**
 * InChargePageRoute Component
 * Extracts /incharge/:department/:tab URL parameters and connects InChargeDashboard to CampusContext.
 */
function InChargePageRoute() {
  const { department, tab } = useParams();
  const navigate = useNavigate();
  const campus = useCampus();

  const dept = department || campus.inchargeDepartment || 'Electrical';
  const head = departmentHeads[dept] || campus.currentHead || departmentHeads.Electrical;

  const mapParamToTabId = (t) => {
    if (!t || t === 'overview') return 'overview';
    if (t === 'complaints') return 'dept-complaints';
    if (t === 'workers') return 'dept-workers';
    if (t === 'analytics') return 'dept-analytics';
    if (t === 'escalations') return 'dept-escalations';
    return t;
  };

  const mapTabIdToParam = (tabId) => {
    if (tabId === 'dept-complaints') return 'complaints';
    if (tabId === 'dept-workers') return 'workers';
    if (tabId === 'dept-analytics') return 'analytics';
    if (tabId === 'dept-escalations') return 'escalations';
    return 'overview';
  };

  const activeTab = mapParamToTabId(tab);

  const handleSelectTab = (tabId) => {
    const tabSlug = mapTabIdToParam(tabId);
    navigate(`/incharge/${dept}/${tabSlug}`);
  };

  const handleDepartmentChange = (newDept) => {
    if (campus.setInchargeDepartment) {
      campus.setInchargeDepartment(newDept);
    }
    const tabSlug = mapTabIdToParam(activeTab);
    navigate(`/incharge/${newDept}/${tabSlug}`);
  };

  return (
    <InChargeDashboard
      departmentName={dept}
      headInfo={head}
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      complaints={campus.complaints}
      workers={campus.workers}
      onAssignWorker={campus.handleSmartAssignWorker}
      onEscalateToAdmin={campus.handleEscalateToAdmin}
      onDepartmentChange={handleDepartmentChange}
    />
  );
}

export default InChargePageRoute;
