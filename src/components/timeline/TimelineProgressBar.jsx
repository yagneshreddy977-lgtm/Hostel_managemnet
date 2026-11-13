import React from 'react';
import '../components.css';

/**
 * TimelineProgressBar Component
 * Renders the top summary banner with completion percentage, active milestone status,
 * animated progress bar, and clickable/hoverable mini-step indicators.
 */
function TimelineProgressBar({ stages = [], completedCount = 0, progressPercent = 0, activeStage }) {
  return (
    <div className="timeline-progress-overview">
      <div className="timeline-progress-header">
        <div>
          <span className="timeline-progress-label">Lifecycle Progress</span>
          <div className="timeline-progress-headline">
            {completedCount} of {stages.length} Stages Completed ({progressPercent}%)
          </div>
        </div>
        {activeStage && (
          <div className="timeline-current-status-pill">
            <span className="timeline-status-dot" />
            <span>Current Status: <strong>{activeStage.title}</strong></span>
          </div>
        )}
      </div>

      {/* Animated Gradient Bar */}
      <div className="timeline-progress-bar-track">
        <div 
          className="timeline-progress-bar-fill" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Mini Step Track */}
      <div className="timeline-mini-steps">
        {stages.map((st) => (
          <div 
            key={st.id} 
            className={`timeline-mini-step ${st.state}`}
            title={`Stage ${st.id}: ${st.title} (${st.badge})`}
          >
            <span>{st.state === 'completed' ? '✓' : `S${st.id}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineProgressBar;
