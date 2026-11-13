import React from 'react';
import { Check, Clock, AlertTriangle, AlertCircle, Calendar } from 'lucide-react';
import '../components.css';

/**
 * TimelineStepItem Component
 * Renders a single stage item in the vertical lifecycle timeline with status icon,
 * connector line, status badge, title, description, and timestamp.
 */
function TimelineStepItem({ stage, isLast = false }) {
  const { id, title, state, badge, time, desc } = stage;

  const isCompleted = state === 'completed';
  const isActive = state === 'active';
  const isEscalated = state === 'escalated';
  const isOverdue = state === 'overdue';

  return (
    <div className={`timeline-step ${state}`}>
      {/* Icon Circle & Vertical Connector */}
      <div className="timeline-track-col">
        <div className="timeline-icon-wrapper">
          {isCompleted ? (
            <Check size={18} strokeWidth={3} />
          ) : isEscalated ? (
            <AlertTriangle size={18} />
          ) : isOverdue ? (
            <AlertCircle size={18} />
          ) : isActive ? (
            <Clock size={18} />
          ) : (
            <span style={{ fontSize: '13px' }}>{id}</span>
          )}
        </div>
        {!isLast && <div className="timeline-connector-line" />}
      </div>

      {/* Content Card */}
      <div className="timeline-content">
        <div className="timeline-header">
          <h4 className="timeline-title">
            Stage {id}: {title}
          </h4>
          <span className={`timeline-badge ${state}`}>
            {badge}
          </span>
        </div>
        <p className="timeline-desc">
          {desc}
        </p>
        <div className="timeline-footer">
          <span className="timeline-time">
            <Calendar size={13} />
            <span>{time}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TimelineStepItem;
