import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCampus } from '../context/CampusContext';
import WorkerDashboard from '../pages/WorkerDashboard';

/**
 * WorkerPageRoute Component
 * Extracts /worker/:tab URL parameter and connects WorkerDashboard to CampusContext.
 */
function WorkerPageRoute() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const campus = useCampus();

  const activeTab = tab ? (tab === 'tasks' ? 'my-tasks' : tab) : 'dashboard';

  const handleSelectTab = (tabId) => {
    const slug = tabId === 'my-tasks' ? 'tasks' : (tabId === 'dashboard' || tabId === 'worker-dashboard' ? '' : tabId);
    navigate(slug ? `/worker/${slug}` : '/worker');
  };

  return (
    <WorkerDashboard
      worker={campus.currentWorker}
      tasks={campus.workerTasks}
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      onAcceptTask={campus.handleAcceptWorkerTask}
      onStartWork={campus.handleStartWork}
      onResolveTask={campus.handleResolveWorkerTask}
    />
  );
}

export default WorkerPageRoute;
