import React, { useState, useMemo } from 'react';
import { useCampus } from '../context/CampusContext';

// Extracted Subcomponents
import WorkerHeader from '../components/worker/WorkerHeader';
import WorkerNavTabs from '../components/worker/WorkerNavTabs';
import WorkerOverviewTab from '../components/worker/WorkerOverviewTab';
import WorkerTasksTab from '../components/worker/WorkerTasksTab';
import WorkerWorkloadTab from '../components/worker/WorkerWorkloadTab';
import WorkerScheduleTab from '../components/worker/WorkerScheduleTab';
import WorkerResolveModal from '../components/worker/WorkerResolveModal';
import '../components/components.css';

/**
 * WorkerDashboard Component
 * Dedicated workspace for campus maintenance workers (Rahul Verma - Electrician).
 * Decomposed into modular components for readability and isolated debugging.
 */
function WorkerDashboard({
  worker: propWorker,
  tasks: propTasks,
  activeTab = 'dashboard',
  onSelectTab,
  onAcceptTask: propOnAcceptTask,
  onStartWork: propOnStartWork,
  onResolveTask: propOnResolveTask,
}) {
  const campus = useCampus();

  const worker = propWorker || campus.currentWorker;
  const tasks = propTasks || campus.workerTasks || [];
  const onAcceptTask = propOnAcceptTask || campus.handleAcceptWorkerTask;
  const onStartWork = propOnStartWork || campus.handleStartWork;
  const onResolveTask = propOnResolveTask || campus.handleResolveWorkerTask;

  // Controlled tab: fallback to internal state if not provided
  const [internalTab, setInternalTab] = useState('dashboard');
  const currentTab = (activeTab === 'dashboard' || activeTab === 'worker-dashboard') 
    ? internalTab 
    : (activeTab || internalTab);

  const handleTabChange = (tabId) => {
    setInternalTab(tabId);
    if (onSelectTab) {
      onSelectTab(tabId);
    }
  };

  // --- Filter States for "My Tasks" ---
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('active');
  const [taskDateFilter, setTaskDateFilter] = useState('');

  // --- Filter State for "Workload" Section ---
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState('');

  // --- Modal state for resolving a task ---
  const [resolvingTaskId, setResolvingTaskId] = useState(null);
  const [resolutionNote, setResolutionNote] = useState('');

  // --- Metrics Calculation ---
  const totalAssigned = tasks.length;
  const pendingActionCount = tasks.filter(t => t.status === 'Pending').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const resolvedCount = tasks.filter(t => t.status === 'Resolved').length;
  const activeCount = pendingActionCount + inProgressCount;

  const criticalCount = tasks.filter(t => t.priority === 'Critical').length;
  const highCount = tasks.filter(t => t.priority === 'High').length;
  const moderateCount = tasks.filter(t => t.priority === 'Medium' || t.priority === 'Moderate').length;
  const lowCount = tasks.filter(t => t.priority === 'Low').length;
  const criticalActiveCount = tasks.filter(t => t.priority === 'Critical' && t.status !== 'Resolved').length;

  // Workload shift hours
  const totalHours = worker?.workingHours || 8;
  const availableHours = worker?.availableHours || 4;
  const occupiedHours = Math.max(0, totalHours - availableHours);
  const workloadPercentage = Math.round((occupiedHours / totalHours) * 100);

  // --- Helper: Extract ISO date (YYYY-MM-DD) from a completed task ---
  const getTaskIsoDate = (task) => {
    if (task.resolvedIsoDate) return task.resolvedIsoDate;
    if (task.resolvedDate === 'Today') return '2026-09-12';
    if (task.resolvedDate === 'Yesterday') return '2026-09-11';
    if (task.resolvedDate === '10 Sep 2026') return '2026-09-10';
    if (task.resolvedDate === '08 Sep 2026') return '2026-09-08';
    if (task.resolvedDate === '03 Sep 2026') return '2026-09-03';
    
    const text = (task.resolvedAt || '').trim();
    if (text.toLowerCase().startsWith('today') || text.startsWith('2026-09-12')) return '2026-09-12';
    if (text.toLowerCase().startsWith('yesterday') || text.startsWith('2026-09-11')) return '2026-09-11';
    if (text.startsWith('2026-09-10')) return '2026-09-10';
    if (text.startsWith('2026-09-08')) return '2026-09-08';
    if (text.startsWith('2026-09-03')) return '2026-09-03';

    const match = text.match(/(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : '';
  };

  // --- Helper: Human-readable display of date ---
  const formatDisplayDate = (isoDateStr) => {
    if (!isoDateStr) return '';
    if (isoDateStr === '2026-09-12') return 'Today (12 Sep 2026)';
    if (isoDateStr === '2026-09-11') return 'Yesterday (11 Sep 2026)';
    try {
      const parts = isoDateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }
    } catch (e) {
      // fallback
    }
    return isoDateStr;
  };

  // --- Helper: Group Completed Tasks by Date Label ---
  const getTaskDateGroup = (task) => {
    const iso = getTaskIsoDate(task);
    if (iso === '2026-09-12') return 'Today (12 Sep 2026)';
    if (iso === '2026-09-11') return 'Yesterday (11 Sep 2026)';
    if (iso === '2026-09-10') return '10 Sep 2026';
    if (iso === '2026-09-08') return '08 Sep 2026';
    if (iso === '2026-09-03') return '03 Sep 2026';
    if (iso) return formatDisplayDate(iso);
    return task.resolvedAt || 'Earlier Completed';
  };

  const completedTasks = tasks.filter(t => t.status === 'Resolved');
  const todayCompleted = completedTasks.filter(t => getTaskIsoDate(t) === '2026-09-12');
  const yesterdayCompleted = completedTasks.filter(t => getTaskIsoDate(t) === '2026-09-11');
  const earlierCompleted = completedTasks.filter(t => getTaskIsoDate(t) !== '2026-09-12' && getTaskIsoDate(t) !== '2026-09-11');

  const availableDatesWithCounts = useMemo(() => {
    const counts = {};
    completedTasks.forEach(task => {
      const iso = getTaskIsoDate(task);
      if (iso) {
        counts[iso] = (counts[iso] || 0) + 1;
      }
    });
    return counts;
  }, [completedTasks]);

  const uniqueCompletedDates = Object.keys(availableDatesWithCounts).sort().reverse();

  const completedTasksOnSelectedDate = selectedCalendarDate
    ? completedTasks.filter(t => getTaskIsoDate(t) === selectedCalendarDate)
    : [];

  const dateGroups = [];
  const groupMap = {};
  completedTasks.forEach(task => {
    const groupName = getTaskDateGroup(task);
    if (!groupMap[groupName]) {
      groupMap[groupName] = [];
      dateGroups.push(groupName);
    }
    groupMap[groupName].push(task);
  });

  dateGroups.sort((a, b) => {
    if (a.includes('Today')) return -1;
    if (b.includes('Today')) return 1;
    if (a.includes('Yesterday')) return -1;
    if (b.includes('Yesterday')) return 1;
    return b.localeCompare(a);
  });

  const filteredDateGroups = dateGroups.filter(groupName => {
    if (selectedCalendarDate) return false;
    if (dateFilter === 'all') return true;
    if (dateFilter === 'Today') return groupName.includes('Today');
    if (dateFilter === 'Yesterday') return groupName.includes('Yesterday');
    if (dateFilter === 'Earlier') return !groupName.includes('Today') && !groupName.includes('Yesterday');
    return true;
  });

  // Filtered tasks for "My Tasks" view
  const displayedTasks = tasks.filter(task => {
    if (priorityFilter !== 'all') {
      if (priorityFilter === 'Medium' && (task.priority === 'Medium' || task.priority === 'Moderate')) {
        // match
      } else if (task.priority !== priorityFilter) {
        return false;
      }
    }
    if (statusFilter === 'active') {
      if (task.status !== 'Pending' && task.status !== 'In Progress') return false;
    } else if (statusFilter !== 'all') {
      if (task.status !== statusFilter) return false;
    }
    if (taskDateFilter) {
      const createdMatches = task.createdAt?.startsWith(taskDateFilter);
      const expectedMatches = task.expectedResolution?.startsWith(taskDateFilter);
      const resolvedMatches = getTaskIsoDate(task) === taskDateFilter;
      if (!createdMatches && !expectedMatches && !resolvedMatches) {
        return false;
      }
    }
    return true;
  });

  // Submit resolution handler
  const handleConfirmResolve = (e) => {
    e.preventDefault();
    if (!resolutionNote.trim()) {
      alert('Please describe what action was taken to fix the issue.');
      return;
    }
    onResolveTask(resolvingTaskId, resolutionNote.trim());
    setResolvingTaskId(null);
    setResolutionNote('');
  };

  return (
    <div>
      {/* 1. Header Banner */}
      <WorkerHeader worker={worker} />

      {/* 2. Worker Sub-Navigation Tab Bar */}
      <WorkerNavTabs
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        activeCount={activeCount}
        resolvedCount={resolvedCount}
      />

      {/* 3. Tab: Overview */}
      {(currentTab === 'dashboard' || currentTab === 'worker-dashboard') && (
        <WorkerOverviewTab
          totalAssigned={totalAssigned}
          inProgressCount={inProgressCount}
          resolvedCount={resolvedCount}
          todayCompletedCount={todayCompleted.length}
          availableHours={availableHours}
          totalHours={totalHours}
          criticalActiveCount={criticalActiveCount}
          criticalCount={criticalCount}
          highCount={highCount}
          moderateCount={moderateCount}
          lowCount={lowCount}
          activeCount={activeCount}
          yesterdayCompletedCount={yesterdayCompleted.length}
          earlierCompletedCount={earlierCompleted.length}
          onNavigateTab={handleTabChange}
          onSetPriorityFilter={setPriorityFilter}
        />
      )}

      {/* 4. Tab: My Tasks */}
      {currentTab === 'my-tasks' && (
        <WorkerTasksTab
          displayedTasks={displayedTasks}
          priorityFilter={priorityFilter}
          onSetPriorityFilter={setPriorityFilter}
          statusFilter={statusFilter}
          onSetStatusFilter={setStatusFilter}
          taskDateFilter={taskDateFilter}
          onSetTaskDateFilter={setTaskDateFilter}
          totalAssigned={totalAssigned}
          activeCount={activeCount}
          resolvedCount={resolvedCount}
          criticalCount={criticalCount}
          highCount={highCount}
          moderateCount={moderateCount}
          lowCount={lowCount}
          onAcceptTask={onAcceptTask}
          onStartWork={onStartWork}
          onOpenResolveModal={(id) => setResolvingTaskId(id)}
          formatDisplayDate={formatDisplayDate}
        />
      )}

      {/* 5. Tab: Workload & Completed Tasks by Date */}
      {currentTab === 'workload' && (
        <WorkerWorkloadTab
          worker={worker}
          resolvedCount={resolvedCount}
          todayCompleted={todayCompleted}
          yesterdayCompleted={yesterdayCompleted}
          earlierCompleted={earlierCompleted}
          occupiedHours={occupiedHours}
          availableHours={availableHours}
          totalHours={totalHours}
          workloadPercentage={workloadPercentage}
          selectedCalendarDate={selectedCalendarDate}
          onSelectCalendarDate={setSelectedCalendarDate}
          dateFilter={dateFilter}
          onSetDateFilter={setDateFilter}
          uniqueCompletedDates={uniqueCompletedDates}
          availableDatesWithCounts={availableDatesWithCounts}
          completedTasksOnSelectedDate={completedTasksOnSelectedDate}
          filteredDateGroups={filteredDateGroups}
          groupMap={groupMap}
          formatDisplayDate={formatDisplayDate}
        />
      )}

      {/* 6. Tab: Work Schedule */}
      {currentTab === 'schedule' && (
        <WorkerScheduleTab worker={worker} />
      )}

      {/* 7. Resolution Modal */}
      <WorkerResolveModal
        taskId={resolvingTaskId}
        note={resolutionNote}
        onNoteChange={setResolutionNote}
        onSubmit={handleConfirmResolve}
        onClose={() => {
          setResolvingTaskId(null);
          setResolutionNote('');
        }}
      />
    </div>
  );
}

export default WorkerDashboard;
