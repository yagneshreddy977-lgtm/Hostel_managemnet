import React from 'react';
import Card from '../Card';
import StatusBadge from '../StatusBadge';
import Button from '../Button';
import { 
  Star, 
  Zap, 
  Users, 
  Trophy, 
  CheckCheck, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import '../components.css';

/**
 * InChargeOverviewTab Component
 * Tab View 1: Complete ongoing issues in department (assigned vs unassigned),
 * KPI metrics grid, and shift workforce capacity meter.
 *
 * @param {Object} props
 * @param {string} props.activeDept - Active department name (e.g. Electrical)
 * @param {number} props.totalCount - Total department complaints count
 * @param {Array} props.ongoingComplaints - Array of ongoing complaints
 * @param {Array} props.assignedOngoingComplaints - Complaints with assigned worker
 * @param {Array} props.unassignedOngoingComplaints - Complaints without assigned worker
 * @param {number} props.resolvedCount - Count of resolved complaints
 * @param {Object} props.performanceData - Department performance calculations
 * @param {Object} props.capacityData - Capacity calculation object
 * @param {Array} props.deptWorkers - List of workers in department
 * @param {string} props.overviewOngoingFilter - Current filter: 'all' | 'assigned' | 'unassigned'
 * @param {Function} props.onSetOverviewOngoingFilter - Filter change handler
 * @param {Array} props.displayedOverviewOngoing - Filtered list of ongoing complaints
 * @param {Function} props.onAssignWorkerClick - Opens assign modal for a complaint
 * @param {Function} props.onNavigateTab - Sub-navigation handler
 * @param {Function} props.onSetComplaintSegment - Sets complaint tab segment ('unassigned' | 'assigned')
 */
function InChargeOverviewTab({
  activeDept,
  totalCount,
  ongoingComplaints,
  assignedOngoingComplaints,
  unassignedOngoingComplaints,
  resolvedCount,
  performanceData,
  capacityData,
  deptWorkers,
  overviewOngoingFilter,
  onSetOverviewOngoingFilter,
  displayedOverviewOngoing,
  onAssignWorkerClick,
  onNavigateTab,
  onSetComplaintSegment,
}) {
  return (
    <div>
      {/* Top KPI Metrics Grid */}
      <div className="stats-row" style={{ marginTop: '0', marginBottom: '24px' }}>
        <div className="stat-box">
          <span className="stat-label">Total Department Tickets</span>
          <span className="stat-value">{totalCount}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>All-time filed in {activeDept}</div>
        </div>

        <div className="stat-box" style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <span className="stat-label" style={{ color: 'var(--color-primary)' }}>Ongoing Issues</span>
          <span className="stat-value" style={{ color: 'var(--color-primary)' }}>{ongoingComplaints.length}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Currently active repairs</div>
        </div>

        <div className="stat-box">
          <span className="stat-label" style={{ color: 'var(--color-success)' }}>Workers Dispatched</span>
          <span className="stat-value" style={{ color: 'var(--color-success)' }}>{assignedOngoingComplaints.length}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Assigned & in progress</div>
        </div>

        <div className="stat-box" style={{ borderLeft: unassignedOngoingComplaints.length > 0 ? '4px solid var(--color-warning)' : 'none' }}>
          <span className="stat-label" style={{ color: 'var(--color-warning)' }}>Awaiting Worker</span>
          <span className="stat-value" style={{ color: 'var(--color-warning)' }}>{unassignedOngoingComplaints.length}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Need technician assignment</div>
        </div>

        <div className="stat-box">
          <span className="stat-label" style={{ color: 'var(--color-success)' }}>Resolved Fixes</span>
          <span className="stat-value" style={{ color: 'var(--color-success)' }}>{resolvedCount}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Officially verified closed</div>
        </div>

        <div className="stat-box">
          <span className="stat-label" style={{ color: '#f59e0b' }}>Satisfaction Rating</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
            <Star size={20} fill="#f59e0b" color="#f59e0b" />
            <span className="stat-value" style={{ fontSize: '22px' }}>{performanceData.averageRating}</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Student & faculty reviews</div>
        </div>
      </div>

      {/* Two-Column Capacity & Workload Quick Gauge */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Capacity Meter */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-main)', margin: 0 }}>
                Shift Workforce Capacity
              </h3>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                Demand: {capacityData.requiredWorkHours} hrs vs Available: {capacityData.availableWorkerHours} hrs
              </div>
            </div>
            <span style={{
              fontSize: '14px',
              fontWeight: '700',
              padding: '3px 10px',
              borderRadius: '999px',
              backgroundColor: capacityData.isOverCapacity ? '#fee2e2' : 'var(--color-success-light)',
              color: capacityData.isOverCapacity ? 'var(--color-danger)' : 'var(--color-success)',
            }}>
              {capacityData.capacityUtilization}% Committed
            </span>
          </div>

          <div style={{ height: '10px', width: '100%', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '999px', overflow: 'hidden', marginBottom: '12px' }}>
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, capacityData.capacityUtilization)}%`,
                backgroundColor: capacityData.isOverCapacity ? 'var(--color-danger)' : capacityData.capacityUtilization > 75 ? 'var(--color-warning)' : 'var(--color-success)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
            {capacityData.statusText}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>
              Quick Dispatch Actions
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>
              Manage pending queue, assign workers via algorithmic capacity score, or review staff loads.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onSetComplaintSegment('unassigned');
                onNavigateTab('dept-complaints');
              }}
            >
              <Zap size={14} />
              <span>Assign Unassigned ({unassignedOngoingComplaints.length})</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigateTab('dept-workers')}
            >
              <Users size={14} />
              <span>Check Workers ({deptWorkers.length})</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigateTab('dept-analytics')}
            >
              <Trophy size={14} />
              <span>View Leaderboard</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Complete Ongoing Issues Section */}
      <Card
        title={`Complete Ongoing Department Issues (${ongoingComplaints.length})`}
        subtitle={`Full visibility into all active maintenance jobs in ${activeDept} — with clear indicators of assigned workers vs unassigned tickets`}
      >
        {/* Filter Pills for Ongoing */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => onSetOverviewOngoingFilter('all')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: '600',
              border: overviewOngoingFilter === 'all' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: overviewOngoingFilter === 'all' ? 'var(--color-primary-light)' : '#ffffff',
              color: overviewOngoingFilter === 'all' ? 'var(--color-primary)' : 'var(--color-text-main)',
              cursor: 'pointer',
            }}
          >
            All Ongoing ({ongoingComplaints.length})
          </button>

          <button
            type="button"
            onClick={() => onSetOverviewOngoingFilter('assigned')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: '600',
              border: overviewOngoingFilter === 'assigned' ? '2px solid var(--color-success)' : '1px solid var(--color-border)',
              backgroundColor: overviewOngoingFilter === 'assigned' ? '#f0fdf4' : '#ffffff',
              color: overviewOngoingFilter === 'assigned' ? 'var(--color-success)' : 'var(--color-text-main)',
              cursor: 'pointer',
            }}
          >
            ✓ Workers Assigned ({assignedOngoingComplaints.length})
          </button>

          <button
            type="button"
            onClick={() => onSetOverviewOngoingFilter('unassigned')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: '600',
              border: overviewOngoingFilter === 'unassigned' ? '2px solid var(--color-warning)' : '1px solid var(--color-border)',
              backgroundColor: overviewOngoingFilter === 'unassigned' ? '#fefce8' : '#ffffff',
              color: overviewOngoingFilter === 'unassigned' ? '#b45309' : 'var(--color-text-main)',
              cursor: 'pointer',
            }}
          >
            ⚠ Not Assigned ({unassignedOngoingComplaints.length})
          </button>
        </div>

        {/* Ongoing Complaints Feed */}
        {displayedOverviewOngoing.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: 'var(--color-text-muted)' }}>
            <CheckCheck size={36} style={{ color: 'var(--color-success)', marginBottom: '8px' }} />
            <h4>No ongoing issues matching this filter!</h4>
            <p style={{ fontSize: '13px' }}>All current complaints are either assigned or resolved.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {displayedOverviewOngoing.map((c) => {
              const isAssigned = Boolean(c.assignedWorker);
              return (
                <div
                  key={c.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    border: isAssigned ? '1px solid var(--color-border)' : '2px solid #fde047',
                    backgroundColor: isAssigned ? '#ffffff' : '#fefce8',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ flex: '1 1 320px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '800', color: 'var(--color-primary)' }}>{c.id}</span>
                      <StatusBadge value={c.priority} type="priority" />
                      <StatusBadge value={c.status} type="status" />
                      {c.escalatedToAdmin && (
                        <span style={{ fontSize: '10px', fontWeight: '700', backgroundColor: 'var(--color-danger)', color: '#ffffff', padding: '1px 6px', borderRadius: '4px' }}>
                          Escalated to Admin
                        </span>
                      )}
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>
                      {c.title}
                    </h4>

                    <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: 'var(--color-text-muted)', flexWrap: 'wrap' }}>
                      <span>📍 {c.location}</span>
                      <span>👤 Reported by: {c.submittedBy || c.studentName}</span>
                      <span>🕒 Expected: {c.expectedResolution || 'Within SLA'}</span>
                    </div>
                  </div>

                  {/* Assignment Status Pill & Action */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {isAssigned ? (
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: '700',
                          backgroundColor: '#f0fdf4',
                          color: 'var(--color-success)',
                          border: '1px solid #bbf7d0',
                        }}>
                          <CheckCircle2 size={13} />
                          Assigned: {c.assignedWorker}
                        </span>
                        <div style={{ marginTop: '4px' }}>
                          <button
                            type="button"
                            onClick={() => onAssignWorkerClick(c)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '11px', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            Reassign Technician
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: '700',
                          backgroundColor: '#fef08a',
                          color: '#854d0e',
                          border: '1px solid #facc15',
                        }}>
                          <AlertTriangle size={13} />
                          Worker Not Assigned
                        </span>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => onAssignWorkerClick(c)}
                        >
                          <Zap size={14} />
                          <span>Smart Assign</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

export default InChargeOverviewTab;
