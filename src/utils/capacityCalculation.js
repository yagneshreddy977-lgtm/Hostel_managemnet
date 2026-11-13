/**
 * Workforce Capacity & Shortage Calculation (Step 14)
 * 
 * Formula:
 * Capacity Utilization (%) = (Required Work Hours / Available Worker Hours) * 100
 * 
 * Thresholds:
 * - <= 80%: Normal Operation
 * - 81% - 100%: Heavy Load
 * - > 100%: ⚠ Department Over Capacity (Workforce Shortage Alert)
 */

export function calculateDepartmentCapacity(departmentName, complaints = [], workers = []) {
  // 1. Filter open (Pending & In Progress) complaints for this department
  const openComplaints = complaints.filter(
    (c) => c.department?.toLowerCase() === departmentName?.toLowerCase() && c.status !== 'Resolved'
  );

  // 2. Calculate Required Work Hours (Estimate ~3 hours per standard task, ~5 hours for Critical/High)
  const requiredWorkHours = openComplaints.reduce((total, c) => {
    if (c.priority === 'Critical') return total + 5;
    if (c.priority === 'High') return total + 4;
    return total + 2.5;
  }, 0);

  // 3. Filter workers belonging to this department
  const deptWorkers = workers.filter(
    (w) => w.department?.toLowerCase() === departmentName?.toLowerCase()
  );

  // 4. Calculate Available Worker Hours
  const availableWorkerHours = deptWorkers.reduce((total, w) => {
    return total + (w.availableHours !== undefined ? w.availableHours : 4);
  }, 0);

  // 5. Compute Utilization
  const effectiveAvailable = availableWorkerHours > 0 ? availableWorkerHours : 1; // Avoid divide by zero
  const capacityUtilization = Math.round((requiredWorkHours / effectiveAvailable) * 100);

  const isOverCapacity = capacityUtilization > 100;
  const isNearCapacity = capacityUtilization > 80 && capacityUtilization <= 100;

  return {
    department: departmentName,
    openComplaintsCount: openComplaints.length,
    workersCount: deptWorkers.length,
    requiredWorkHours,
    availableWorkerHours,
    capacityUtilization,
    isOverCapacity,
    isNearCapacity,
    statusText: isOverCapacity 
      ? '⚠ Department Over Capacity - Potential Workforce Shortage' 
      : isNearCapacity 
      ? '⚡ High Demand - Close to Full Shift Capacity' 
      : '✓ Balanced Capacity',
  };
}
