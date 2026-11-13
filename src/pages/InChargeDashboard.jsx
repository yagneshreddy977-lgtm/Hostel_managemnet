import React, { useState } from 'react';
import { calculateDepartmentCapacity } from '../utils/capacityCalculation';
import { calculateDepartmentPerformance } from '../utils/departmentRating';
import { assignBestWorker } from '../utils/workerAssignment';
import { mockFeedbacks, departmentHeads } from '../data/mockData';
import { useCampus } from '../context/CampusContext';

// Extracted Clean Components
import InChargeHeader from '../components/incharge/InChargeHeader';
import InChargeNavTabs from '../components/incharge/InChargeNavTabs';
import OverCapacityBanner from '../components/incharge/OverCapacityBanner';
import InChargeOverviewTab from '../components/incharge/InChargeOverviewTab';
import InChargeComplaintsTab from '../components/incharge/InChargeComplaintsTab';
import InChargeWorkersTab from '../components/incharge/InChargeWorkersTab';
import InChargeAnalyticsTab from '../components/incharge/InChargeAnalyticsTab';
import InChargeEscalationsTab from '../components/incharge/InChargeEscalationsTab';
import AssignWorkerModal from '../components/incharge/AssignWorkerModal';
import EscalateModal from '../components/incharge/EscalateModal';
import '../components/components.css';

/**
 * InChargeDashboard Component
 * Command center for Department Heads (e.g. Prof. H. R. Mehta - Electrical Head).
 * Decomposed into dedicated, testable subcomponents for debugging and clarity.
 */
