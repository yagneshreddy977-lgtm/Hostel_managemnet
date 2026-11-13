import React from 'react';
import Card from '../Card';
import StatusBadge from '../StatusBadge';
import Button from '../Button';
import { 
  Search, 
  AlertCircle, 
  UserCheck, 
  CheckCheck, 
  FileText, 
  Zap, 
  Send 
} from 'lucide-react';
import '../components.css';

/**
 * InChargeComplaintsTab Component
 * Tab View 2: Department Complaints segmented into Assigned vs. Unassigned queues,
 * with search, priority filtering, and smart dispatch buttons.
 *
 * @param {Object} props
 * @param {string} props.activeDept - Department name
 * @param {string} props.complaintSegment - 'unassigned' | 'assigned'
 * @param {Function} props.onSetComplaintSegment - Handler for switching segment
 * @param {Array} props.allUnassignedComplaints - Full unassigned list
 * @param {Array} props.allAssignedComplaints - Full assigned list
 * @param {string} props.complaintSearch - Search keyword
 * @param {Function} props.onSearchChange - Search input change handler
 * @param {string} props.complaintPriorityFilter - 'all' | 'Critical' | 'High' | 'Medium' | 'Low'
 * @param {Function} props.onPriorityFilterChange - Priority filter change handler
 * @param {Array} props.displayedSegmentComplaints - Filtered list to render
 * @param {Function} props.onAssignWorkerClick - Trigger for Smart Assign modal
 * @param {Function} props.onEscalateClick - Trigger for Escalate modal
 */
