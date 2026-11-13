import React from 'react';
import Card from '../Card';
import StatusBadge from '../StatusBadge';
import Button from '../Button';
import { AlertTriangle, CheckCircle2, Send, Zap } from 'lucide-react';
import '../components.css';

/**
 * InChargeEscalationsTab Component
 * Tab View 5: Overdue complaints, high-risk safety hazards, and direct
 * administrative escalation dispatch reporting.
 *
 * @param {Object} props
 * @param {string} props.activeDept - Active department
 * @param {number} props.overdueCount - Count of items requiring supervisor action
 * @param {Array} props.escalationList - Filtered complaints needing escalation
 * @param {Object} props.headInfo - Department head details
 * @param {Function} props.onEscalateClick - Trigger for Escalate modal
 * @param {Function} props.onAssignWorkerClick - Trigger for Smart Assign modal
 */
function InChargeEscalationsTab({
  activeDept,
  overdueCount,
  escalationList,
  headInfo,
  onEscalateClick,
  onAssignWorkerClick,
}) {
  return (
    <div>
      {/* Header Explanation */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 24px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-danger)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} />
            Department Escalations & Administrative Dispatch
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
            Track overdue maintenance, high-severity hazards, or unassigned emergencies. Report directly to Central Administration (Campus Director) for budget authorization or external vendor assistance.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            fontWeight: '700',
            backgroundColor: '#fee2e2',
            color: 'var(--color-danger)'
          }}>
            {overdueCount} Items Requiring Supervisor Action
          </span>
        </div>
      </div>

      {/* Escalations Table */}
      <Card
        title={`Active Escalations & High-Risk Issues (${escalationList.length})`}
        subtitle="Issues flagged as overdue or critical emergency without assigned worker"
      >
        {escalationList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
            <CheckCircle2 size={40} style={{ color: 'var(--color-success)', marginBottom: '10px' }} />
            <h4>No active escalations!</h4>
            <p style={{ fontSize: '13px' }}>All issues in {activeDept} are operating comfortably within their SLA deadlines.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {escalationList.map((c) => (
              <div
                key={c.id}
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--color-danger)',
                  backgroundColor: '#fffbfa',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                }}
              >
                <div style={{ flex: '1 1 360px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '800', color: 'var(--color-danger)', fontSize: '15px' }}>{c.id}</span>
                    <StatusBadge value={c.priority} type="priority" />
                    <StatusBadge value={c.status} type="status" />
                    {c.escalatedToAdmin && (
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '700',
                        backgroundColor: 'var(--color-danger)',
                        color: '#ffffff'
                      }}>
                        🚨 Escalated to Central Admin
                      </span>
                    )}
                  </div>

                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-main)', margin: '0 0 6px 0' }}>
                    {c.title}
                  </h4>

                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <span>📍 Location: {c.location}</span>
                    <span>👤 Submitter: {c.submittedBy || c.studentName}</span>
                    <span>🕒 Expected: {c.expectedResolution}</span>
                  </div>

                  {c.escalatedToAdmin && (
                    <div style={{
                      marginTop: '10px',
                      padding: '8px 12px',
                      backgroundColor: '#fee2e2',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px',
                      color: '#991b1b',
                    }}>
                      <strong>Official Escalation Report Dispatched to Campus Director:</strong>
                      <div style={{ marginTop: '2px' }}>"{c.escalationReason || 'Severe breakdown requiring administrative intervention.'}" [Urgency: {c.escalationUrgency || 'High'}]</div>
                      <div style={{ fontSize: '10px', color: '#b91c1c', marginTop: '2px' }}>Reported by {c.escalatedBy || headInfo?.name} on {c.escalatedAt}</div>
                    </div>
                  )}
                </div>

                {/* Escalation Action Button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  {!c.escalatedToAdmin ? (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onEscalateClick(c)}
                    >
                      <Send size={14} />
                      <span>Report to Administration</span>
                    </Button>
                  ) : (
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={14} />
                      Notice Delivered to Admin
                    </span>
                  )}

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onAssignWorkerClick(c)}
                  >
                    <Zap size={14} />
                    <span>Assign Worker Now</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default InChargeEscalationsTab;
