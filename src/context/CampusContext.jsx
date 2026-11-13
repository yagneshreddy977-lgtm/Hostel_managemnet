import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialComplaints, initialWorkers, departmentHeads } from '../data/mockData';

const CampusContext = createContext(null);

export function CampusProvider({ children }) {
  // 1. Current Active Role: 'student' | 'staff' | 'worker' | 'incharge' | 'admin'
  const [currentRole, setCurrentRole] = useState('student');

  // Active Department Head (Electrical | Plumbing | IT | Civil | Housekeeping)
  const [inchargeDepartment, setInchargeDepartment] = useState('Electrical');

  // 2. Complaints State with localStorage Persistence
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_complaints_v5');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('localStorage read error:', e);
    }
    return initialComplaints;
  });

  // 3. Workers State with localStorage Persistence
  const [workers, setWorkers] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_workers_v5');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('localStorage read error:', e);
    }
    return initialWorkers;
  });

  // 4. Notifications State
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_notifications_v5');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('localStorage read error:', e);
    }
    return [
      {
        id: 1,
        title: 'New Complaint Registered',
        message: 'Complaint CMP-101 (Water leakage) was auto-routed to Plumbing Department.',
        time: '15 mins ago',
        type: 'info',
      },
      {
        id: 2,
        title: 'Task Assigned',
        message: 'Rahul Verma accepted Task CMP-104 (Ceiling fan sparking). Repairs in progress.',
        time: '45 mins ago',
        type: 'info',
      },
      {
        id: 3,
        title: 'Repair Completed',
        message: 'Water cooler repair CMP-111 was marked as Resolved by Electrical Department.',
        time: '2 hours ago',
        type: 'success',
      },
      {
        id: 4,
        title: '⚠ SLA Alert: Escalation',
        message: 'Complaint CMP-101 is approaching the 6-hour SLA window. Tier 1 notice sent to In-Charge.',
        time: '3 hours ago',
        type: 'warning',
      },
    ];
  });

  // Persist state updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('campus_complaints_v5', JSON.stringify(complaints));
      localStorage.setItem('campus_workers_v5', JSON.stringify(workers));
      localStorage.setItem('campus_notifications_v5', JSON.stringify(notifications));
    } catch (e) {
      console.warn('localStorage write error:', e);
    }
  }, [complaints, workers, notifications]);

  // Personas
  const currentHead = departmentHeads[inchargeDepartment] || departmentHeads.Electrical;

  const currentUser = currentRole === 'staff' ? {
    name: 'Dr. Ramesh Kulkarni',
    role: 'staff',
    department: 'Computer Engineering Department',
    unit: 'Faculty Wing B, Cabin 12',
    rollNo: 'FAC-CS-104',
  } : {
    name: 'Aman Sharma',
    role: 'student',
    department: 'Hostel Department',
    unit: 'Hostel Block B, Room 302',
    rollNo: 'CS2023-042',
  };

  const currentWorker = workers.find(w => w.name === 'Rahul Verma') || workers[0];

  const personalComplaints = complaints.filter(
    (c) => c.submittedBy === currentUser.name || c.studentName === currentUser.name
  );

  const departmentComplaints = complaints.filter(
    (c) => c.originDepartment === currentUser.department
  );

  const workerTasks = complaints.filter(
    (c) => c.assignedWorker && c.assignedWorker.includes(currentWorker.name)
  );

  const currentDeptComplaints = complaints.filter(
    (c) => c.department?.toLowerCase() === inchargeDepartment.toLowerCase()
  );

  const currentDeptEscalations = currentDeptComplaints.filter(
    (c) => c.status === 'Overdue' || (c.priority === 'Critical' && c.status === 'Pending') || c.escalatedToAdmin
  );

  // --- Notification Helper ---
  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: 'Just now',
      type,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // --- Student Handlers ---
  const handleSaveComplaint = (newComplaint) => {
    const updated = [newComplaint, ...complaints];
    setComplaints(updated);
    addNotification(
      'New Complaint Logged',
      `Ticket #${newComplaint.id} has been submitted and auto-routed to ${newComplaint.department} Department.`,
      'info'
    );
    return newComplaint;
  };

  const handleProvideFeedback = (complaintId, feedbackData) => {
    const updated = complaints.map(c => {
      if (c.id === complaintId) {
        return { ...c, feedback: feedbackData };
      }
      return c;
    });
    setComplaints(updated);
    addNotification(
      'Feedback Recorded',
      `Student rated resolution for ticket #${complaintId} with ${feedbackData.rating} stars.`,
      'success'
    );
  };

  // --- Worker Handlers ---
  const handleAcceptWorkerTask = (taskId) => {
    const updatedComplaints = complaints.map(c => {
      if (c.id === taskId) {
        return { ...c, status: 'In Progress' };
      }
      return c;
    });
    setComplaints(updatedComplaints);
    addNotification('Task Acknowledged', `${currentWorker.name} accepted task #${taskId}.`, 'info');
  };

  const handleStartWork = (taskId) => {
    const updatedComplaints = complaints.map(c => {
      if (c.id === taskId) {
        return { ...c, status: 'In Progress' };
      }
      return c;
    });
    setComplaints(updatedComplaints);
    addNotification('Work Started', `${currentWorker.name} is on-site performing repairs for #${taskId}.`, 'info');
  };

  const handleResolveWorkerTask = (taskId, note) => {
    const resolvedDate = new Date();
    const now = resolvedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const dateLabel = resolvedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const resolvedIsoDate = [
      resolvedDate.getFullYear(),
      String(resolvedDate.getMonth() + 1).padStart(2, '0'),
      String(resolvedDate.getDate()).padStart(2, '0'),
    ].join('-');

    // Update complaint
    const updatedComplaints = complaints.map(c => {
      if (c.id === taskId) {
        return {
          ...c,
          status: 'Resolved',
          resolutionNote: note,
          resolvedAt: `Today (${dateLabel}), ${now}`,
          resolvedDate: 'Today',
          resolvedIsoDate,
        };
      }
      return c;
    });
    setComplaints(updatedComplaints);

    // Restore worker capacity
    const updatedWorkers = workers.map(w => {
      if (w.name === currentWorker.name) {
        return {
          ...w,
          availableHours: Math.min(8, (w.availableHours || 4) + 2),
          currentTasks: Math.max(0, (w.currentTasks || 2) - 1),
        };
      }
      return w;
    });
    setWorkers(updatedWorkers);

    addNotification('Task Resolved', `Ticket #${taskId} was marked as Resolved by ${currentWorker.name}.`, 'success');
  };

  // --- Department In-Charge Handlers ---
  const handleSmartAssignWorker = (complaintId, workerName) => {
    // 1. Assign worker to complaint and set status to In Progress
    const updatedComplaints = complaints.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          assignedWorker: workerName,
          status: 'In Progress',
        };
      }
      return c;
    });
    setComplaints(updatedComplaints);

    // 2. Adjust assigned worker's workload
    const updatedWorkers = workers.map(w => {
      if (w.name === workerName) {
        return {
          ...w,
          availableHours: Math.max(0, (w.availableHours || 6) - 2),
          currentTasks: (w.currentTasks || 0) + 1,
        };
      }
      return w;
    });
    setWorkers(updatedWorkers);

    addNotification(
      'Worker Assigned (Smart Algorithm)',
      `Ticket #${complaintId} was assigned to ${workerName} based on optimal capacity score.`,
      'info'
    );
  };

  const handleEscalateToAdmin = (complaintId, escalationReason, urgencyLevel = 'High') => {
    const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
      new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    let targetTitle = `Ticket #${complaintId}`;
    const updatedComplaints = complaints.map(c => {
      if (c.id === complaintId) {
        targetTitle = c.title;
        return {
          ...c,
          status: 'Escalated to Admin',
          escalatedToAdmin: true,
          escalationReason,
          escalationUrgency: urgencyLevel,
          escalatedAt: timestamp,
          escalatedBy: currentHead.name,
          escalatedFromDept: inchargeDepartment,
        };
      }
      return c;
    });
    setComplaints(updatedComplaints);

    // High-priority notification for Administrator
    addNotification(
      `🚨 Escalated to Administration: Ticket #${complaintId}`,
      `${currentHead.name} (${inchargeDepartment} Head) has escalated ticket #${complaintId} ("${targetTitle}") to Central Administration. Reason: "${escalationReason}" [Urgency: ${urgencyLevel}]`,
      'error'
    );
  };

  // --- Admin Acknowledge Escalation Handler ---
  const handleAcknowledgeEscalation = (complaintId, adminNotes = 'Emergency procurement and specialist contractor authorized by Central Administration.') => {
    const updatedComplaints = complaints.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: 'In Progress',
          escalatedToAdmin: false,
          adminAcknowledged: true,
          adminNotes,
        };
      }
      return c;
    });
    setComplaints(updatedComplaints);
    addNotification(
      `Escalation Acknowledged: Ticket #${complaintId}`,
      `Campus Administration reviewed ticket #${complaintId} and authorized emergency contractor dispatch.`,
      'success'
    );
  };

  // --- Reset Demo Data Helper ---
  const handleResetDemo = () => {
    if (window.confirm('Reset all demo data (complaints, workers, notifications) back to original state?')) {
      localStorage.removeItem('campus_complaints_v5');
      localStorage.removeItem('campus_workers_v5');
      localStorage.removeItem('campus_notifications_v5');
      localStorage.removeItem('campus_complaints_v4');
      localStorage.removeItem('campus_workers_v4');
      localStorage.removeItem('campus_notifications_v4');
      localStorage.removeItem('campus_complaints_v3');
      localStorage.removeItem('campus_workers_v3');
      localStorage.removeItem('campus_notifications_v3');
      localStorage.removeItem('campus_complaints_v2');
      localStorage.removeItem('campus_workers_v2');
      localStorage.removeItem('campus_notifications_v2');
      localStorage.removeItem('campus_complaints');
      localStorage.removeItem('campus_workers');
      localStorage.removeItem('campus_notifications');
      setComplaints(initialComplaints);
      setWorkers(initialWorkers);
      alert('Demo data has been reset to defaults.');
    }
  };

  const userName = currentRole === 'staff' 
    ? 'Dr. Ramesh Kulkarni'
    : currentRole === 'student' 
      ? 'Aman Sharma' 
      : currentRole === 'worker' 
        ? 'Rahul Verma' 
        : currentRole === 'incharge' 
          ? currentHead.name 
          : 'Director Campus Operations';

  const value = {
    currentRole,
    setCurrentRole,
    inchargeDepartment,
    setInchargeDepartment,
    complaints,
    setComplaints,
    workers,
    setWorkers,
    notifications,
    setNotifications,
    currentHead,
    currentUser,
    currentWorker,
    personalComplaints,
    departmentComplaints,
    workerTasks,
    currentDeptComplaints,
    currentDeptEscalations,
    userName,
    addNotification,
    handleSaveComplaint,
    handleProvideFeedback,
    handleAcceptWorkerTask,
    handleStartWork,
    handleResolveWorkerTask,
    handleSmartAssignWorker,
    handleEscalateToAdmin,
    handleAcknowledgeEscalation,
    handleResetDemo,
  };

  return (
    <CampusContext.Provider value={value}>
      {children}
    </CampusContext.Provider>
  );
}

export function useCampus() {
  const context = useContext(CampusContext);
  return context || {};
}

export default CampusContext;