function InChargeComplaintsTab({
  activeDept,
  complaintSegment,
  onSetComplaintSegment,
  allUnassignedComplaints,
  allAssignedComplaints,
  complaintSearch,
  onSearchChange,
  complaintPriorityFilter,
  onPriorityFilterChange,
  displayedSegmentComplaints,
  onAssignWorkerClick,
  onEscalateClick,
}) {
  return (
    <div>
      {/* Segment Selector Banner */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 20px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-main)', margin: 0 }}>
              Manage Department Complaints
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
              Divided into two operational segments: Assigned tasks currently undergoing repair, and Unassigned tickets awaiting dispatch.
            </p>
          </div>

          {/* 2 Segment Switch Buttons */}
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'var(--color-bg-subtle)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
            <button
              type="button"
              onClick={() => onSetComplaintSegment('unassigned')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: '700',
                border: 'none',
                backgroundColor: complaintSegment === 'unassigned' ? '#ffffff' : 'transparent',
                color: complaintSegment === 'unassigned' ? '#b45309' : 'var(--color-text-muted)',
                boxShadow: complaintSegment === 'unassigned' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
              }}
            >
              <AlertCircle size={15} style={{ color: '#eab308' }} />
              <span>Not Assigned (Unassigned)</span>
              <span style={{
                padding: '2px 7px',
                borderRadius: '999px',
                fontSize: '11px',
                backgroundColor: complaintSegment === 'unassigned' ? '#fef08a' : '#e2e8f0',
                color: complaintSegment === 'unassigned' ? '#854d0e' : 'var(--color-text-muted)',
              }}>
                {allUnassignedComplaints.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onSetComplaintSegment('assigned')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: '700',
                border: 'none',
                backgroundColor: complaintSegment === 'assigned' ? '#ffffff' : 'transparent',
                color: complaintSegment === 'assigned' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                boxShadow: complaintSegment === 'assigned' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
              }}
            >
              <UserCheck size={15} style={{ color: 'var(--color-primary)' }} />
              <span>Assigned Workers</span>
              <span style={{
                padding: '2px 7px',
                borderRadius: '999px',
                fontSize: '11px',
                backgroundColor: complaintSegment === 'assigned' ? 'var(--color-primary)' : '#e2e8f0',
                color: complaintSegment === 'assigned' ? '#ffffff' : 'var(--color-text-muted)',
              }}>
                {allAssignedComplaints.length}
              </span>
            </button>
          </div>
        </div>

        {/* Filter and Search Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '14px', borderTop: '1px solid var(--color-border)' }}>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--color-bg-subtle)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', width: '280px' }}>
            <Search size={15} style={{ color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              placeholder="Search ticket, title, location, worker..."
              value={complaintSearch}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: '12px',
                width: '100%',
                color: 'var(--color-text-main)'
              }}
            />
            {complaintSearch && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '11px' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Priority Filters */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginRight: '4px' }}>Priority:</span>
            {['all', 'Critical', 'High', 'Medium', 'Low'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onPriorityFilterChange(p)}
                style={{
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: '600',
                  borderRadius: 'var(--radius-sm)',
                  border: complaintPriorityFilter === p ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: complaintPriorityFilter === p ? 'var(--color-primary)' : '#ffffff',
                  color: complaintPriorityFilter === p ? '#ffffff' : 'var(--color-text-main)',
                  cursor: 'pointer',
                }}
              >
                {p === 'all' ? 'All Priorities' : p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Segment Feed */}
      <Card
        title={
          complaintSegment === 'unassigned'
            ? `Not Assigned Segment (${displayedSegmentComplaints.length} Tickets Awaiting Worker)`
            : `Assigned Workers Segment (${displayedSegmentComplaints.length} Tickets Under Repair)`
        }
        subtitle={
          complaintSegment === 'unassigned'
            ? 'These tickets currently have NO assigned technician. Use Smart Workload-Based Assignment to match optimal workers.'
            : 'These tickets have technicians dispatched on-site. You can monitor progress or reassign workers to balance loads.'
        }
      >
        {displayedSegmentComplaints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
            {complaintSegment === 'unassigned' ? (
              <>
                <CheckCheck size={40} style={{ color: 'var(--color-success)', marginBottom: '10px' }} />
                <h4 style={{ color: 'var(--color-text-main)' }}>Zero Unassigned Tickets!</h4>
                <p style={{ fontSize: '13px' }}>All maintenance issues in {activeDept} have been matched with active campus workers.</p>
              </>
            ) : (
              <>
                <FileText size={40} style={{ color: 'var(--color-text-light)', marginBottom: '10px' }} />
                <h4 style={{ color: 'var(--color-text-main)' }}>No assigned tickets found matching your search.</h4>
                <p style={{ fontSize: '13px' }}>Try clearing filters or assigning tickets from the Not Assigned segment.</p>
              </>
            )}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '10px 12px' }}>Ticket ID</th>
                  <th style={{ padding: '10px 12px' }}>Problem Title & Location</th>
                  <th style={{ padding: '10px 12px' }}>Priority</th>
                  <th style={{ padding: '10px 12px' }}>Status</th>
                  <th style={{ padding: '10px 12px' }}>{complaintSegment === 'assigned' ? 'Assigned Worker' : 'Dispatch Action'}</th>
                  <th style={{ padding: '10px 12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedSegmentComplaints.map((c) => {
                  const isUnassigned = !c.assignedWorker;
                  return (
                    <tr
                      key={c.id}
                      style={{
                        borderBottom: '1px solid var(--color-border)',
                        backgroundColor: isUnassigned && c.priority === 'Critical' ? '#fff5f5' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '12px 10px', fontWeight: '800', color: 'var(--color-primary)' }}>
                        {c.id}
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <div style={{ fontWeight: '700', color: 'var(--color-text-main)' }}>{c.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          📍 {c.location} • 👤 {c.submittedBy || c.studentName}
                        </div>
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <StatusBadge value={c.priority} type="priority" />
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <StatusBadge value={c.status} type="status" />
                        {c.escalatedToAdmin && (
                          <div style={{ marginTop: '4px' }}>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--color-danger)' }}>
                              🚨 Escalated
                            </span>
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        {c.assignedWorker ? (
                          <div>
                            <span style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>
                              {c.assignedWorker}
                            </span>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                              Active on site
                            </div>
                          </div>
                        ) : (
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '11px',
                            fontWeight: '700',
                            backgroundColor: '#fee2e2',
                            color: 'var(--color-danger)'
                          }}>
                            ⚠ No Worker Assigned
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Button
                            variant={isUnassigned ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => onAssignWorkerClick(c)}
                          >
                            <Zap size={13} />
                            <span>{isUnassigned ? 'Smart Assign' : 'Reassign'}</span>
                          </Button>

                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onEscalateClick(c)}
                            title="Escalate ticket to Administration"
                          >
                            <Send size={13} />
                            <span>Escalate</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

export default InChargeComplaintsTab;
