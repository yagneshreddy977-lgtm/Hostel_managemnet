import { describe, it, expect } from 'vitest';
import { calculateDepartmentCapacity } from '../capacityCalculation';

describe('capacityCalculation utility', () => {
  const mockComplaints = [
    { id: '1', department: 'Plumbing', status: 'Pending', priority: 'High' }, // 4h
    { id: '2', department: 'Plumbing', status: 'In Progress', priority: 'Critical' }, // 5h
    { id: '3', department: 'Plumbing', status: 'In Progress', priority: 'Medium' }, // 2.5h
    { id: '4', department: 'Plumbing', status: 'Resolved', priority: 'High' }, // ignored because resolved
    { id: '5', department: 'Electrical', status: 'Pending', priority: 'Critical' }, // ignored because diff dept
  ];

  const mockWorkers = [
    { id: 10, department: 'Plumbing', availableHours: 6 },
    { id: 11, department: 'Plumbing', availableHours: 4 },
    { id: 12, department: 'Electrical', availableHours: 8 },
  ];

  it('calculates required and available hours accurately for a department', () => {
    const result = calculateDepartmentCapacity('Plumbing', mockComplaints, mockWorkers);

    expect(result.department).toBe('Plumbing');
    expect(result.openComplaintsCount).toBe(3);
    expect(result.workersCount).toBe(2);

    // Required: 4 (High) + 5 (Critical) + 2.5 (Medium) = 11.5 hours
    expect(result.requiredWorkHours).toBe(11.5);

    // Available: 6 + 4 = 10 hours
    expect(result.availableWorkerHours).toBe(10);

    // Utilization: Math.round(11.5 / 10 * 100) = 115%
    expect(result.capacityUtilization).toBe(115);
    expect(result.isOverCapacity).toBe(true);
    expect(result.statusText).toContain('Over Capacity');
  });

  it('reports balanced capacity when demand is well within technician shift hours', () => {
    const relaxedComplaints = [
      { id: '1', department: 'Plumbing', status: 'Pending', priority: 'Low' }, // 2.5h
    ];

    const result = calculateDepartmentCapacity('Plumbing', relaxedComplaints, mockWorkers);
    expect(result.capacityUtilization).toBe(25); // 2.5 / 10 * 100
    expect(result.isOverCapacity).toBe(false);
    expect(result.isNearCapacity).toBe(false);
    expect(result.statusText).toContain('Balanced Capacity');
  });

  it('handles empty worker or empty complaint pools without divide-by-zero errors', () => {
    const result = calculateDepartmentCapacity('Civil', [], []);
    expect(result.capacityUtilization).toBe(0);
    expect(result.isOverCapacity).toBe(false);
  });
});
