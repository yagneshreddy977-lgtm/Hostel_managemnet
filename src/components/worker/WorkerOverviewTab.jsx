import React from 'react';
import Card from '../Card';
import Button from '../Button';
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  Hourglass, 
  Flame, 
  ChevronRight 
} from 'lucide-react';
import '../components.css';

/**
 * WorkerOverviewTab Component
 * Tab View 1: Metric cards for worker tasks, critical urgency alert banner,
 * and quick navigation cards to tasks and workload logs.
 *
 * @param {Object} props
 * @param {number} props.totalAssigned - Total assigned task count
 * @param {number} props.inProgressCount - Count of tasks in progress
 * @param {number} props.resolvedCount - Total resolved task count
 * @param {number} props.todayCompletedCount - Count of tasks resolved today
 * @param {number} props.availableHours - Free hours remaining in shift
 * @param {number} props.totalHours - Total shift hours
 * @param {number} props.criticalActiveCount - Active critical tasks requiring attention
 * @param {number} props.criticalCount - All critical tasks count
 * @param {number} props.highCount - High priority count
 * @param {number} props.moderateCount - Moderate priority count
 * @param {number} props.lowCount - Low priority count
 * @param {number} props.activeCount - Total active tasks
 * @param {number} props.yesterdayCompletedCount - Count completed yesterday
 * @param {number} props.earlierCompletedCount - Count completed on earlier dates
 * @param {Function} props.onNavigateTab - Tab change handler
 * @param {Function} props.onSetPriorityFilter - Sets priority filter in tasks tab
 */
function WorkerOverviewTab({
  totalAssigned,
  inProgressCount,
  resolvedCount,
  todayCompletedCount,
  availableHours,
  totalHours,
  criticalActiveCount,
  criticalCount,
  highCount,
  moderateCount,
  lowCount,
  activeCount,
  yesterdayCompletedCount,
  earlierCompletedCount,
  onNavigateTab,
  onSetPriorityFilter,
}) {
  return (
    <div>
      {/* Top Metric Cards Row */}
      <div className="stats-row" style={{ marginTop: '0', marginBottom: '24px' }}>
        <div className="stat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Assigned Tasks</span>
            <Wrench size={18} style={{ color: 'var(--color-primary)' }} />
          </div>
          <span className="stat-value">{totalAssigned}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Total tasks queue</div>
        </div>

        <div className="stat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label" style={{ color: 'var(--color-primary)' }}>In Progress</span>
            <Clock size={18} style={{ color: 'var(--color-primary)' }} />
          </div>
          <span className="stat-value" style={{ color: 'var(--color-primary)' }}>{inProgressCount}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-primary)', marginTop: '2px' }}>Currently working on</div>
        </div>

        <div className="stat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label" style={{ color: 'var(--color-success)' }}>Completed</span>
            <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} />
          </div>
          <span className="stat-value" style={{ color: 'var(--color-success)' }}>{resolvedCount}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-success)', marginTop: '2px' }}>{todayCompletedCount} resolved today</div>
        </div>

        <div className="stat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Available Capacity</span>
            <Hourglass size={18} style={{ color: 'var(--color-warning)' }} />
          </div>
          <span className="stat-value">{availableHours} <span style={{ fontSize: '14px', fontWeight: 'normal', color: 'var(--color-text-muted)' }}>/ {totalHours} hrs</span></span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Shift buffer remaining</div>
        </div>
      </div>

      {/* Critical Priority Alert Banner if any critical tasks active */}
      {criticalActiveCount > 0 && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #f87171',
          borderRadius: 'var(--radius-md)',
          padding: '14px 20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Flame size={20} style={{ color: 'var(--color-danger)' }} />
            <div>
              <strong style={{ color: 'var(--color-danger)' }}>Immediate Action Required:</strong>
              <span style={{ color: '#991b1b', fontSize: '14px', marginLeft: '6px' }}>
                You have {criticalActiveCount} Critical Priority issue(s) waiting for immediate electrical intervention.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onSetPriorityFilter('Critical');
              onNavigateTab('my-tasks');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-danger)',
              color: '#ffffff',
              border: 'none',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            <span>View Critical Tasks</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Quick Nav Cards: My Tasks & Workload History */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <Card 
          title="Assigned Work Orders" 
          subtitle="Filter tasks by Critical, High, Moderate, and Low urgency"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>🚨 Critical Urgency:</span>
              <span style={{ fontWeight: '700', color: 'var(--color-danger)' }}>{criticalCount} issues</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>⚡ High Urgency:</span>
              <span style={{ fontWeight: '700', color: '#ea580c' }}>{highCount} issues</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>⚖️ Moderate Urgency:</span>
              <span style={{ fontWeight: '700', color: '#b45309' }}>{moderateCount} issues</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>🟢 Low Urgency:</span>
              <span style={{ fontWeight: '700', color: 'var(--color-success)' }}>{lowCount} issues</span>
            </div>

            <div style={{ marginTop: '10px' }}>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigateTab('my-tasks')}
              >
                Open My Tasks ({activeCount} Active)
              </Button>
            </div>
          </div>
        </Card>

        <Card 
          title="Daily Workload & Completion Log" 
          subtitle="Review tasks resolved today, yesterday, and earlier"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>📅 Completed Today:</span>
              <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>{todayCompletedCount} tasks</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>📅 Completed Yesterday:</span>
              <span style={{ fontWeight: '700' }}>{yesterdayCompletedCount} tasks</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>📅 Completed Earlier:</span>
              <span style={{ fontWeight: '700' }}>{earlierCompletedCount} tasks</span>
            </div>

            <div style={{ marginTop: '10px' }}>
              <Button
                variant="success"
                size="sm"
                onClick={() => onNavigateTab('workload')}
              >
                View Completed Tasks by Date ({resolvedCount})
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default WorkerOverviewTab;
