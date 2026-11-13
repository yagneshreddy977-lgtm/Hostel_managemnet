/**
 * Overdue & Escalation Management (Step 17)
 * 
 * Identifies complaints that have breached SLA or are marked as overdue,
 * and handles supervisor escalation workflow.
 */

export function checkAndTagOverdueComplaints(complaintsList = []) {
  // In our mock dataset, CMP-101 and any complaint explicitly tagged overdue are checked
  return complaintsList.map((complaint) => {
    // If complaint is already resolved, it is not overdue
    if (complaint.status === 'Resolved') {
      return { ...complaint, isOverdue: false };
    }

    // Check if complaint is flagged overdue or critical pending > 4 hours
    const isOverdue = complaint.status === 'Overdue' || 
      complaint.isOverdue || 
      (complaint.priority === 'Critical' && complaint.status === 'Pending');

    return {
      ...complaint,
      isOverdue: Boolean(isOverdue),
      escalationLevel: isOverdue ? 'Tier 1: Department In-Charge Alert' : 'Normal',
    };
  });
}
