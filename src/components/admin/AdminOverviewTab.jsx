import React from 'react';
import Card from '../Card';
import StatusBadge from '../StatusBadge';
import Button from '../Button';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  Hourglass, 
  AlertTriangle, 
  TrendingUp, 
  Star, 
  Check, 
  Eye 
} from 'lucide-react';
import '../components.css';

/**
 * AdminOverviewTab Component
 * Executive Overview Tab: Escalation alerts from Department Heads,
 * Institution-wide KPI metrics, Category & Lifecycle breakdown charts,
 * and Cross-Department Capacity Comparison Table.
 *
 * @param {Object} props
 * @param {Array} props.escalatedComplaints - List of escalated complaints
 * @param {Function} props.onAcknowledgeEscalation - Handler for escalation acknowledgment
 * @param {Function} props.onInspectTicket - Handler to open ticket modal
 * @param {number} props.totalComplaints - Total complaint count
 * @param {Array} props.departments - List of department names
 * @param {Array} props.workers - Workers list
 * @param {number} props.pendingComplaints - Pending count
 * @param {number} props.resolutionRate - Overall resolution %
 * @param {number} props.resolvedComplaints - Resolved count
 * @param {number} props.inProgressComplaints - In-progress count
 * @param {number} props.overdueComplaints - Overdue count
 * @param {Object} props.categoryCounts - Map of category to ticket count
 * @param {number} props.maxCategoryCount - Maximum category count for relative bar width
 * @param {Array} props.departmentAnalytics - Array of capacity and performance metrics per department
 */
