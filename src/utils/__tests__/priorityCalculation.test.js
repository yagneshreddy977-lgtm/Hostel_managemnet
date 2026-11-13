import { describe, it, expect } from 'vitest';
import { calculatePriorityScore } from '../priorityCalculation';

describe('priorityCalculation utility', () => {
  it('assigns Critical priority to high-risk electrical sparks in common areas', () => {
    const complaintData = {
      category: 'Electrical',
      description: 'Dangerous spark and smoke coming from distribution panel',
      location: 'Hostel Block B Corridor 3rd floor',
      peopleAffected: 25,
    };

    const result = calculatePriorityScore(complaintData);

    // Hazard (spark/smoke): 50 pts
    // Location (corridor): 30 pts
    // People (>=20): 20 pts
    // Total = 100 pts -> Critical
    expect(result.score).toBe(100);
    expect(result.priority).toBe('Critical');
    expect(result.rationale).toContain('Critical');
  });

  it('assigns High priority to water leakage in corridors or common areas', () => {
    const complaintData = {
      category: 'Plumbing',
      description: 'Water pipe leak pooling on tiles',
      location: 'Common washroom entrance',
      peopleAffected: 5,
    };

    const result = calculatePriorityScore(complaintData);

    // Hazard (leak): 35 pts
    // Location (common washroom): 30 pts
    // People (>=5): 10 pts
    // Total = 75 pts -> High
    expect(result.score).toBe(75);
    expect(result.priority).toBe('High');
  });

  it('assigns Low priority to aesthetic or minor noise complaints in private rooms', () => {
    const complaintData = {
      category: 'Civil Maintenance',
      description: 'Minor squeak on cupboard hinge',
      location: 'Private Room 302',
      peopleAffected: 1,
    };

    const result = calculatePriorityScore(complaintData);
    expect(result.score).toBeLessThan(35);
    expect(result.priority).toBe('Low');
  });
});
