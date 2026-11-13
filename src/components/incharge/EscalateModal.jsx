import React from 'react';
import { Send } from 'lucide-react';
import Button from '../Button';
import '../components.css';

/**
 * EscalateModal Component
 * Modal for reporting/escalating a department complaint to Central Administration.
 *
 * @param {Object} props
 * @param {Object} props.complaint - The complaint object being escalated
 * @param {string} props.urgency - Selected urgency level
 * @param {Function} props.onUrgencyChange - Handler for urgency change
 * @param {string} props.reason - Justification text
 * @param {Function} props.onReasonChange - Handler for justification reason change
 * @param {Function} props.onSubmit - Form submit handler
 * @param {Function} props.onClose - Modal close handler
 */
function EscalateModal({
  complaint,
  urgency,
  onUrgencyChange,
  reason,
  onReasonChange,
  onSubmit,
  onClose
}) {
  if (!complaint) return null;

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
      zIndex: 100,
      padding: '20px',
    }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', padding: '24px', maxWidth: '580px', width: '100%', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-danger)' }}>
            <Send size={20} />
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>
              Report Issue to Central Administration
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
          Escalating ticket <strong>#{complaint.id}</strong> ("{complaint.title}") to Campus Director. This triggers an official administrative notice.
        </p>

        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>
              Select Urgency Level:
            </label>
            <select
              className="form-select"
              value={urgency}
              onChange={(e) => onUrgencyChange(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="High Priority">High Priority (Urgent Attention)</option>
              <option value="Critical Emergency / Campus Safety Risk">Critical Emergency / Campus Safety Risk</option>
              <option value="Severe Workforce Shortage / Overtime Request">Severe Workforce Shortage / Overtime Request</option>
              <option value="External Contractor & Budget Authorization Required">External Contractor & Budget Authorization Required</option>
            </select>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>
              Justification & Report Note for Administration:
            </label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="Explain why this complaint cannot be handled through standard shift resources (e.g. specialized replacement components needed, severe hazard requiring executive sign-off, or staffing exhaustion)..."
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              required
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button
              variant="secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="submit"
            >
              <Send size={14} />
              <span>Dispatch Escalation Report</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EscalateModal;
