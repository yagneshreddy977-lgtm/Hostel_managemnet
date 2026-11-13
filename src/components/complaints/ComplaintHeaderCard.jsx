import React from 'react';
import Card from '../Card';
import StatusBadge from '../StatusBadge';
import { MapPin, Building, Calendar, User } from 'lucide-react';
import '../components.css';

/**
 * ComplaintHeaderCard Component
 * Displays the primary complaint details, category badges, description, and assigned worker bar.
 */
function ComplaintHeaderCard({ complaint }) {
  if (!complaint) return null;

  const {
    title,
    location,
    department,
    createdAt,
    priority,
    status,
    description,
    assignedWorker,
    expectedResolution,
  } = complaint;

  return (
    <Card style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text-main)', margin: 0 }}>
              {title}
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} /> {location}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Building size={14} /> {department} Department
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} /> Reported: {createdAt}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <StatusBadge status={priority} type="priority" />
          <StatusBadge status={status} type="status" />
        </div>
      </div>

      <div style={{ 
        marginTop: '16px', 
        paddingTop: '16px', 
        borderTop: '1px solid var(--color-border)',
        fontSize: '14px',
        color: 'var(--color-text-main)',
        lineHeight: '1.6'
      }}>
        <div style={{ fontWeight: '600', marginBottom: '4px', color: 'var(--color-text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>
          Description of Issue
        </div>
        {description}
      </div>

      {assignedWorker && (
        <div style={{ 
          marginTop: '16px', 
          padding: '12px 16px', 
          backgroundColor: 'var(--color-bg-subtle)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '13px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={16} color="var(--color-primary)" />
            <span>Assigned Technician: <strong>{assignedWorker}</strong></span>
          </div>
          <span style={{ color: 'var(--color-text-muted)' }}>
            Target SLA: <strong>{expectedResolution}</strong>
          </span>
        </div>
      )}
    </Card>
  );
}

export default ComplaintHeaderCard;
