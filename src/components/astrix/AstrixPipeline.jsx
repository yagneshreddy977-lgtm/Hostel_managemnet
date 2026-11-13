import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  RotateCcw,
  Zap, 
  UserCheck, 
  Wrench, 
  CheckCircle2, 
  Inbox, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { FullscreenIcon, PipelineIcon } from './AstrixIcons';

/**
 * Astrix Live Visual Pipeline Component
 * Interactive flowchart canvas with zoom controls, animated telemetry beacon,
 * and live stage throughput nodes for Hostel maintenance operations.
 */
export default function AstrixPipeline({
  complaints = [],
  workers = [],
  onStageSelect,
  selectedStage,
}) {
  const [zoom, setZoom] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  // Compute live stage throughput counts from real complaints data
  const total = complaints.length;
  const pendingIntake = complaints.filter(c => c.status === 'Pending' && !c.assignedWorker).length;
  const triagedCount = complaints.filter(c => c.status === 'Pending').length;
  const dispatchActive = complaints.filter(c => c.status === 'In Progress').length;
  const onSiteWorking = complaints.filter(c => c.status === 'In Progress' && Boolean(c.assignedWorker)).length;
  const resolvedSignOff = complaints.filter(c => c.status === 'Resolved').length;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.15, 1.45));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.75));
  const handleResetZoom = () => setZoom(1);

  const stages = [
    {
      id: 'intake',
      step: '01',
      title: 'Resident Intake',
      desc: 'Mobile & Web ticket submission, room auto-tagged',
      count: pendingIntake,
      sla: '< 2m latency',
      status: 'Active',
      statusType: 'success',
      icon: Inbox,
    },
    {
      id: 'triage',
      step: '02',
      title: 'Priority & Triage',
      desc: 'SLA deadline tagged, Critical / High categorized',
      count: triagedCount,
      sla: 'SLA < 1h',
      status: 'Real-Time',
      statusType: 'info',
      icon: Zap,
    },
    {
      id: 'dispatch',
      step: '03',
      title: 'Smart Dispatch',
      desc: 'Skill & shift capacity algorithmic worker assignment',
      count: dispatchActive,
      sla: 'Auto-Routing',
      status: 'Optimal',
      statusType: 'success',
      icon: UserCheck,
    },
    {
      id: 'resolution',
      step: '04',
      title: 'On-Site Fix',
      desc: 'Technician on duty, parts repair & execution',
      count: onSiteWorking,
      sla: 'Avg 45m',
      status: 'In Flight',
      statusType: 'warning',
      icon: Wrench,
    },
    {
      id: 'signoff',
      step: '05',
      title: 'SLA Sign-Off',
      desc: 'Resident OTP confirmation & star feedback review',
      count: resolvedSignOff,
      sla: '100% Verified',
      status: 'Completed',
      statusType: 'success',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="astrix-pipeline-section">
      {/* Pipeline Section Header */}
      <div className="astrix-pipeline-header">
        <div className="astrix-pipeline-header-title">
          <PipelineIcon style={{ color: 'var(--astrix-primary)' }} />
          <h2>Live Campus Operations & Resolution Pipeline</h2>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--astrix-text-muted)' }}>
          Autonomous routing active across all hostel blocks and trade wings.
        </div>
      </div>

      {/* Pipeline Canvas Box with Dot-Grid Background */}
      <div 
        className={`astrix-pipeline-canvas-box astrix-pipeline-dots ${isExpanded ? 'expanded' : ''}`}
        style={{ height: isExpanded ? '460px' : '360px', transition: 'height 0.3s ease' }}
      >
        {/* Floating Telemetry & Status Badges */}
        <div className="astrix-pipeline-floating-top">
          <div className="astrix-live-beacon">
            <span className="astrix-live-pulse-dot">
              <span className="ping" />
              <span className="dot" />
            </span>
            <span>Live Pipeline Engine</span>
          </div>

          <div className="astrix-pipeline-tag">
            <Sparkles size={13} style={{ marginRight: '6px' }} />
            <span>Campus Standard Ops v2.4</span>
          </div>

          <div 
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--astrix-radius-sm)',
              backgroundColor: 'var(--astrix-surface)',
              border: '1px solid var(--astrix-border)',
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--astrix-text-muted)',
              boxShadow: 'var(--astrix-shadow-sm)',
            }}
          >
            Connected Technicians: <strong style={{ color: 'var(--astrix-text-primary)' }}>{workers.length} On Shift</strong>
          </div>
        </div>

        {/* Floating Zoom & Reset Controls */}
        <div className="astrix-pipeline-zoom">
          <button 
            type="button" 
            onClick={handleZoomIn} 
            title="Zoom in (+)"
            aria-label="Zoom in"
          >
            <Plus size={16} />
          </button>
          <button 
            type="button" 
            onClick={handleZoomOut} 
            title="Zoom out (-)"
            aria-label="Zoom out"
          >
            <Minus size={16} />
          </button>
          <button 
            type="button" 
            onClick={handleResetZoom} 
            title="Reset Zoom (100%)"
            aria-label="Reset zoom"
            style={{ borderTop: '1px solid var(--astrix-border)' }}
          >
            <RotateCcw size={13} />
          </button>
        </div>

        {/* Fullscreen / Expand Toggle */}
        <div className="astrix-pipeline-preview-btn">
          <button
            type="button"
            className="astrix-btn astrix-btn-secondary"
            onClick={() => setIsExpanded(prev => !prev)}
            style={{ height: '36px', fontSize: '12px' }}
          >
            <span>{isExpanded ? 'Collapse' : 'Full Canvas'}</span>
            <FullscreenIcon className="size-4" />
          </button>
        </div>

        {/* Pipeline Nodes Flow (Scaled via Zoom) */}
        <div 
          className="astrix-pipeline-flow"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
          }}
        >
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === stage.id;

            return (
              <React.Fragment key={stage.id}>
                {/* Node Card */}
                <div 
                  className={`astrix-node-card ${isSelected ? 'active-node' : ''}`}
                  onClick={() => onStageSelect && onStageSelect(isSelected ? null : stage.id)}
                  style={{ cursor: 'pointer' }}
                  title={`Filter stream by ${stage.title}`}
                >
                  <div className="astrix-node-header">
                    <span 
                      className="astrix-node-badge" 
                      style={{ 
                        backgroundColor: stage.statusType === 'success' 
                          ? 'var(--astrix-success-light)' 
                          : stage.statusType === 'warning' 
                          ? 'var(--astrix-warning-light)' 
                          : 'var(--astrix-info-light)',
                        color: stage.statusType === 'success' 
                          ? 'var(--astrix-success)' 
                          : stage.statusType === 'warning' 
                          ? 'var(--astrix-warning)' 
                          : 'var(--astrix-info)',
                      }}
                    >
                      {stage.status}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--astrix-text-subtle)' }}>
                      {stage.step}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="astrix-node-icon">
                      <Icon size={16} />
                    </div>
                    <div className="astrix-node-title">{stage.title}</div>
                  </div>

                  <div className="astrix-node-desc">
                    {stage.desc}
                  </div>

                  <div className="astrix-node-metrics">
                    <span className="astrix-node-count">
                      {stage.count} <span style={{ fontWeight: '400', color: 'var(--astrix-text-muted)' }}>tickets</span>
                    </span>
                    <span className="astrix-node-sla">
                      {stage.sla}
                    </span>
                  </div>
                </div>

                {/* Connecting arrow/cable (except after the last node) */}
                {idx < stages.length - 1 && (
                  <div className="astrix-connector" aria-hidden="true">
                    <div className="astrix-connector-line">
                      <div className="astrix-connector-arrow" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