function InChargeDashboard({
  departmentName: propDeptName,
  headInfo: propHeadInfo,
  activeTab = 'incharge-dashboard',
  onSelectTab,
  complaints: propComplaints,
  workers: propWorkers,
  onAssignWorker: propOnAssignWorker,
  onEscalateToAdmin: propOnEscalateToAdmin,
  onDepartmentChange,
}) {
  const campus = useCampus();

  const departmentName = propDeptName || campus.inchargeDepartment || 'Electrical';
  const headInfo = propHeadInfo || departmentHeads[departmentName] || campus.currentHead || departmentHeads.Electrical;
  const complaints = propComplaints || campus.complaints || [];
  const workers = propWorkers || campus.workers || [];
  const onAssignWorker = propOnAssignWorker || campus.handleSmartAssignWorker;
  const onEscalateToAdmin = propOnEscalateToAdmin || campus.handleEscalateToAdmin;

  // Internal tab state for local switching / fallback
  const [internalTab, setInternalTab] = useState('overview');
  const currentTab = (activeTab === 'incharge-dashboard' || activeTab === 'overview')
    ? internalTab
    : (activeTab || internalTab);

  const handleTabChange = (tabId) => {
    setInternalTab(tabId);
    if (onSelectTab) {
      onSelectTab(tabId);
    }
  };

  // --- Sub-View Filters & Segments ---
  const [complaintSegment, setComplaintSegment] = useState('unassigned');
  const [complaintSearch, setComplaintSearch] = useState('');
  const [complaintPriorityFilter, setComplaintPriorityFilter] = useState('all');
  const [workerMinHours, setWorkerMinHours] = useState(0);
  const [overviewOngoingFilter, setOverviewOngoingFilter] = useState('all');

  // --- Modals State ---
  const [assigningComplaint, setAssigningComplaint] = useState(null);
  const [escalatingComplaint, setEscalatingComplaint] = useState(null);
  const [escalationReason, setEscalationReason] = useState('');
  const [escalationUrgency, setEscalationUrgency] = useState('High Priority');

  // --- 1. Scoped Department Data ---
  const activeDept = departmentName || 'Electrical';
  const deptComplaints = complaints.filter(
    (c) => c.department?.toLowerCase() === activeDept.toLowerCase()
  );
  const deptWorkers = workers.filter(
    (w) => w.department?.toLowerCase() === activeDept.toLowerCase()
  );
  const displayedWorkers = deptWorkers.filter(
    (w) => (w.availableHours !== undefined ? w.availableHours : 4) >= workerMinHours
  );
  const deptFeedbacks = mockFeedbacks.filter(
    (f) => f.department?.toLowerCase() === activeDept.toLowerCase()
  );

  // --- 2. Complaint Segmentation & Metrics ---
  const totalCount = deptComplaints.length;
  const pendingCount = deptComplaints.filter(c => c.status === 'Pending').length;
  const inProgressCount = deptComplaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = deptComplaints.filter(c => c.status === 'Resolved').length;
  const overdueCount = deptComplaints.filter(
    c => c.status === 'Overdue' || (c.priority === 'Critical' && c.status === 'Pending') || c.escalatedToAdmin
  ).length;

  const ongoingComplaints = deptComplaints.filter(c => c.status !== 'Resolved');
  const assignedOngoingComplaints = ongoingComplaints.filter(c => Boolean(c.assignedWorker));
  const unassignedOngoingComplaints = ongoingComplaints.filter(c => !c.assignedWorker);

  const allAssignedComplaints = deptComplaints.filter(c => Boolean(c.assignedWorker));
  const allUnassignedComplaints = deptComplaints.filter(c => !c.assignedWorker && c.status !== 'Resolved');

  const displayedOverviewOngoing = ongoingComplaints.filter(c => {
    if (overviewOngoingFilter === 'assigned') return Boolean(c.assignedWorker);
    if (overviewOngoingFilter === 'unassigned') return !c.assignedWorker;
    return true;
  });

  const activeSegmentList = complaintSegment === 'assigned' ? allAssignedComplaints : allUnassignedComplaints;
  const displayedSegmentComplaints = activeSegmentList.filter(c => {
    if (complaintPriorityFilter !== 'all' && c.priority !== complaintPriorityFilter) {
      return false;
    }
    if (complaintSearch.trim()) {
      const q = complaintSearch.toLowerCase();
      const matchId = c.id.toLowerCase().includes(q);
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchLoc = c.location?.toLowerCase().includes(q);
      const matchWorker = c.assignedWorker?.toLowerCase().includes(q);
      if (!matchId && !matchTitle && !matchLoc && !matchWorker) return false;
    }
    return true;
  });

  // --- 3. Capacity & Performance Calculations ---
  const capacityData = calculateDepartmentCapacity(activeDept, complaints, workers);
  const performanceData = calculateDepartmentPerformance(activeDept, complaints);

  const rankedWorkers = [...deptWorkers].sort((a, b) => {
    if ((b.rating || 0) !== (a.rating || 0)) {
      return (b.rating || 0) - (a.rating || 0);
    }
    return (a.currentTasks || 0) - (b.currentTasks || 0);
  });

  const assignmentSuggestions = assigningComplaint 
    ? assignBestWorker(workers, assigningComplaint) 
    : null;

  const escalationList = deptComplaints.filter(
    c => c.status === 'Overdue' || (c.priority === 'Critical' && c.status === 'Pending') || c.escalatedToAdmin
  );

  const handleConfirmEscalation = (e) => {
    e.preventDefault();
    if (!escalationReason.trim()) {
      alert('Please provide a justification note for escalating this issue to Central Administration.');
      return;
    }
    if (onEscalateToAdmin && escalatingComplaint) {
      onEscalateToAdmin(escalatingComplaint.id, escalationReason.trim(), escalationUrgency);
    }
    setEscalatingComplaint(null);
    setEscalationReason('');
  };

  return (
    <div>
      {/* 1. Header Banner */}
      <InChargeHeader
        headInfo={headInfo}
        activeDept={activeDept}
        onDepartmentChange={onDepartmentChange}
      />

      {/* 2. Sub-Navigation Tabs */}
      <InChargeNavTabs
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        ongoingCount={ongoingComplaints.length}
        totalCount={totalCount}
        workersCount={deptWorkers.length}
        overdueCount={overdueCount}
      />

      {/* 3. Over-Capacity Alert */}
      <OverCapacityBanner
        capacityData={capacityData}
        onViewEscalations={() => handleTabChange('dept-escalations')}
      />

      {/* 4. Tab 1: Overview */}
      {(currentTab === 'overview' || currentTab === 'incharge-dashboard') && (
        <InChargeOverviewTab
          activeDept={activeDept}
          totalCount={totalCount}
          ongoingComplaints={ongoingComplaints}
          assignedOngoingComplaints={assignedOngoingComplaints}
          unassignedOngoingComplaints={unassignedOngoingComplaints}
          resolvedCount={resolvedCount}
          performanceData={performanceData}
          capacityData={capacityData}
          deptWorkers={deptWorkers}
          overviewOngoingFilter={overviewOngoingFilter}
          onSetOverviewOngoingFilter={setOverviewOngoingFilter}
          displayedOverviewOngoing={displayedOverviewOngoing}
          onAssignWorkerClick={(c) => setAssigningComplaint(c)}
          onNavigateTab={handleTabChange}
          onSetComplaintSegment={setComplaintSegment}
        />
      )}

      {/* 5. Tab 2: Department Complaints (2 Segments) */}
      {currentTab === 'dept-complaints' && (
        <InChargeComplaintsTab
          activeDept={activeDept}
          complaintSegment={complaintSegment}
          onSetComplaintSegment={setComplaintSegment}
          allUnassignedComplaints={allUnassignedComplaints}
          allAssignedComplaints={allAssignedComplaints}
          complaintSearch={complaintSearch}
          onSearchChange={setComplaintSearch}
          complaintPriorityFilter={complaintPriorityFilter}
          onPriorityFilterChange={setComplaintPriorityFilter}
          displayedSegmentComplaints={displayedSegmentComplaints}
          onAssignWorkerClick={(c) => setAssigningComplaint(c)}
          onEscalateClick={(c) => setEscalatingComplaint(c)}
        />
      )}

      {/* 6. Tab 3: Workers & Capacity Dossier */}
      {currentTab === 'dept-workers' && (
        <InChargeWorkersTab
          activeDept={activeDept}
          deptWorkers={deptWorkers}
          workerMinHours={workerMinHours}
          onMinHoursChange={setWorkerMinHours}
          displayedWorkers={displayedWorkers}
        />
      )}

      {/* 7. Tab 4: Performance Analytics */}
      {currentTab === 'dept-analytics' && (
        <InChargeAnalyticsTab
          activeDept={activeDept}
          performanceData={performanceData}
          overdueCount={overdueCount}
          totalCount={totalCount}
          resolvedCount={resolvedCount}
          inProgressCount={inProgressCount}
          pendingCount={pendingCount}
          rankedWorkers={rankedWorkers}
          deptFeedbacks={deptFeedbacks}
        />
      )}

      {/* 8. Tab 5: Escalations & Admin Dispatch */}
      {currentTab === 'dept-escalations' && (
        <InChargeEscalationsTab
          activeDept={activeDept}
          overdueCount={overdueCount}
          escalationList={escalationList}
          headInfo={headInfo}
          onEscalateClick={(c) => setEscalatingComplaint(c)}
          onAssignWorkerClick={(c) => setAssigningComplaint(c)}
        />
      )}

      {/* 9. Smart Assignment Modal */}
      <AssignWorkerModal
        complaint={assigningComplaint}
        assignmentSuggestions={assignmentSuggestions}
        onAssign={onAssignWorker}
        onClose={() => setAssigningComplaint(null)}
      />

      {/* 10. Escalation to Admin Modal */}
      <EscalateModal
        complaint={escalatingComplaint}
        urgency={escalationUrgency}
        onUrgencyChange={setEscalationUrgency}
        reason={escalationReason}
        onReasonChange={setEscalationReason}
        onSubmit={handleConfirmEscalation}
        onClose={() => setEscalatingComplaint(null)}
      />
    </div>
  );
}

export default InChargeDashboard;
