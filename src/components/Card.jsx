import React from 'react';
import './components.css';

/**
 * Card Component
 * A clean, rounded white container used for dashboard panels, summaries, and forms.
 * 
 * Props:
 * - title: Card header title
 * - subtitle: Small descriptive text beneath title
 * - action: Component to display on the top right (e.g., a button or badge)
 * - children: Body content
 * - footer: Optional footer content
 * - className: Additional CSS classes
 */
function Card({
  title,
  subtitle,
  action,
  children,
  footer,
  className = '',
}) {
  const showHeader = title || action;

  return (
    <div className={`card ${className}`.trim()}>
      {showHeader && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {action && <div className="card-action">{action}</div>}
        </div>
      )}

      <div className="card-body">
        {children}
      </div>

      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;
