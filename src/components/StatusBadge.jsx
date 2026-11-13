import React from 'react';
import './components.css';

/**
 * StatusBadge Component (Redesigned for Library Dashboard aesthetic)
 * Displays a color-coded status or priority badge with subtle border, pastel background,
 * and a rounded dot indicator.
 * 
 * Props:
 * - value: string (e.g. 'Pending', 'In Progress', 'Resolved', 'Overdue', 'Low', 'Medium', 'High', 'Critical')
 * - status: alias for value
 * - type: 'status' | 'priority' (default: 'status')
 */
function StatusBadge({ value, status, type = 'status' }) {
  const badgeValue = value || status || 'Pending';
  // Convert value to lowercase kebab-case (e.g., "In Progress" -> "in-progress")
  const formattedClass = badgeValue.toLowerCase().replace(/\s+/g, '-');

  // Choose the badge class based on whether it is a status or a priority
  const badgeClass = type === 'priority' 
    ? `badge badge-priority-${formattedClass}` 
    : `badge badge-${formattedClass}`;

  return (
    <span className={badgeClass}>
      <span className="badge-dot" aria-hidden="true"></span>
      <span>{badgeValue}</span>
    </span>
  );
}

export default StatusBadge;
