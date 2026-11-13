import React from 'react';
import Card from '../Card';
import '../components.css';

/**
 * WorkerScheduleTab Component
 * Tab View 4: Shift Information, Coverage Zones, and Supervisor Contacts.
 *
 * @param {Object} props
 * @param {Object} props.worker - Worker details
 */
function WorkerScheduleTab({ worker }) {
  if (!worker) return null;

  return (
    <div>
      <Card title="Today's Working Schedule & Duty Roster" subtitle="Assigned shift, coverage zones, and emergency dispatch protocol">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', fontSize: '14px' }}>
          <div style={{ padding: '16px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: 'var(--color-text-main)' }}>Shift Information</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>Shift Hours:</strong> {worker.shift || '09:00 AM - 05:00 PM'}</div>
              <div><strong>Department:</strong> {worker.department} Maintenance</div>
              <div><strong>Designation:</strong> {worker.skill}</div>
              <div><strong>Base Station:</strong> Central Engineering Workshop Room 102</div>
            </div>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: 'var(--color-text-main)' }}>Primary Coverage Zones</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>• Hostel Block B (Floors 1, 2, 3 & Mess)</div>
              <div>• Computer Engineering Dept Labs & Server Substation</div>
              <div>• Main Auditorium Stage Lighting & Panels</div>
              <div>• West Campus Bicycle Shed & Pathway Lights</div>
            </div>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', color: 'var(--color-text-main)' }}>Supervisor & Escalation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>Duty In-Charge:</strong> Prof. H. R. Mehta (Ext: 4401)</div>
              <div><strong>Emergency Helpline:</strong> +91 98765-00100 (Campus Security)</div>
              <div><strong>Radio Call Sign:</strong> Electric-Lead-1</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default WorkerScheduleTab;
