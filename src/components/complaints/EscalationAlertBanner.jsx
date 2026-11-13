import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import '../components.css';

/**
 * EscalationAlertBanner Component
 * Displays priority executive escalation notices and Central Administration acknowledgment updates.
 */
function EscalationAlertBanner({ complaint }) {
  if (!complaint) return null;

  const {
    escalatedToAdmin,
    escalationReason,
    escalationUrgency,
    escalatedAt,
    adminAcknowledged,
    adminNotes,
  } = complaint;

  if (!escalatedToAdmin && !adminAcknowledged) return null;

  return (
    <>
      {escalatedToAdmin && (
        <div style={{
          backgroundColor: '#fff1f2',
          border: '1px solid #fecdd3',
          borderLeft: '4px solid var(--color-danger, #ef4444)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', fontWeight: '700', fontSize: '14px' }}>
            <AlertTriangle size={18} />
            <span>Official Executive Escalation Active [Urgency: {escalationUrgency || 'High'}]</span>
          </div>
          <div style={{ fontSize: '13px', color: '#7f1d1d', marginTop: '4px' }}>
            <strong>Escalation Reason:</strong> "{escalationReason}"
          </div>
          <div style={{ fontSize: '11px', color: '#991b1b', marginTop: '4px' }}>
            Dispatched on {escalatedAt || 'Today'} to Central Administration for emergency resource authorization.
          </div>
        </div>
      )}

      {adminAcknowledged && (
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderLeft: '4px solid var(--color-success, #10b981)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: '700', fontSize: '14px' }}>
            <CheckCircle2 size={18} />
            <span>Central Administration Acknowledged & Approved</span>
          </div>
          <div style={{ fontSize: '13px', color: '#15803d', marginTop: '4px' }}>
            <strong>Admin Action:</strong> {adminNotes || 'Emergency contractor and procurement authorization granted.'}
          </div>
        </div>
      )}
    </>
  );
}

export default EscalationAlertBanner;
