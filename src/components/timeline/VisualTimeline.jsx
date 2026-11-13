import React from 'react';
import Card from '../Card';
import TimelineProgressBar from './TimelineProgressBar';
import TimelineStepItem from './TimelineStepItem';
import '../components.css';

/**
 * VisualTimeline Component
 * Encapsulates the complete 6-stage lifecycle tracking interface:
 * Progress bar, status pill, and sequenced vertical milestone steps.
 */
function VisualTimeline({ stages = [], completedCount = 0, progressPercent = 0, activeStage }) {
  return (
    <Card 
      title="Complaint Status" 
      subtitle="Follow each step from submission through resolution and feedback." 
      style={{ marginBottom: '24px' }}
    >
      {/* Progress Overview Header */}
      <TimelineProgressBar
        stages={stages}
        completedCount={completedCount}
        progressPercent={progressPercent}
        activeStage={activeStage}
      />

      {/* Sequenced Vertical Steps */}
      <div className="timeline-container">
        {stages.map((stage, index) => (
          <TimelineStepItem
            key={stage.id}
            stage={stage}
            isLast={index === stages.length - 1}
          />
        ))}
      </div>
    </Card>
  );
}

export default VisualTimeline;
