import { describe, it, expect } from 'vitest';
import { calculateDepartmentPerformance } from '../departmentRating';

describe('departmentRating utility', () => {
  it('returns exemplary baseline metrics when department has zero complaints', () => {
    const result = calculateDepartmentPerformance('IT', []);
    expect(result.grade).toBe('A+');
    expect(result.resolutionRate).toBe(100);
    expect(result.averageRating).toBe(5.0);
  });

  it('computes composite score from student satisfaction, resolution rate, and timeliness', () => {
    const mockComplaints = [
      { id: '1', department: 'Electrical', status: 'Resolved', feedback: { rating: 5 } },
      { id: '2', department: 'Electrical', status: 'Resolved', feedback: { rating: 4 } },
      { id: '3', department: 'Electrical', status: 'In Progress' },
      { id: '4', department: 'Electrical', status: 'Overdue' },
    ];

    const result = calculateDepartmentPerformance('Electrical', mockComplaints);

    expect(result.totalComplaints).toBe(4);
    expect(result.resolvedCount).toBe(2);
    expect(result.resolutionRate).toBe(50); // 2/4 * 100
    expect(result.overdueCount).toBe(1);

    // Average rating: (5 + 4) / 2 = 4.5
    expect(result.averageRating).toBe(4.5);

    // Score:
    // Satisfaction: (4.5 / 5.0) * 30 = 27
    // Resolution: (50 / 100) * 50 = 25
    // Timeliness: max(0, 20 - 1*5) = 15
    // Total = 27 + 25 + 15 = 67 -> Grade B / C
    expect(result.performanceScore).toBe(67);
    expect(result.grade).toBe('C');
  });
});
