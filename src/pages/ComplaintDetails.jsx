import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useCampus } from '../context/CampusContext';
import EscalationAlertBanner from '../components/complaints/EscalationAlertBanner';
import ComplaintHeaderCard from '../components/complaints/ComplaintHeaderCard';
import VisualTimeline from '../components/timeline/VisualTimeline';
import ComplaintFeedbackCard from '../components/complaints/ComplaintFeedbackCard';
import { ArrowLeft } from 'lucide-react';
import '../components/components.css';

/**
 * ComplaintDetails Component
 * Controller component for displaying full complaint details, visual tracking timeline,
 * and satisfaction feedback.
 */
function ComplaintDetails({ 
  complaint: propComplaint, 
  onBack: propOnBack, 
  onProvideFeedback: propOnProvideFeedback 
}) {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const campus = useCampus();

  const complaint = propComplaint || campus.complaints?.find(c => c.id === paramId);

  const handleBack = () => {
    if (propOnBack) {
      propOnBack();
    } else {
      navigate(-1);
    }
  };

  if (!complaint) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text-main)' }}>Complaint Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>
          {paramId ? `No ticket found matching ID "${paramId}".` : 'No complaint selected.'}
        </p>
        <Button onClick={handleBack} variant="secondary" style={{ marginTop: '16px' }}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const {
    id,
    category,
    department,
    location,
    status,
    createdAt,
    expectedResolution,
    assignedWorker,
    resolutionNote,
    resolvedAt,
    feedback: existingFeedback,
    escalatedToAdmin,
    escalatedAt,
    submittedBy,
    studentName,
  } = complaint;

  // Lifecycle flags
  const isResolved = status === 'Resolved';
  const isInProgress = status === 'In Progress';
  const isPending = status === 'Pending';
  const isOverdue = status === 'Overdue';
  const isEscalated = status === 'Escalated to Admin' || Boolean(escalatedToAdmin);
  const hasFeedback = Boolean(existingFeedback);

  // --- Compute the 6 Stages ---
  const s1 = {
    id: 1,
    title: 'Complaint Submitted',
    state: 'completed',
    badge: 'SUBMITTED',
    time: createdAt,
    desc: `Complaint #${id} successfully registered by ${submittedBy || studentName || 'Resident'} and logged into the central database.`,
  };

  const s2 = {
    id: 2,
    title: 'Department Assigned',
    state: 'completed',
    badge: 'AUTO-ROUTED',
    time: createdAt,
    desc: `Automated routing rules evaluated category "${category}" and dispatched ticket to ${department} Department.`,
  };

  let s3State = 'pending';
  let s3Badge = 'PENDING';
  let s3Time = 'Awaiting Allocation';
  let s3Desc = 'Department In-Charge is analyzing worker capacity to assign a technician.';
  if (assignedWorker) {
    s3State = 'completed';
    s3Badge = 'DISPATCHED';
    s3Time = 'Assigned';
    s3Desc = `Work order dispatched to certified technician ${assignedWorker}.`;
  } else if (isEscalated) {
    s3State = 'escalated';
    s3Badge = 'ESCALATED';
    s3Time = escalatedAt || 'Escalated to Admin';
    s3Desc = `Department Head escalated ticket #${id} to Central Administration for resource authorization.`;
  } else if (isPending) {
    s3State = 'active';
    s3Badge = 'AWAITING DISPATCH';
    s3Time = 'In Queue';
    s3Desc = 'Department In-Charge is currently assigning an available certified technician.';
  } else if (isResolved || isInProgress) {
    s3State = 'completed';
    s3Badge = 'DISPATCHED';
    s3Time = 'Assigned';
    s3Desc = 'Technician was dispatched to execute on-site repairs.';
  }
  const s3Title = isEscalated
    ? 'Administration Review'
    : assignedWorker
      ? 'Technician Assigned'
      : 'Technician Assignment';
  const s3 = { id: 3, title: s3Title, state: s3State, badge: s3Badge, time: s3Time, desc: s3Desc };

  let s4State = 'pending';
  let s4Badge = 'QUEUED';
  let s4Time = 'Pending Worker Arrival';
  let s4Desc = `Repairs will begin once technician arrives at ${location}.`;
  if (isResolved) {
    s4State = 'completed';
    s4Badge = 'COMPLETED';
    s4Time = resolvedAt || 'Repairs Completed';
    s4Desc = `Repairs and inspection completed on-site at ${location}.`;
  } else if (isInProgress) {
    s4State = 'active';
    s4Badge = 'IN PROGRESS';
    s4Time = 'Active Repairs';
    s4Desc = `${assignedWorker || 'Technician'} is actively performing repairs and diagnostics at ${location}.`;
  } else if (isOverdue) {
    s4State = 'overdue';
    s4Badge = 'SLA DELAY';
    s4Time = 'Overdue';
    s4Desc = 'Work order has exceeded the expected SLA timeframe and has been expedited.';
  }
  const s4 = { id: 4, title: 'Work In Progress', state: s4State, badge: s4Badge, time: s4Time, desc: s4Desc };

  let s5State = 'pending';
  let s5Badge = 'PENDING';
  let s5Time = expectedResolution ? `Target: ${expectedResolution}` : 'Target SLA Window';
  let s5Desc = 'Awaiting completion of repairs and technician verification.';
  if (isResolved) {
    s5State = 'completed';
    s5Badge = 'RESOLVED';
    s5Time = resolvedAt || 'Resolved';
    s5Desc = resolutionNote 
      ? `Resolution note: "${resolutionNote}"` 
      : 'Issue resolved satisfactorily and closed in maintenance operations.';
  } else if (isOverdue) {
    s5State = 'overdue';
    s5Badge = 'OVERDUE';
    s5Time = expectedResolution ? `Target Exceeded: ${expectedResolution}` : 'Overdue';
    s5Desc = 'Resolution target SLA has been breached. Department alert notification has been sent.';
  }
  const s5 = { id: 5, title: 'Issue Resolved', state: s5State, badge: s5Badge, time: s5Time, desc: s5Desc };

  let s6State = 'pending';
  let s6Badge = 'LOCKED';
  let s6Time = 'Awaiting Resolution';
  let s6Desc = 'Resident feedback unlocks automatically once repairs are marked as resolved.';
  if (hasFeedback) {
    s6State = 'completed';
    s6Badge = 'RATED';
    s6Time = 'Feedback Submitted';
    s6Desc = `Resident rated resolution quality with ${existingFeedback?.rating} / 5 stars.`;
  } else if (isResolved) {
    s6State = 'active';
    s6Badge = 'ACTION REQUIRED';
    s6Time = 'Ready for Review';
    s6Desc = 'Please submit your feedback below to confirm the repair and help improve campus services.';
  }
  const s6 = { id: 6, title: 'Student Feedback', state: s6State, badge: s6Badge, time: s6Time, desc: s6Desc };

  const stages = [s1, s2, s3, s4, s5, s6];
  const completedCount = stages.filter(s => s.state === 'completed').length;
  const progressPercent = Math.round((completedCount / stages.length) * 100);
  const activeStage = stages.find(s => s.state === 'active' || s.state === 'escalated' || s.state === 'overdue') || stages[stages.length - 1];

  const handleProvideFeedback = (complaintId, feedbackPayload) => {
    if (propOnProvideFeedback) {
      propOnProvideFeedback(complaintId, feedbackPayload);
    } else if (campus.handleProvideFeedback) {
      campus.handleProvideFeedback(complaintId, feedbackPayload);
    }
  };

  return (
    <div>
      {/* Top action bar */}
      <div className="complaint-details-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Button variant="secondary" icon={ArrowLeft} onClick={handleBack}>
          Back to Complaints
        </Button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Ticket ID:</span>
          <span style={{ fontSize: '14px', fontWeight: '700', fontFamily: 'monospace' }}>{id}</span>
        </div>
      </div>

      {/* Escalation Alerts */}
      <EscalationAlertBanner complaint={complaint} />

      {/* Complaint Details Card */}
      <ComplaintHeaderCard complaint={complaint} />

      {/* Visual 6-Stage Tracking Timeline */}
      <VisualTimeline
        stages={stages}
        completedCount={completedCount}
        progressPercent={progressPercent}
        activeStage={activeStage}
      />

      {/* Student Feedback Section (Unlocks on Resolution) */}
      {isResolved && (
        <ComplaintFeedbackCard
          existingFeedback={existingFeedback}
          complaintId={id}
          onProvideFeedback={handleProvideFeedback}
        />
      )}
    </div>
  );
}

export default ComplaintDetails;
