import React from 'react';
import { FileCheck2, Check } from 'lucide-react';
import Button from '../Button';
import '../components.css';

/**
 * WorkerResolveModal Component
 * Modal for entering technical completion details and verifying resolution of a task.
 *
 * @param {Object} props
 * @param {string|null} props.taskId - ID of the task being resolved
 * @param {string} props.note - Text note of action taken
 * @param {Function} props.onNoteChange - Note text change handler
 * @param {Function} props.onSubmit - Form submission callback
 * @param {Function} props.onClose - Modal close callback
 */
function WorkerResolveModal({
  taskId,
  note,
  onNoteChange,
  onSubmit,
  onClose,
}) {
  if (!taskId) return null;

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
      <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', padding: '24px', maxWidth: '520px', width: '100%', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <FileCheck2 size={22} style={{ color: 'var(--color-success)' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>
            Complete Repair & Record Resolution
          </h3>
        </div>
        
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
          Document the technical action taken to resolve Ticket <strong>#{taskId}</strong>. This record will automatically be filed under <strong>Today's Workload</strong> history.
        </p>

        <form onSubmit={onSubmit}>
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label" htmlFor="resolution-note">
              Action Taken / Notes: <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <textarea
              id="resolution-note"
              className="form-textarea"
              placeholder="e.g. Replaced burnt MCB switch, stripped wire leads, tightened terminal block, and verified voltage with multimeter."
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              rows={4}
              required
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
              variant="success"
              type="submit"
              icon={Check}
            >
              Confirm Resolution
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WorkerResolveModal;
