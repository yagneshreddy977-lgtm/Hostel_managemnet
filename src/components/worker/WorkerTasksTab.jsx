import React from 'react';
import StatusBadge from '../StatusBadge';
import Button from '../Button';
import { 
  Filter, 
  Calendar, 
  Layers, 
  Flame, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  User, 
  Clock, 
  CheckCheck, 
  Play, 
  Check 
} from 'lucide-react';
import '../components.css';

/**
 * WorkerTasksTab Component
 * Tab View 2: "My Tasks" with Priority Selector (Critical, High, Moderate, Low),
 * status filter toggles (active/all/resolved), date picker, and interactive task cards.
 *
 * @param {Object} props
 * @param {Array} props.displayedTasks - Filtered list of tasks to display
 * @param {string} props.priorityFilter - 'all' | 'Critical' | 'High' | 'Medium' | 'Low'
 * @param {Function} props.onSetPriorityFilter - Handler for priority filter
 * @param {string} props.statusFilter - 'active' | 'all' | 'Resolved'
 * @param {Function} props.onSetStatusFilter - Handler for status filter
 * @param {string} props.taskDateFilter - Date string filter
 * @param {Function} props.onSetTaskDateFilter - Handler for date filter
 * @param {number} props.totalAssigned - Count of all tasks
 * @param {number} props.activeCount - Count of active tasks
 * @param {number} props.resolvedCount - Count of resolved tasks
 * @param {number} props.criticalCount - Critical tasks count
 * @param {number} props.highCount - High priority tasks count
 * @param {number} props.moderateCount - Moderate tasks count
 * @param {number} props.lowCount - Low priority tasks count
 * @param {Function} props.onAcceptTask - Handler to accept pending task
 * @param {Function} props.onStartWork - Handler to start work
 * @param {Function} props.onOpenResolveModal - Handler to open resolve modal with taskId
 * @param {Function} props.formatDisplayDate - Date formatting helper
 */