function AdminOverviewTab({
  escalatedComplaints,
  onAcknowledgeEscalation,
  onInspectTicket,
  totalComplaints,
  departments,
  workers,
  pendingComplaints,
  resolutionRate,
  resolvedComplaints,
  inProgressComplaints,
  overdueComplaints,
  categoryCounts,
  maxCategoryCount,
  departmentAnalytics,
}) {
  return (
    <div>
      {/* Executive Escalations Alert Banner */}
      {escalatedComplaints.length > 0 ? (
        <div style={{
          backgroundColor: '#fff5f5',
          border: '2px solid #ef4444',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 22px',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#fee2e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#dc2626'
              }}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#991b1b', margin: 0 }}>
                  Executive Escalations from Department Heads ({escalatedComplaints.length} Urgent Action Items)
                </h3>
                <p style={{ fontSize: '12px', color: '#7f1d1d', margin: '2px 0 0 0' }}>
                  These high-priority issues were formally escalated by Department Heads requiring Administrative approval or specialized external vendors.
                </p>
              </div>
            </div>

            <span style={{
              padding: '4px 12px',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '11px',
              borderRadius: '999px',
              letterSpacing: '0.4px',
              textTransform: 'uppercase'
            }}>
              Urgent Intervention Required
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {escalatedComplaints.map((c) => (
              <div
                key={c.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 20px',
                  border: '1px solid #fca5a5',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px'
                }}
              >
                <div style={{ flex: '1 1 380px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '800', color: '#dc2626', fontSize: '14px' }}>{c.id}</span>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '700',
                      backgroundColor: '#fee2e2',
                      color: '#991b1b'
                    }}>
                      {c.department} Department
                    </span>
                    <StatusBadge value={c.priority} type="priority" />
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '700',
                      backgroundColor: '#ffedd5',
                      color: '#c2410c'
                    }}>
                      Urgency: {c.escalationUrgency || 'Critical'}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>
                    {c.title}
                  </h4>

                  <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '0 0 8px 0' }}>
                    📍 {c.location} • Reported by: <strong>{c.submittedBy || c.studentName}</strong> • Target SLA: {c.expectedResolution}
                  </p>

                  <div style={{
                    padding: '10px 14px',
                    backgroundColor: '#fff1f2',
                    borderLeft: '4px solid #e11d48',
                    borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                    fontSize: '12px',
                    color: '#881337'
                  }}>
                    <strong>Escalation Justification from {c.escalatedBy || `${c.department} Head`}:</strong>
                    <div style={{ marginTop: '2px', fontStyle: 'italic' }}>
                      "{c.escalationReason || 'Budget threshold exceeded or specialized contractor required.'}"
                    </div>
                    <div style={{ fontSize: '11px', color: '#9f1239', marginTop: '4px' }}>
                      Reported on: {c.escalatedAt || 'Today, 09:30 AM'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  {onAcknowledgeEscalation && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onAcknowledgeEscalation(c.id)}
                    >
                      <Check size={14} />
                      <span>Authorize Procurement & Acknowledge</span>
                    </Button>
                  )}

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onInspectTicket(c)}
                  >
                    <Eye size={14} />
                    <span>Inspect Ticket Dossier</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: 'var(--radius-lg)',
          padding: '14px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <CheckCircle2 size={20} style={{ color: 'var(--color-success)' }} />
          <div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-success)' }}>
              All Campus Departments Operating Within SLA Bounds
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginLeft: '8px' }}>
              Zero unresolved executive escalations reported by Department Heads at this time.
            </span>
          </div>
        </div>
      )}

      {/* 2. Key Institution Metrics Grid */}
      <div className="stats-row" style={{ marginTop: '0', marginBottom: '24px' }}>
        <div className="stat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="stat-label">Total Campus Issues</span>
            <Building2 size={18} style={{ color: 'var(--color-primary)' }} />
          </div>
          <span className="stat-value">{totalComplaints}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Across all facilities</div>
        </div>

        <div className="stat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="stat-label">Active Departments</span>
            <Building2 size={18} style={{ color: 'var(--color-text-muted)' }} />
          </div>
          <span className="stat-value">{departments.length}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Operational service wings</div>
        </div>

        <div className="stat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="stat-label">On-Duty Workforce</span>
            <Users size={18} style={{ color: 'var(--color-accent)' }} />
          </div>
          <span className="stat-value">{workers.length} <span style={{ fontSize: '13px', fontWeight: 'normal', color: 'var(--color-text-muted)' }}>Staff</span></span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Assigned technicians</div>
        </div>

        <div className="stat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="stat-label" style={{ color: 'var(--color-warning)' }}>Pending Action</span>
            <Hourglass size={18} style={{ color: 'var(--color-warning)' }} />
          </div>
          <span className="stat-value" style={{ color: 'var(--color-warning)' }}>{pendingComplaints}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Awaiting initial triage</div>
        </div>

        <div className="stat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="stat-label" style={{ color: escalatedComplaints.length > 0 ? 'var(--color-danger)' : 'var(--color-text-muted)' }}>
              Active Escalations
            </span>
            <AlertTriangle size={18} style={{ color: escalatedComplaints.length > 0 ? 'var(--color-danger)' : 'var(--color-text-muted)' }} />
          </div>
          <span className="stat-value" style={{ color: escalatedComplaints.length > 0 ? 'var(--color-danger)' : 'var(--color-text-main)' }}>
            {escalatedComplaints.length}
          </span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Dispatched to Director</div>
        </div>

        <div className="stat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="stat-label" style={{ color: 'var(--color-success)' }}>Campus Resolution Rate</span>
            <TrendingUp size={18} style={{ color: 'var(--color-success)' }} />
          </div>
          <span className="stat-value" style={{ color: 'var(--color-success)' }}>{resolutionRate}%</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{resolvedComplaints} of {totalComplaints} closed</div>
        </div>
      </div>

      {/* 3. Visual Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Chart 1: Complaints by Category */}
        <Card title="Complaints by Category (Frequency Distribution)" subtitle="Visual breakdown of maintenance demand by campus service sector">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const barPercent = Math.round((count / maxCategoryCount) * 100);
              return (
                <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{cat}</span>
                    <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>{count} issues</span>
                  </div>
                  <div style={{ height: '9px', width: '100%', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${barPercent}%`, backgroundColor: 'var(--color-primary)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Chart 2: Status Lifecycle Breakdown */}
        <Card title="Campus Resolution Progress" subtitle="Proportion of issues currently pending vs. in repair vs. resolved">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Multi-segment stacked bar */}
            <div style={{ height: '18px', width: '100%', borderRadius: '999px', overflow: 'hidden', display: 'flex', backgroundColor: 'var(--color-bg-subtle)' }}>
              <div style={{ width: `${(resolvedComplaints / totalComplaints) * 100}%`, backgroundColor: 'var(--color-success)' }} title="Resolved" />
              <div style={{ width: `${(inProgressComplaints / totalComplaints) * 100}%`, backgroundColor: 'var(--color-primary)' }} title="In Progress" />
              <div style={{ width: `${(pendingComplaints / totalComplaints) * 100}%`, backgroundColor: 'var(--color-warning)' }} title="Pending" />
              <div style={{ width: `${(overdueComplaints / totalComplaints) * 100}%`, backgroundColor: 'var(--color-danger)' }} title="Overdue" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '13px', paddingTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--color-success)' }} />
                <span>Resolved: <strong>{resolvedComplaints}</strong> ({Math.round((resolvedComplaints / totalComplaints) * 100)}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--color-primary)' }} />
                <span>In Progress: <strong>{inProgressComplaints}</strong> ({Math.round((inProgressComplaints / totalComplaints) * 100)}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--color-warning)' }} />
                <span>Pending: <strong>{pendingComplaints}</strong> ({Math.round((pendingComplaints / totalComplaints) * 100)}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--color-danger)' }} />
                <span>Overdue: <strong>{overdueComplaints}</strong></span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 4. Cross-Department Comparison Table */}
      <Card
        title="Department Workforce & Capacity Comparison"
        subtitle="Evaluating capacity bottlenecks, resolution velocity, and student satisfaction ratings across wings"
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '12px 14px' }}>Department</th>
                <th style={{ padding: '12px 14px' }}>Staff</th>
                <th style={{ padding: '12px 14px' }}>Total Issues</th>
                <th style={{ padding: '12px 14px' }}>Resolution Rate</th>
                <th style={{ padding: '12px 14px' }}>Capacity Utilization</th>
                <th style={{ padding: '12px 14px' }}>Satisfaction</th>
                <th style={{ padding: '12px 14px' }}>Condition Status</th>
              </tr>
            </thead>
            <tbody>
              {departmentAnalytics.map((dept) => {
                const isOver = dept.isOverCapacity;
                return (
                  <tr key={dept.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px 14px', fontWeight: '700', color: 'var(--color-text-main)' }}>
                      {dept.name}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      {dept.workersCount} Workers
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: '600' }}>
                      {dept.totalComplaints}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '700', width: '36px' }}>{dept.resolutionRate}%</span>
                        <div style={{ height: '6px', width: '70px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${dept.resolutionRate}%`, backgroundColor: 'var(--color-success)' }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontWeight: '700', color: isOver ? 'var(--color-danger)' : dept.capacityUtilization > 75 ? 'var(--color-warning)' : 'var(--color-text-main)' }}>
                        {dept.capacityUtilization}%
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                        {dept.averageRating}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '999px',
                        backgroundColor: isOver ? '#fee2e2' : '#f0fdf4',
                        color: isOver ? '#b91c1c' : '#15803d',
                      }}>
                        {isOver ? '⚠ Over Capacity' : '✓ Normal Operation'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default AdminOverviewTab;
