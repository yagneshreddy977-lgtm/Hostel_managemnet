import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  UserCheck, 
  AlertCircle, 
  Clock, 
  MapPin, 
  User, 
  X,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { CmdKeyIcon } from './AstrixIcons';

const PAGE_SIZE = 6;

/**
 * Astrix Live Stream Table Component
 * High-density tabular stream with pill filters, real-time search,
 * quick ticket detail modal, and pagination.
 */
export default function AstrixStreamTable({
  complaints = [],
  workers = [],
  onAssignWorker,
  stageFilter,
  onClearStageFilter,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Dynamic filter counters
  const counts = useMemo(() => {
    return {
      all: complaints.length,
      critical: complaints.filter(c => c.priority === 'Critical' || c.status === 'Overdue').length,
      inProgress: complaints.filter(c => c.status === 'In Progress').length,
      pending: complaints.filter(c => c.status === 'Pending').length,
      resolved: complaints.filter(c => c.status === 'Resolved').length,
    };
  }, [complaints]);

  const filterOptions = [
    { value: 'all', label: 'All Operations', count: counts.all },
    { value: 'critical', label: 'Critical Queue', count: counts.critical },
    { value: 'inProgress', label: 'In Progress', count: counts.inProgress },
    { value: 'pending', label: 'Pending Triage', count: counts.pending },
    { value: 'resolved', label: 'Resolved SLA', count: counts.resolved },
  ];

  // Filtered complaints calculation
  const filteredComplaints = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return complaints.filter((c) => {
      // 1. Stage filter from pipeline if selected
      if (stageFilter) {
        if (stageFilter === 'intake' && (c.status !== 'Pending' || c.assignedWorker)) return false;
        if (stageFilter === 'triage' && c.status !== 'Pending') return false;
        if (stageFilter === 'dispatch' && c.status !== 'In Progress') return false;
        if (stageFilter === 'resolution' && (c.status !== 'In Progress' || !c.assignedWorker)) return false;
        if (stageFilter === 'signoff' && c.status !== 'Resolved') return false;
      }

      // 2. Status filter
      if (statusFilter === 'critical') {
        if (c.priority !== 'Critical' && c.status !== 'Overdue') return false;
      } else if (statusFilter === 'inProgress') {
        if (c.status !== 'In Progress') return false;
      } else if (statusFilter === 'pending') {
        if (c.status !== 'Pending') return false;
      } else if (statusFilter === 'resolved') {
        if (c.status !== 'Resolved') return false;
      }

      // 3. Department filter
      if (deptFilter !== 'all') {
        if (c.department?.toLowerCase() !== deptFilter.toLowerCase()) return false;
      }

      // 4. Search query
      if (q) {
        const matchId = c.id?.toLowerCase().includes(q);
        const matchTitle = c.title?.toLowerCase().includes(q);
        const matchLoc = c.location?.toLowerCase().includes(q);
        const matchDept = c.department?.toLowerCase().includes(q);
        const matchWorker = c.assignedWorker?.toLowerCase().includes(q);
        if (!matchId && !matchTitle && !matchLoc && !matchDept && !matchWorker) return false;
      }

      return true;
    });
  }, [complaints, searchQuery, statusFilter, deptFilter, stageFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredComplaints.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageRows = filteredComplaints.slice(pageStart, pageStart + PAGE_SIZE);

  const handleFilterClick = (val) => {
    setStatusFilter(val);
    setPage(1);
  };

  const departments = ['All', 'Electrical', 'Plumbing', 'IT', 'Civil', 'Housekeeping', 'Security'];

  return (
    <section className="astrix-stream-section">
      {/* Stream Header */}
      <div className="astrix-stream-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: 'var(--astrix-text-primary)' }}>
              Live Operations Stream & Dispatch Queue
            </h2>
            {stageFilter && (
              <button
                type="button"
                onClick={onClearStageFilter}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: '700',
                  backgroundColor: 'var(--astrix-primary-light)',
                  color: 'var(--astrix-primary)',
                  border: '1px solid var(--astrix-primary)',
                  cursor: 'pointer',
                }}
              >
                <span>Stage Filter: {stageFilter}</span>
                <X size={12} />
              </button>
            )}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--astrix-text-muted)', margin: '4px 0 0 0' }}>
            Current campus tickets, assigned personnel, and service-level targets.
          </p>
        </div>

        {/* Search & Department Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={deptFilter}
            onChange={(e) => {
              setDeptFilter(e.target.value);
              setPage(1);
            }}
            style={{
              height: '40px',
              padding: '0 12px',
              borderRadius: 'var(--astrix-radius-sm)',
              border: '1px solid var(--astrix-border)',
              backgroundColor: 'var(--astrix-surface-subtle)',
              color: 'var(--astrix-text-primary)',
              fontSize: '13px',
              fontWeight: '600',
              outline: 'none',
              cursor: 'pointer',
            }}
            aria-label="Filter by department"
          >
            {departments.map(d => (
              <option key={d} value={d.toLowerCase()}>{d === 'All' ? 'All Departments' : d}</option>
            ))}
          </select>

          <div className="astrix-search-box">
            <Search size={16} style={{ color: 'var(--astrix-text-subtle)' }} />
            <input
              type="text"
              placeholder="Search tickets, rooms, staff..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              aria-label="Search complaints"
            />
            <span className="astrix-search-shortcut">
              <CmdKeyIcon /> K
            </span>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        <div className="astrix-stream-filters">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`astrix-filter-pill ${statusFilter === opt.value ? 'active' : ''}`}
              onClick={() => handleFilterClick(opt.value)}
            >
              <span>{opt.label}</span>
              <span className="badge">{opt.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="astrix-table-container">
        <table className="astrix-table">
          <thead>
            <tr>
              <th style={{ width: '32%' }}>Ticket & Description</th>
              <th style={{ width: '15%' }}>Department</th>
              <th style={{ width: '15%' }}>Urgency / SLA</th>
              <th style={{ width: '15%' }}>Status</th>
              <th style={{ width: '15%' }}>Assigned Staff</th>
              <th style={{ width: '8%', textAlign: 'center' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--astrix-text-muted)' }}>
                  No complaints match the selected filter criteria.
                </td>
              </tr>
            ) : (
              pageRows.map((c) => {
                const isCritical = c.priority === 'Critical' || c.status === 'Overdue';
                const isResolved = c.status === 'Resolved';
                const isInProgress = c.status === 'In Progress';

                return (
                  <tr key={c.id}>
                    {/* Ticket & Location */}
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: '800', color: 'var(--astrix-primary)', fontSize: '12px' }}>
                            {c.id}
                          </span>
                          <span style={{ fontWeight: '600', color: 'var(--astrix-text-primary)' }}>
                            {c.title}
                          </span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--astrix-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={11} />
                          <span>{c.location || 'Campus Facility'}</span>
                          <span>•</span>
                          <span>{c.submittedBy || 'Resident'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: 'var(--astrix-surface-subtle)',
                        border: '1px solid var(--astrix-border)',
                      }}>
                        {c.department || 'General'}
                      </span>
                    </td>

                    {/* Urgency */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: isCritical 
                            ? 'var(--astrix-danger)' 
                            : c.priority === 'High' 
                            ? 'var(--astrix-warning)' 
                            : 'var(--astrix-info)',
                        }} />
                        <span style={{ fontWeight: '600', fontSize: '12px' }}>
                          {c.priority}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--astrix-text-subtle)', marginTop: '2px' }}>
                        {c.expectedResolution ? `Target: ${c.expectedResolution.split(' ')[1] || 'Today'}` : 'SLA Standard'}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td>
                      <span className={`astrix-status-badge ${
                        isResolved 
                          ? 'astrix-status-resolved' 
                          : isInProgress 
                          ? 'astrix-status-processing' 
                          : isCritical 
                          ? 'astrix-status-critical' 
                          : 'astrix-status-pending'
                      }`}>
                        {isResolved ? (
                          <CheckCircle2 size={12} />
                        ) : isInProgress ? (
                          <Clock size={12} />
                        ) : (
                          <AlertCircle size={12} />
                        )}
                        <span>{c.status}</span>
                      </span>
                    </td>

                    {/* Assigned Worker */}
                    <td>
                      {c.assignedWorker ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <User size={13} style={{ color: 'var(--astrix-primary)' }} />
                          <span style={{ fontWeight: '600', fontSize: '12px' }}>{c.assignedWorker}</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onAssignWorker && onAssignWorker(c.id, workers[0]?.name || 'On-Duty Tech')}
                          className="astrix-btn astrix-btn-primary"
                          style={{ height: '28px', padding: '0 10px', fontSize: '11px' }}
                        >
                          <UserCheck size={12} />
                          <span>Quick Dispatch</span>
                        </button>
                      )}
                    </td>

                    {/* Action */}
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedTicket(c)}
                        className="astrix-btn-icon"
                        title="View Full Ticket Telemetry"
                        aria-label={`View details for ${c.id}`}
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="astrix-pagination">
        <div>
          Showing <strong>{pageRows.length}</strong> of <strong>{filteredComplaints.length}</strong> operations
        </div>

        <div className="astrix-page-buttons">
          <button
            type="button"
            className="astrix-page-btn"
            disabled={currentPage <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              className={`astrix-page-btn ${pageNum === currentPage ? 'active' : ''}`}
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            className="astrix-page-btn"
            disabled={currentPage >= totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Ticket Details Astrix Modal */}
      {selectedTicket && (
        <div className="astrix-modal-backdrop" onClick={() => setSelectedTicket(null)}>
          <div className="astrix-modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid var(--astrix-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--astrix-surface-subtle)',
            }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--astrix-primary)', textTransform: 'uppercase' }}>
                  {selectedTicket.department} DEPARTMENT TICKET
                </span>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '18px', fontWeight: '700', color: 'var(--astrix-text-primary)' }}>
                  {selectedTicket.id}: {selectedTicket.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="astrix-btn-icon"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
                <div>
                  <span style={{ color: 'var(--astrix-text-muted)' }}>Location:</span>
                  <div style={{ fontWeight: '600', color: 'var(--astrix-text-primary)' }}>{selectedTicket.location}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--astrix-text-muted)' }}>Reported By:</span>
                  <div style={{ fontWeight: '600', color: 'var(--astrix-text-primary)' }}>{selectedTicket.submittedBy}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--astrix-text-muted)' }}>Priority Level:</span>
                  <div style={{ fontWeight: '700', color: selectedTicket.priority === 'Critical' ? 'var(--astrix-danger)' : 'var(--astrix-primary)' }}>
                    {selectedTicket.priority} Priority
                  </div>
                </div>
                <div>
                  <span style={{ color: 'var(--astrix-text-muted)' }}>Lifecycle Status:</span>
                  <div style={{ fontWeight: '600', color: 'var(--astrix-text-primary)' }}>{selectedTicket.status}</div>
                </div>
              </div>

              <div style={{ padding: '14px', backgroundColor: 'var(--astrix-surface-subtle)', borderRadius: 'var(--astrix-radius-sm)', border: '1px solid var(--astrix-border)' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--astrix-text-muted)', textTransform: 'uppercase' }}>
                  Assigned Personnel Telemetry
                </span>
                <div style={{ marginTop: '4px', fontSize: '13px', fontWeight: '600', color: 'var(--astrix-text-primary)' }}>
                  {selectedTicket.assignedWorker ? (
                    `Active Technician: ${selectedTicket.assignedWorker}`
                  ) : (
                    'Awaiting algorithmic assignment by Department In-Charge'
                  )}
                </div>
              </div>
            </div>

            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--astrix-border)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              backgroundColor: 'var(--astrix-surface-subtle)',
            }}>
              <button
                type="button"
                className="astrix-btn astrix-btn-secondary"
                onClick={() => setSelectedTicket(null)}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