function WorkerTasksTab({
  displayedTasks,
  priorityFilter,
  onSetPriorityFilter,
  statusFilter,
  onSetStatusFilter,
  taskDateFilter,
  onSetTaskDateFilter,
  totalAssigned,
  activeCount,
  resolvedCount,
  criticalCount,
  highCount,
  moderateCount,
  lowCount,
  onAcceptTask,
  onStartWork,
  onOpenResolveModal,
  formatDisplayDate,
}) {
  return (
    <div>
      {/* Priority Quick Filter Controls */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 20px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: 'var(--color-text-main)' }}>
              Filter Tasks by Priority Level:
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            {/* Date filter input for My Tasks */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: taskDateFilter ? 'var(--color-primary-light)' : '#ffffff',
              border: taskDateFilter ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
            }}>
              <Calendar size={14} style={{ color: taskDateFilter ? 'var(--color-primary)' : 'var(--color-text-muted)' }} />
              <label htmlFor="worker-task-date" style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-muted)' }}>
                Date:
              </label>
              <input
                id="worker-task-date"
                type="date"
                value={taskDateFilter}
                onChange={(e) => onSetTaskDateFilter(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--color-text-main)',
                  backgroundColor: 'transparent',
                  cursor: 'pointer'
                }}
              />
              {taskDateFilter && (
                <button
                  type="button"
                  onClick={() => onSetTaskDateFilter('')}
                  style={{
                    border: 'none',
                    backgroundColor: '#e2e8f0',
                    color: 'var(--color-text-muted)',
                    borderRadius: '3px',
                    fontSize: '11px',
                    padding: '1px 5px',
                    cursor: 'pointer'
                  }}
                  title="Clear Date"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Status Toggle (Active vs All vs Resolved) */}
            <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--color-bg-subtle)', padding: '3px', borderRadius: 'var(--radius-sm)' }}>
              <button
                type="button"
                onClick={() => onSetStatusFilter('active')}
                style={{
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: statusFilter === 'active' ? '#ffffff' : 'transparent',
                  color: statusFilter === 'active' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  boxShadow: statusFilter === 'active' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                Active Only ({activeCount})
              </button>
              <button
                type="button"
                onClick={() => onSetStatusFilter('all')}
                style={{
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: statusFilter === 'all' ? '#ffffff' : 'transparent',
                  color: statusFilter === 'all' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  boxShadow: statusFilter === 'all' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                All Tasks ({totalAssigned})
              </button>
              <button
                type="button"
                onClick={() => onSetStatusFilter('Resolved')}
                style={{
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: statusFilter === 'Resolved' ? '#ffffff' : 'transparent',
                  color: statusFilter === 'Resolved' ? 'var(--color-success)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  boxShadow: statusFilter === 'Resolved' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                Resolved ({resolvedCount})
              </button>
            </div>
          </div>
        </div>

        {/* Priority Selector Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {/* All Priorities */}
          <button
            type="button"
            onClick={() => onSetPriorityFilter('all')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: priorityFilter === 'all' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: priorityFilter === 'all' ? 'var(--color-primary-light)' : '#ffffff',
              color: priorityFilter === 'all' ? 'var(--color-primary)' : 'var(--color-text-main)',
              fontWeight: priorityFilter === 'all' ? '700' : '500',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Layers size={14} />
            <span>All Priorities</span>
            <span style={{
              padding: '2px 7px',
              borderRadius: '999px',
              fontSize: '11px',
              backgroundColor: priorityFilter === 'all' ? 'var(--color-primary)' : 'var(--color-bg-subtle)',
              color: priorityFilter === 'all' ? '#ffffff' : 'var(--color-text-muted)',
              fontWeight: '700',
            }}>
              {totalAssigned}
            </span>
          </button>

          {/* Critical Issues */}
          <button
            type="button"
            onClick={() => onSetPriorityFilter('Critical')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: priorityFilter === 'Critical' ? '2px solid var(--color-danger)' : '1px solid #fecaca',
              backgroundColor: priorityFilter === 'Critical' ? '#fee2e2' : '#fef2f2',
              color: 'var(--color-danger)',
              fontWeight: priorityFilter === 'Critical' ? '700' : '600',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: priorityFilter === 'Critical' ? '0 0 0 2px rgba(220, 38, 38, 0.2)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <Flame size={14} style={{ color: 'var(--color-danger)' }} />
            <span>Critical Issues</span>
            <span style={{
              padding: '2px 7px',
              borderRadius: '999px',
              fontSize: '11px',
              backgroundColor: 'var(--color-danger)',
              color: '#ffffff',
              fontWeight: '700',
            }}>
              {criticalCount}
            </span>
          </button>

          {/* High Priority */}
          <button
            type="button"
            onClick={() => onSetPriorityFilter('High')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: priorityFilter === 'High' ? '2px solid #ea580c' : '1px solid #fed7aa',
              backgroundColor: priorityFilter === 'High' ? '#ffedd5' : '#fff7ed',
              color: '#ea580c',
              fontWeight: priorityFilter === 'High' ? '700' : '600',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Zap size={14} style={{ color: '#ea580c' }} />
            <span>High Priority</span>
            <span style={{
              padding: '2px 7px',
              borderRadius: '999px',
              fontSize: '11px',
              backgroundColor: '#ea580c',
              color: '#ffffff',
              fontWeight: '700',
            }}>
              {highCount}
            </span>
          </button>

          {/* Moderate (Medium) Issues */}
          <button
            type="button"
            onClick={() => onSetPriorityFilter('Medium')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: priorityFilter === 'Medium' ? '2px solid var(--color-warning)' : '1px solid #fef08a',
              backgroundColor: priorityFilter === 'Medium' ? '#fef9c3' : '#fefce8',
              color: '#b45309',
              fontWeight: priorityFilter === 'Medium' ? '700' : '600',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <AlertTriangle size={14} style={{ color: '#b45309' }} />
            <span>Moderate Issues</span>
            <span style={{
              padding: '2px 7px',
              borderRadius: '999px',
              fontSize: '11px',
              backgroundColor: '#b45309',
              color: '#ffffff',
              fontWeight: '700',
            }}>
              {moderateCount}
            </span>
          </button>

          {/* Low Priority */}
          <button
            type="button"
            onClick={() => onSetPriorityFilter('Low')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: priorityFilter === 'Low' ? '2px solid var(--color-success)' : '1px solid #bbf7d0',
              backgroundColor: priorityFilter === 'Low' ? '#dcfce7' : '#f0fdf4',
              color: 'var(--color-success)',
              fontWeight: priorityFilter === 'Low' ? '700' : '600',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <CheckCircle2 size={14} style={{ color: 'var(--color-success)' }} />
            <span>Low Priority</span>
            <span style={{
              padding: '2px 7px',
              borderRadius: '999px',
              fontSize: '11px',
              backgroundColor: 'var(--color-success)',
              color: '#ffffff',
              fontWeight: '700',
            }}>
              {lowCount}
            </span>
          </button>
        </div>

        {/* Active Filter Description Banner */}
        <div style={{
          marginTop: '14px',
          padding: '8px 12px',
          backgroundColor: priorityFilter === 'Critical' ? '#fee2e2' : 'var(--color-bg-subtle)',
          borderLeft: priorityFilter === 'Critical' ? '4px solid var(--color-danger)' : '3px solid var(--color-primary)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '12px',
          color: priorityFilter === 'Critical' ? 'var(--color-danger)' : 'var(--color-text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span>
            {priorityFilter === 'all' && `Showing ${displayedTasks.length} task(s) matching ${statusFilter === 'active' ? 'active' : statusFilter} status.`}
            {priorityFilter === 'Critical' && `🚨 Filter Active: Showing ${displayedTasks.length} Critical Issue(s). These require immediate on-site response.`}
            {priorityFilter === 'High' && `⚡ Filter Active: Showing ${displayedTasks.length} High Priority Issue(s).`}
            {priorityFilter === 'Medium' && `⚖️ Filter Active: Showing ${displayedTasks.length} Moderate / Medium Priority Issue(s).`}
            {priorityFilter === 'Low' && `🟢 Filter Active: Showing ${displayedTasks.length} Low Priority Maintenance Issue(s).`}
            {taskDateFilter && ` • 📅 Date: ${formatDisplayDate(taskDateFilter) || taskDateFilter}`}
          </span>
          {(priorityFilter !== 'all' || statusFilter !== 'active' || Boolean(taskDateFilter)) && (
            <button
              type="button"
              onClick={() => {
                onSetPriorityFilter('all');
                onSetStatusFilter('active');
                onSetTaskDateFilter('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary)',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Task Cards Feed */}
      <div>
        {displayedTasks.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '48px 24px',
            textAlign: 'center',
            color: 'var(--color-text-muted)'
          }}>
            <CheckCircle2 size={40} style={{ color: 'var(--color-success)', marginBottom: '12px' }} />
            <h4 style={{ color: 'var(--color-text-main)', margin: '0 0 6px 0', fontSize: '17px' }}>
              No tasks match this filter!
            </h4>
            <p style={{ fontSize: '13px', margin: 0 }}>
              There are currently no {priorityFilter !== 'all' ? priorityFilter : ''} tasks under "{statusFilter}" status.
            </p>
            <div style={{ marginTop: '16px' }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  onSetPriorityFilter('all');
                  onSetStatusFilter('all');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        ) : (
          displayedTasks.map((task) => {
            const isTaskResolved = task.status === 'Resolved';
            const isTaskInProgress = task.status === 'In Progress';
            const isTaskPending = task.status === 'Pending';
            const isCritical = task.priority === 'Critical';

            return (
              <div 
                key={task.id} 
                className="card" 
                style={{ 
                  marginBottom: '16px', 
                  borderLeft: isCritical ? '5px solid var(--color-danger)' : '1px solid var(--color-border)',
                  boxShadow: isCritical ? '0 2px 8px rgba(220, 38, 38, 0.12)' : 'var(--shadow-sm)',
                }}
              >
                {/* Header: ID, Category, Priority, Status */}
                <div className="card-header" style={{ padding: '12px 20px', backgroundColor: isCritical ? '#fef2f2' : '#fcfdfe' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: '800', color: isCritical ? 'var(--color-danger)' : 'var(--color-primary)' }}>
                      {task.id}
                    </span>
                    <span style={{ color: 'var(--color-border)' }}>|</span>
                    <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{task.category}</span>
                    {isCritical && (
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        backgroundColor: 'var(--color-danger)',
                        color: '#ffffff',
                        padding: '2px 8px',
                        borderRadius: '999px',
                      }}>
                        URGENT HAZARD
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <StatusBadge value={task.priority} type="priority" />
                    <StatusBadge value={task.status} type="status" />
                  </div>
                </div>

                {/* Body */}
                <div className="card-body" style={{ padding: '18px 20px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '8px' }}>
                    {task.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                    {task.description}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
                      <MapPin size={15} style={{ color: 'var(--color-primary)' }} />
                      <span><strong>Location:</strong> {task.location}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
                      <User size={15} style={{ color: 'var(--color-primary)' }} />
                      <span><strong>Reported By:</strong> {task.submittedBy || task.studentName}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
                      <Clock size={15} style={{ color: 'var(--color-warning)' }} />
                      <span><strong>Target SLA:</strong> {task.expectedResolution}</span>
                    </div>
                  </div>

                  {/* If resolved, show resolution note */}
                  {isTaskResolved && (
                    <div style={{
                      marginTop: '14px',
                      padding: '12px 16px',
                      backgroundColor: 'var(--color-success-light)',
                      borderLeft: '4px solid var(--color-success)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px',
                      color: 'var(--color-text-main)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontWeight: '700', marginBottom: '4px' }}>
                        <CheckCheck size={16} />
                        <span>Resolution Verified ({task.resolvedAt || 'Completed'})</span>
                      </div>
                      <div>{task.resolutionNote || 'Maintenance inspection completed and issue repaired.'}</div>
                    </div>
                  )}
                </div>

                {/* Action Footer: Accept -> Start Work -> Resolve */}
                {!isTaskResolved && (
                  <div className="card-footer" style={{ padding: '12px 20px', display: 'flex', justifyContent: 'flex-end', gap: '10px', backgroundColor: '#ffffff', borderTop: '1px solid var(--color-border)' }}>
                    {isTaskPending && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onAcceptTask && onAcceptTask(task.id)}
                      >
                        Accept Task
                      </Button>
                    )}

                    {isTaskPending && (
                      <Button
                        variant="success"
                        size="sm"
                        icon={Play}
                        onClick={() => onStartWork && onStartWork(task.id)}
                      >
                        Start Work Immediately
                      </Button>
                    )}

                    {isTaskInProgress && (
                      <Button
                        variant="success"
                        size="sm"
                        icon={Check}
                        onClick={() => onOpenResolveModal(task.id)}
                      >
                        Mark as Resolved
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default WorkerTasksTab;
