import React from 'react';
import StatusBadge from '../StatusBadge';
import Button from '../Button';
import { X, AlertTriangle, Check } from 'lucide-react';
import '../components.css';

/**
 * AdminTicketModal Component
 * Full ticket dossier modal for central administration inspection,
 * including justification notes and procurement authorization action.
 *
 * @param {Object} props
 * @param {Object|null} props.ticket - The complaint ticket to inspect
 * @param {Function} props.onClose - Modal close handler
 * @param {Function} props.onAcknowledgeEscalation - Handler to authorize & acknowledge
 */
function AdminTicketModal({
  ticket,
  onClose,
  onAcknowledgeEscalation,
}) {
  if (!ticket) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '620px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: '800', color: 'var(--color-primary)', fontSize: '16px' }}>
              {ticket.id}
            </span>
            <StatusBadge value={ticket.priority} type="priority" />
            <StatusBadge value={ticket.status} type="status" />
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-main)', margin: '0 0 8px 0' }}>
          {ticket.title}
        </h3>

        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
          {ticket.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', padding: '14px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', fontSize: '13px', marginBottom: '16px' }}>
          <div><strong>Department:</strong> {ticket.department}</div>
          <div><strong>Location:</strong> {ticket.location}</div>
          <div><strong>Origin:</strong> {ticket.originDepartment || 'Hostel Dept'}</div>
          <div><strong>Submitter:</strong> {ticket.submittedBy || ticket.studentName}</div>
          <div><strong>Logged At:</strong> {ticket.createdAt}</div>
          <div><strong>Expected SLA:</strong> {ticket.expectedResolution}</div>
          <div><strong>Assigned Worker:</strong> {ticket.assignedWorker || 'None (Unassigned)'}</div>
        </div>

        {ticket.escalatedToAdmin && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#fee2e2',
            border: '1px solid #fca5a5',
            borderRadius: 'var(--radius-md)',
            marginBottom: '16px',
            fontSize: '13px',
            color: '#991b1b'
          }}>
            <div style={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} />
              <span>Administrative Escalation Report</span>
            </div>
            <div style={{ marginTop: '4px' }}>
              <strong>Reason:</strong> "{ticket.escalationReason}"
            </div>
            <div style={{ fontSize: '12px', marginTop: '2px', color: '#b91c1c' }}>
              Reported by {ticket.escalatedBy} ({ticket.escalatedFromDept} Head) on {ticket.escalatedAt}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          {ticket.escalatedToAdmin && onAcknowledgeEscalation && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onAcknowledgeEscalation(ticket.id);
                onClose();
              }}
            >
              <Check size={14} />
              <span>Authorize & Acknowledge Escalation</span>
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminTicketModal;
