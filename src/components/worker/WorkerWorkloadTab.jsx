import React from 'react';
import StatusBadge from '../StatusBadge';
import { 
  CheckCircle2, 
  CalendarCheck, 
  Clock, 
  Layers, 
  Calendar, 
  MapPin, 
  User, 
  CheckCheck 
} from 'lucide-react';
import '../components.css';

/**
 * WorkerWorkloadTab Component
 * Tab View 3: Workload & Completed Tasks by Date (Today, Yesterday, Earlier),
 * shift capacity utilization gauge, and calendar date filter.
 *
 * @param {Object} props
 * @param {Object} props.worker - Worker details
 * @param {number} props.resolvedCount - Total completed tasks
 * @param {Array} props.todayCompleted - Tasks completed today
 * @param {Array} props.yesterdayCompleted - Tasks completed yesterday
 * @param {Array} props.earlierCompleted - Tasks completed earlier
 * @param {number} props.occupiedHours - Hours committed
 * @param {number} props.availableHours - Hours free
 * @param {number} props.totalHours - Shift duration
 * @param {number} props.workloadPercentage - Capacity %
 * @param {string} props.selectedCalendarDate - Currently selected date YYYY-MM-DD
 * @param {Function} props.onSelectCalendarDate - Handler for date picker
 * @param {string} props.dateFilter - 'all' | 'Today' | 'Yesterday' | 'Earlier' | 'custom'
 * @param {Function} props.onSetDateFilter - Handler for date preset
 * @param {Array} props.uniqueCompletedDates - Array of unique date strings
 * @param {Object} props.availableDatesWithCounts - Map of dates to ticket counts
 * @param {Array} props.completedTasksOnSelectedDate - Filtered list for selected date
 * @param {Array} props.filteredDateGroups - Group names to render
 * @param {Object} props.groupMap - Map of group name to task list
 * @param {Function} props.formatDisplayDate - Date string formatter
 */
