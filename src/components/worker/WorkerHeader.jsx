import React from 'react';
import '../components.css';

/**
 * WorkerHeader Component
 * Banner displaying the worker's operational hub identity, department, shift, and on-duty status.
 *
 * @param {Object} props
 * @param {Object} props.worker - The logged-in worker details
 */
function WorkerHeader({ worker }) {
  if (!worker) return null;

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-text-main)', margin: 0 }}>
              Campus Worker Operations Hub
            </h1>
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              padding: '3px 10px',
              borderRadius: '999px',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
            }}>
              {worker.department} Maintenance
            </span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginTop: '6px' }}>
            Logged in as <strong>{worker.name}</strong> ({worker.skill}) • Shift: <strong>{worker.shift || '09:00 AM - 05:00 PM'}</strong>
          </p>
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          backgroundColor: 'var(--color-success-light)',
          color: 'var(--color-success)',
          borderRadius: '999px',
          fontSize: '13px',
          fontWeight: '600',
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }}></span>
          <span>Status: {worker.status || 'On Duty'}</span>
        </div>
      </div>
    </div>
  );
}

export default WorkerHeader;
