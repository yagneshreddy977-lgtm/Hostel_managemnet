import React from 'react';
import { Zap } from 'lucide-react';
import Button from '../Button';
import '../components.css';

/**
 * AssignWorkerModal Component
 * Modal for assigning or reassigning a complaint to the best-ranked worker
 * using algorithmic weighted capacity scoring.
 *
 * @param {Object} props
 * @param {Object} props.complaint - The complaint object being assigned
 * @param {Object} props.assignmentSuggestions - Result from assignBestWorker() with ranked candidates
 * @param {Function} props.onAssign - Callback receiving (complaintId, workerName)
 * @param {Function} props.onClose - Callback to dismiss modal
 */
function AssignWorkerModal({ complaint, assignmentSuggestions, onAssign, onClose }) {
  if (!complaint || !assignmentSuggestions) return null;

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
      <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', padding: '24px', maxWidth: '620px', width: '100%', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={20} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>
              Smart Workload-Based Assignment
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
          Assigning ticket <strong>#{complaint.id}</strong> ("{complaint.title}"). Candidates are ranked by our weighted scoring algorithm (Available Hours: 40pts, Workload Balancing: 30pts, Trade Match: 20pts, Rating: 10pts):
        </p>

        {/* Candidate List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', maxHeight: '350px', overflowY: 'auto' }}>
          {assignmentSuggestions.rankedCandidates.map((candidate, idx) => {
            const isBest = idx === 0;
            return (
              <div
                key={candidate.workerId}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: isBest ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: isBest ? '#f0f7ff' : '#ffffff',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '700', fontSize: '14px' }}>{candidate.workerName}</span>
                    {isBest && (
                      <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: 'var(--color-primary)', color: '#ffffff', padding: '1px 6px', borderRadius: '999px' }}>
                        Recommended
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {candidate.worker.skill} • Available: {candidate.worker.availableHours}h / 8h • Load: {candidate.workloadPercentage}%
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-primary)' }}>
                      {candidate.totalScore} <span style={{ fontSize: '11px', fontWeight: 'normal' }}>pts</span>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-light)' }}>Score</div>
                  </div>

                  <Button
                    variant={isBest ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => {
                      onAssign(complaint.id, candidate.workerName);
                      onClose();
                    }}
                  >
                    Assign
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'right' }}>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AssignWorkerModal;