function WorkerWorkloadTab({
  worker,
  resolvedCount,
  todayCompleted,
  yesterdayCompleted,
  earlierCompleted,
  occupiedHours,
  availableHours,
  totalHours,
  workloadPercentage,
  selectedCalendarDate,
  onSelectCalendarDate,
  dateFilter,
  onSetDateFilter,
  uniqueCompletedDates,
  availableDatesWithCounts,
  completedTasksOnSelectedDate,
  filteredDateGroups,
  groupMap,
  formatDisplayDate,
}) {
  const renderCompletedTaskCard = (task) => (
    <div
      key={task.id}
      className="card"
      style={{
        borderLeft: '5px solid var(--color-success)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Header */}
      <div className="card-header" style={{ padding: '12px 20px', backgroundColor: '#fcfdfe' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontWeight: '800', color: 'var(--color-primary)' }}>{task.id}</span>
          <span style={{ color: 'var(--color-border)' }}>|</span>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{task.category}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <StatusBadge value={task.priority} type="priority" />
          <StatusBadge value="Resolved" type="status" />
        </div>
      </div>

      {/* Body with Proper Details */}
      <div className="card-body" style={{ padding: '18px 20px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '8px' }}>
          {task.title}
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
          {task.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '13px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
            <MapPin size={15} style={{ color: 'var(--color-primary)' }} />
            <span><strong>Location:</strong> {task.location}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
            <User size={15} style={{ color: 'var(--color-primary)' }} />
            <span><strong>Reported By:</strong> {task.submittedBy || task.studentName}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
            <Clock size={15} style={{ color: 'var(--color-success)' }} />
            <span><strong>Completed Time:</strong> {task.resolvedAt || 'Same Day'}</span>
          </div>
        </div>

        {/* Official Resolution Action Box */}
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontWeight: '700', marginBottom: '4px' }}>
            <CheckCheck size={16} />
            <span>Action Taken & Verification Note:</span>
          </div>
          <div style={{ color: 'var(--color-text-main)', lineHeight: '1.5' }}>
            {task.resolutionNote || 'Technician completed repairs, verified electrical supply, and restored normal operation.'}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Top KPI Metrics Row for Completed Work */}
      <div className="stats-row" style={{ marginTop: '0', marginBottom: '24px' }}>
        <div className="stat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Total Completed</span>
            <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} />
          </div>
          <span className="stat-value" style={{ color: 'var(--color-success)' }}>{resolvedCount}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>All-time closed tickets</div>
        </div>

        <div className="stat-box" style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label" style={{ color: 'var(--color-primary)' }}>Completed Today</span>
            <CalendarCheck size={18} style={{ color: 'var(--color-primary)' }} />
          </div>
          <span className="stat-value" style={{ color: 'var(--color-primary)' }}>{todayCompleted.length}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Today's verified fixes</div>
        </div>

        <div className="stat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Yesterday</span>
            <Clock size={18} style={{ color: 'var(--color-text-muted)' }} />
          </div>
          <span className="stat-value">{yesterdayCompleted.length}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Previous shift output</div>
        </div>

        <div className="stat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Earlier Dates</span>
            <Layers size={18} style={{ color: 'var(--color-text-muted)' }} />
          </div>
          <span className="stat-value">{earlierCompleted.length}</span>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Historical archive</div>
        </div>
      </div>

      {/* Shift Capacity Progress Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-main)', margin: 0 }}>
              Active Shift Capacity Utilization
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
              {worker.name} • {occupiedHours} hrs committed / {availableHours} hrs free ({totalHours} hrs shift)
            </p>
          </div>

          <span style={{
            fontSize: '13px',
            fontWeight: '700',
            padding: '3px 10px',
            borderRadius: '999px',
            backgroundColor: workloadPercentage > 80 ? '#fee2e2' : 'var(--color-success-light)',
            color: workloadPercentage > 80 ? 'var(--color-danger)' : 'var(--color-success)',
          }}>
            {workloadPercentage}% Committed
          </span>
        </div>

        <div style={{ height: '10px', width: '100%', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${workloadPercentage}%`,
              backgroundColor: workloadPercentage > 80 ? 'var(--color-danger)' : workloadPercentage > 50 ? 'var(--color-primary)' : 'var(--color-success)',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Interactive Date Selection Toolbar */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 20px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '22px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-main)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={18} style={{ color: 'var(--color-primary)' }} />
              Filter Completed Tasks by Date:
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>
              Select any date from the calendar picker or click a quick date preset to review resolved tickets.
            </p>
          </div>

          {/* HTML5 Calendar Date Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label htmlFor="worker-workload-calendar-date" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-main)' }}>
              Pick Date:
            </label>
            <input
              id="worker-workload-calendar-date"
              type="date"
              value={selectedCalendarDate}
              onChange={(e) => {
                onSelectCalendarDate(e.target.value);
                if (e.target.value) {
                  onSetDateFilter('custom');
                } else {
                  onSetDateFilter('all');
                }
              }}
              style={{
                padding: '7px 12px',
                border: selectedCalendarDate ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--color-text-main)',
                backgroundColor: selectedCalendarDate ? 'var(--color-primary-light)' : '#ffffff',
                cursor: 'pointer',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
              }}
            />
            {selectedCalendarDate && (
              <button
                type="button"
                onClick={() => {
                  onSelectCalendarDate('');
                  onSetDateFilter('all');
                }}
                style={{
                  padding: '7px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#f1f5f9',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                }}
              >
                Clear Date
              </button>
            )}
          </div>
        </div>

        {/* Quick Date Presets Row */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--color-border)' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-muted)', alignSelf: 'center', marginRight: '4px' }}>
            Quick Presets:
          </span>

          {/* All Dates Button */}
          <button
            type="button"
            onClick={() => {
              onSelectCalendarDate('');
              onSetDateFilter('all');
            }}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: '600',
              border: (!selectedCalendarDate && dateFilter === 'all') ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: (!selectedCalendarDate && dateFilter === 'all') ? 'var(--color-primary)' : '#ffffff',
              color: (!selectedCalendarDate && dateFilter === 'all') ? '#ffffff' : 'var(--color-text-main)',
              cursor: 'pointer',
            }}
          >
            All Dates ({resolvedCount})
          </button>

          {/* Today Button */}
          <button
            type="button"
            onClick={() => {
              onSelectCalendarDate('2026-09-12');
              onSetDateFilter('Today');
            }}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: '600',
              border: selectedCalendarDate === '2026-09-12' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: selectedCalendarDate === '2026-09-12' ? 'var(--color-primary)' : '#ffffff',
              color: selectedCalendarDate === '2026-09-12' ? '#ffffff' : 'var(--color-text-main)',
              cursor: 'pointer',
            }}
          >
            Today (12 Sep) ({todayCompleted.length})
          </button>

          {/* Yesterday Button */}
          <button
            type="button"
            onClick={() => {
              onSelectCalendarDate('2026-09-11');
              onSetDateFilter('Yesterday');
            }}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: '600',
              border: selectedCalendarDate === '2026-09-11' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: selectedCalendarDate === '2026-09-11' ? 'var(--color-primary)' : '#ffffff',
              color: selectedCalendarDate === '2026-09-11' ? '#ffffff' : 'var(--color-text-main)',
              cursor: 'pointer',
            }}
          >
            Yesterday (11 Sep) ({yesterdayCompleted.length})
          </button>

          {/* Dynamic Other Dates */}
          {uniqueCompletedDates
            .filter(d => d !== '2026-09-12' && d !== '2026-09-11')
            .map(isoDate => (
              <button
                key={isoDate}
                type="button"
                onClick={() => {
                  onSelectCalendarDate(isoDate);
                  onSetDateFilter('custom');
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  fontWeight: '600',
                  border: selectedCalendarDate === isoDate ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  backgroundColor: selectedCalendarDate === isoDate ? 'var(--color-primary)' : '#ffffff',
                  color: selectedCalendarDate === isoDate ? '#ffffff' : 'var(--color-text-main)',
                  cursor: 'pointer',
                }}
              >
                {formatDisplayDate(isoDate)} ({availableDatesWithCounts[isoDate]})
              </button>
            ))
          }
        </div>
      </div>

      {/* Render Completed Complaints: Either Selected Specific Date or Grouped Timeline */}
      {selectedCalendarDate ? (
        completedTasksOnSelectedDate.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '40px 20px',
            textAlign: 'center',
            color: 'var(--color-text-muted)'
          }}>
            <Calendar size={40} style={{ color: 'var(--color-text-light)', marginBottom: '12px' }} />
            <h4 style={{ color: 'var(--color-text-main)', fontSize: '16px', margin: '0 0 6px 0' }}>
              No tasks completed on {formatDisplayDate(selectedCalendarDate)}
            </h4>
            <p style={{ fontSize: '13px', maxWidth: '520px', margin: '0 auto 16px auto', lineHeight: '1.5' }}>
              {worker.name} has no maintenance resolutions logged for this specific calendar date. You can select one of the active dates with completed tasks below:
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {uniqueCompletedDates.map(isoDate => (
                <button
                  key={isoDate}
                  type="button"
                  onClick={() => onSelectCalendarDate(isoDate)}
                  style={{
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: '600',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-primary)',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    cursor: 'pointer'
                  }}
                >
                  {formatDisplayDate(isoDate)} ({availableDatesWithCounts[isoDate]} tasks)
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  onSelectCalendarDate('');
                  onSetDateFilter('all');
                }}
                style={{
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#ffffff',
                  color: 'var(--color-text-main)',
                  cursor: 'pointer'
                }}
              >
                View All History ({resolvedCount})
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Active Selected Date Banner */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              padding: '12px 18px',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: 'var(--radius-md)',
              marginBottom: '18px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CalendarCheck size={20} style={{ color: 'var(--color-success)' }} />
                <div>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-main)' }}>
                    Showing Completed Tasks for {formatDisplayDate(selectedCalendarDate)}
                  </span>
                  <span style={{
                    marginLeft: '10px',
                    padding: '2px 9px',
                    borderRadius: '999px',
                    backgroundColor: 'var(--color-success)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: '700'
                  }}>
                    {completedTasksOnSelectedDate.length} {completedTasksOnSelectedDate.length === 1 ? 'Task' : 'Tasks'} Completed
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSelectCalendarDate('');
                  onSetDateFilter('all');
                }}
                style={{
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#ffffff',
                  color: 'var(--color-text-main)',
                  cursor: 'pointer'
                }}
              >
                Show All Dates
              </button>
            </div>

            {/* Task Cards Feed for Selected Date */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {completedTasksOnSelectedDate.map(renderCompletedTaskCard)}
            </div>
          </div>
        )
      ) : (
        /* Grouped Date Timeline (when no single date is selected) */
        filteredDateGroups.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '40px 20px',
            textAlign: 'center',
            color: 'var(--color-text-muted)'
          }}>
            <Calendar size={36} style={{ color: 'var(--color-text-light)', marginBottom: '10px' }} />
            <h4 style={{ color: 'var(--color-text-main)' }}>No completed tasks recorded for this filter</h4>
            <p style={{ fontSize: '13px' }}>Switch filters above or complete active tasks from "My Tasks" to log new items here.</p>
          </div>
        ) : (
          filteredDateGroups.map((dateGroup) => {
            const tasksInGroup = groupMap[dateGroup] || [];
            const isToday = dateGroup.includes('Today');
            const isYesterday = dateGroup.includes('Yesterday');

            return (
              <div key={dateGroup} style={{ marginBottom: '30px' }}>
                {/* Date Group Header Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid var(--color-border)',
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isToday ? 'var(--color-primary)' : isYesterday ? '#475569' : 'var(--color-bg-subtle)',
                    color: isToday || isYesterday ? '#ffffff' : 'var(--color-text-main)',
                    fontWeight: '700',
                    fontSize: '14px',
                  }}>
                    <CalendarCheck size={16} />
                    <span>{dateGroup}</span>
                  </div>

                  <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-muted)' }}>
                    {tasksInGroup.length} {tasksInGroup.length === 1 ? 'task' : 'tasks'} completed
                  </span>
                </div>

                {/* Cards inside this Date Group */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {tasksInGroup.map(renderCompletedTaskCard)}
                </div>
              </div>
            );
          })
        )
      )}
    </div>
  );
}

export default WorkerWorkloadTab;
