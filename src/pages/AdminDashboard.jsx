import React, { useState, useMemo, useEffect } from 'react';
import { calculateDepartmentCapacity } from '../utils/capacityCalculation';
import { calculateDepartmentPerformance } from '../utils/departmentRating';
import { useCampus } from '../context/CampusContext';

// Extracted Subcomponents
import AdminHeader from '../components/admin/AdminHeader';
import AdminOverviewTab from '../components/admin/AdminOverviewTab';
import AdminComplaintsTab from '../components/admin/AdminComplaintsTab';
import AdminWorkforceTab from '../components/admin/AdminWorkforceTab';
import AdminTicketModal from '../components/admin/AdminTicketModal';
import AstrixDashboard from '../components/astrix/AstrixDashboard';
import '../components/components.css';

/**
 * AdminDashboard Component
 * Institution-wide executive command center for Campus Administration (Director & Dean of Infrastructure).
 * Decomposed into modular components for clarity, readability, and effortless debugging.
 */
function AdminDashboard({ 
  complaints: propComplaints, 
  workers: propWorkers, 
  activeTab = 'admin-dashboard', 
  onSelectTab, 
  onAssignWorker: propOnAssignWorker,
  onAcknowledgeEscalation: propOnAcknowledgeEscalation,
}) {
  const campus = useCampus();

  const complaints = propComplaints || campus.complaints || [];
  const workers = propWorkers || campus.workers || [];
  const _onAssignWorker = propOnAssignWorker || campus.handleSmartAssignWorker;
  const onAcknowledgeEscalation = propOnAcknowledgeEscalation || campus.handleAcknowledgeEscalation;

  // Local sub-tab state if navigated directly
  const [currentSubTab, setCurrentSubTab] = useState(() => {
    if (activeTab === 'all-complaints') return 'complaints';
    if (activeTab === 'workforce-analytics') return 'workforce';
    if (activeTab === 'astrix-pipeline' || activeTab === 'pipeline' || activeTab === 'astrix') return 'astrix';
    return 'overview';
  });

  // Keep in sync with activeTab prop
  useEffect(() => {
    if (activeTab === 'all-complaints') setCurrentSubTab('complaints');
    else if (activeTab === 'workforce-analytics') setCurrentSubTab('workforce');
    else if (activeTab === 'astrix-pipeline' || activeTab === 'pipeline' || activeTab === 'astrix') setCurrentSubTab('astrix');
    else if (activeTab === 'admin-dashboard') setCurrentSubTab('overview');
  }, [activeTab]);

  const handleSubTabChange = (tab) => {
    setCurrentSubTab(tab);
    if (onSelectTab) {
      if (tab === 'overview') onSelectTab('admin-dashboard');
      else if (tab === 'complaints') onSelectTab('all-complaints');
      else if (tab === 'workforce') onSelectTab('workforce-analytics');
      else if (tab === 'astrix') onSelectTab('astrix-pipeline');
    }
  };

  // 1. Institution-wide totals
  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;
  const inProgressComplaints = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved').length;
  const overdueComplaints = complaints.filter(c => c.status === 'Overdue' || (c.priority === 'Critical' && c.status === 'Pending')).length;
  
  // Escalated Complaints from Department Heads
  const escalatedComplaints = useMemo(() => {
    return complaints.filter(c => c.escalatedToAdmin || c.status === 'Escalated to Admin');
  }, [complaints]);

  const resolutionRate = totalComplaints > 0 ? Math.round((resolvedComplaints / totalComplaints) * 100) : 100;

  // 2. Department Comparisons
  const departments = ['Electrical', 'Plumbing', 'IT', 'Civil', 'Housekeeping', 'Security'];

  const departmentAnalytics = useMemo(() => {
    return departments.map((dept) => {
      const capacity = calculateDepartmentCapacity(dept, complaints, workers);
      const performance = calculateDepartmentPerformance(dept, complaints);
      return {
        name: dept,
        ...capacity,
        ...performance,
      };
    });
  }, [complaints, workers]);

  // 3. Category Breakdown for Visual Chart
  const categoryCounts = {
    Electrical: complaints.filter(c => (c.category || '').includes('Electrical')).length,
    Plumbing: complaints.filter(c => (c.category || '').includes('Plumbing')).length,
    'IT & Wi-Fi': complaints.filter(c => (c.category || '').includes('IT')).length,
    Civil: complaints.filter(c => (c.category || '').includes('Civil')).length,
    Housekeeping: complaints.filter(c => (c.category || '').includes('Housekeeping')).length,
    Security: complaints.filter(c => (c.category || '').includes('Security')).length,
  };

  const maxCategoryCount = Math.max(...Object.values(categoryCounts), 1);

  // 4. All Complaints Tab State
  const [complaintSearch, setComplaintSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTicketModal, setSelectedTicketModal] = useState(null);

  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const matchesSearch = complaintSearch === '' ||
        c.id.toLowerCase().includes(complaintSearch.toLowerCase()) ||
        c.title.toLowerCase().includes(complaintSearch.toLowerCase()) ||
        (c.location && c.location.toLowerCase().includes(complaintSearch.toLowerCase())) ||
        (c.submittedBy && c.submittedBy.toLowerCase().includes(complaintSearch.toLowerCase()));
      
      const matchesDept = deptFilter === 'All' || c.department === deptFilter;
      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [complaints, complaintSearch, deptFilter, statusFilter]);

  // 5. Cross-Department Worker Leaderboard State & Filter
  const [workforceMinHours, setWorkforceMinHours] = useState(0);

  const allRankedWorkers = useMemo(() => {
    return [...workers]
      .filter(w => (w.availableHours !== undefined ? w.availableHours : 4) >= workforceMinHours)
      .sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
  }, [workers, workforceMinHours]);

  return (
    <div>
      {/* 1. Header Banner & Sub-Navigation */}
      <AdminHeader
        currentSubTab={currentSubTab}
        onSelectSubTab={handleSubTabChange}
        escalatedCount={escalatedComplaints.length}
        totalComplaints={totalComplaints}
        totalWorkers={workers.length}
      />

      {/* 2. View 1: Executive Overview & Escalations */}
      {currentSubTab === 'overview' && (
        <AdminOverviewTab
          escalatedComplaints={escalatedComplaints}
          onAcknowledgeEscalation={onAcknowledgeEscalation}
          onInspectTicket={(ticket) => setSelectedTicketModal(ticket)}
          totalComplaints={totalComplaints}
          departments={departments}
          workers={workers}
          pendingComplaints={pendingComplaints}
          resolutionRate={resolutionRate}
          resolvedComplaints={resolvedComplaints}
          inProgressComplaints={inProgressComplaints}
          overdueComplaints={overdueComplaints}
          categoryCounts={categoryCounts}
          maxCategoryCount={maxCategoryCount}
          departmentAnalytics={departmentAnalytics}
        />
      )}

      {/* 3. View 2: Campus Complaints Registry */}
      {currentSubTab === 'complaints' && (
        <AdminComplaintsTab
          complaintSearch={complaintSearch}
          onSearchChange={setComplaintSearch}
          deptFilter={deptFilter}
          onDeptFilterChange={setDeptFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          departments={departments}
          filteredComplaints={filteredComplaints}
          totalComplaints={totalComplaints}
          onSelectTicketModal={(ticket) => setSelectedTicketModal(ticket)}
        />
      )}

      {/* 4. View 3: Workforce Intelligence & Leaderboard */}
      {currentSubTab === 'workforce' && (
        <AdminWorkforceTab
          workforceMinHours={workforceMinHours}
          onMinHoursChange={setWorkforceMinHours}
          allRankedWorkers={allRankedWorkers}
          departments={departments}
          workers={workers}
          complaints={complaints}
        />
      )}

      {/* 5. View 4: Astrix Live Operations Command Center */}
      {currentSubTab === 'astrix' && (
        <AstrixDashboard
          complaints={complaints}
          workers={workers}
          onAssignWorker={_onAssignWorker}
        />
      )}

      {/* 6. Full Ticket Dossier Modal */}
      <AdminTicketModal
        ticket={selectedTicketModal}
        onClose={() => setSelectedTicketModal(null)}
        onAcknowledgeEscalation={onAcknowledgeEscalation}
      />
    </div>
  );
}

export default AdminDashboard;
