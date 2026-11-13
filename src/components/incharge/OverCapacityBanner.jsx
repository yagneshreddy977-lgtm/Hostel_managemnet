import React from 'react';
import { ShieldAlert } from 'lucide-react';
import Button from '../Button';
import '../components.css';

/**
 * OverCapacityBanner Component
 * Displays urgent warning alert when department demand exceeds available staff hours.
 *
 * @param {Object} props
 * @param {Object} props.capacityData - Department capacity metrics
 * @param {Function} props.onViewEscalations - Action when clicking View Escalations
 */
function OverCapacityBanner({ capacityData, onViewEscalations }) {
  if (!capacityData?.isOverCapacity) return null;

  return (
    <div className="overcapacity-banner" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 18px',
      backgroundColor: 'var(--color-danger-light)',
      border: '1px solid var(--color-danger-border)',
      borderRadius: 'var(--radius-md)',
      marginBottom: '20px',
      color: 'var(--color-danger-hover)',
    }}>
      <ShieldAlert size={22} style={{ flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '700', fontSize: '14px' }}>
          ⚠ Department Over Capacity — Immediate Staffing Shortage Alert!
        </div>
        <div style={{ fontSize: '13px', marginTop: '2px' }}>
          Current workload demand ({capacityData.requiredWorkHours} hrs) exceeds available shift capacity ({capacityData.availableWorkerHours} hrs) at <strong>{capacityData.capacityUtilization}%</strong> load. Reassignment or escalation to Administration is recommended.
        </div>
      </div>
      <Button
        variant="danger"
        size="sm"
        onClick={onViewEscalations}
      >
        View Escalations
      </Button>
    </div>
  );
}

export default OverCapacityBanner;
