/**
 * Department Rating & Performance Calculation (Step 13)
 * 
 * Evaluates department efficiency based on:
 * 1. Average Student Feedback Rating (1 - 5 stars)
 * 2. Overall Resolution Rate (Resolved / Total * 100)
 * 3. On-Time Delivery / Overdue Penalties
 */

export function calculateDepartmentPerformance(departmentName, complaints = []) {
  const deptComplaints = complaints.filter(
    (c) => c.department.toLowerCase() === departmentName.toLowerCase()
  );

  const total = deptComplaints.length;
  if (total === 0) {
    return {
      department: departmentName,
      totalComplaints: 0,
      resolutionRate: 100,
      averageRating: 5.0,
      overdueCount: 0,
      performanceScore: 95,
      grade: 'A+',
    };
  }

  const resolved = deptComplaints.filter((c) => c.status === 'Resolved').length;
  const overdue = deptComplaints.filter((c) => c.status === 'Overdue' || c.isOverdue).length;
  const resolutionRate = Math.round((resolved / total) * 100);

  // Student ratings average
  const ratedComplaints = deptComplaints.filter((c) => c.feedback && c.feedback.rating);
  let averageRating = 4.7; // Base historical department average
  if (ratedComplaints.length > 0) {
    const sum = ratedComplaints.reduce((acc, c) => acc + c.feedback.rating, 0);
    averageRating = Number((sum / ratedComplaints.length).toFixed(1));
  }

  // Composite Performance Index (0 - 100)
  // 50% based on Resolution Rate
  // 30% based on Student Satisfaction (Rating/5 * 30)
  // 20% on-time bonus minus overdue penalty
  const satisfactionPoints = (averageRating / 5.0) * 30;
  const resolutionPoints = (resolutionRate / 100) * 50;
  const timelinessPoints = Math.max(0, 20 - overdue * 5);

  const performanceScore = Math.min(100, Math.round(satisfactionPoints + resolutionPoints + timelinessPoints));

  let grade = 'A';
  if (performanceScore >= 90) grade = 'A+';
  else if (performanceScore >= 80) grade = 'A';
  else if (performanceScore >= 70) grade = 'B';
  else if (performanceScore >= 60) grade = 'C';
  else grade = 'Needs Attention';

  return {
    department: departmentName,
    totalComplaints: total,
    resolvedCount: resolved,
    overdueCount: overdue,
    resolutionRate,
    averageRating,
    performanceScore,
    grade,
  };
}
