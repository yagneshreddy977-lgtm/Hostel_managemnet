import React from 'react';
import StatusBadge from './StatusBadge';
import Button from './Button';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Building, 
  Tag, 
  ChevronRight 
} from 'lucide-react';
import './components.css';

/**
 * ComplaintCard Component
 * Displays a single complaint in a clear, modern card format for the Student/Staff view.
 * 
 * Props:
 * - complaint: The complaint object containing:
 *   { id, title, category, location, department, priority, status, createdAt, expectedResolution }
 * - onTrack: Function called when the user clicks "Track Status"
 */
function ComplaintCard({ complaint, onTrack }) {
  const {
    id,
    title,
    category,
    location,
    department,
    priority,
    status,
    createdAt,
    expectedResolution,
  } = complaint;

  const stageSummary = status === 'Resolved'
    ? 'Stage 5/6: Resolved'
    : status === 'Overdue'
      ? 'Stage 4/6: Past target'
      : status === 'Escalated to Admin'
        ? 'Stage 3/6: Escalated'
        : status === 'In Progress'
          ? 'Stage 4/6: Work in progress'
          : complaint.assignedWorker
            ? 'Stage 3/6: Technician assigned'
            : 'Stage 3/6: Waiting for assignment';

  return (
    <div className="card" style={{ marginBottom: '16px', transition: 'transform 0.15s ease, box-shadow 0.15s ease' }}>
      {/* Card Header: ID & Badges */}
      <div className="card-header" style={{ padding: '14px 20px', backgroundColor: '#fcfdfe' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontWeight: '700', color: 'var(--color-primary)', fontSize: '14px' }}>
            {id}
          </span>
          <span style={{ color: 'var(--color-border)' }}>|</span>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Tag size={13} /> {category}
          </span>
        </div>

        {/* Status & Priority Badges */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <StatusBadge value={priority} type="priority" />
          <StatusBadge value={status} type="status" />
        </div>
      </div>

      {/* Card Body: Title, Location, Department */}
      <div className="card-body" style={{ padding: '18px 20px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-text-main)' }}>
          {title}
        </h4>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '14px', fontSize: '13px' }}>
          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
            <MapPin size={15} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <span><strong>Location:</strong> {location}</span>
          </div>

          {/* Department */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
            <Building size={15} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <span><strong>Department:</strong> {department}</span>
          </div>

          {/* Created Date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
            <Calendar size={15} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
            <span><strong>Created:</strong> {createdAt}</span>
          </div>

          {/* Expected Resolution */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
            <Clock size={15} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />
            <span><strong>Expected:</strong> {expectedResolution}</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Action Button & Stage Summary */}
      <div className="card-footer" style={{ 
        padding: '12px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#ffffff',
        borderTop: '1px solid #f1f5f9',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: status === 'Resolved' ? 'var(--color-success)' : (status === 'In Progress' ? 'var(--color-primary)' : (status === 'Escalated to Admin' ? 'var(--color-danger)' : 'var(--color-warning)')),
          }} />
          <span style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>
            {stageSummary}
          </span>
        </div>

        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => onTrack && onTrack(complaint)}
        >
          <span>Track Status</span>
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}

export default ComplaintCard;
