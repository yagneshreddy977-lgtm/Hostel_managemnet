import { describe, it, expect } from 'vitest';
import { calculateWorkerAssignmentScore, assignBestWorker } from '../workerAssignment';

describe('workerAssignment utility', () => {
  const sampleComplaint = {
    id: 'CMP-TEST-1',
    category: 'Electrical Maintenance',
    department: 'Electrical',
    priority: 'High',
  };

  const sampleWorkers = [
    {
      id: 1,
      name: 'Rahul Verma',
      department: 'Electrical',
      skill: 'Senior Campus Electrician',
      workingHours: 8,
      availableHours: 6,
      currentTasks: 1,
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Amit Shah',
      department: 'Electrical',
      skill: 'Junior Assistant Electrician',
      workingHours: 8,
      availableHours: 2,
      currentTasks: 3,
      rating: 4.2,
    },
    {
      id: 3,
      name: 'Sunil Kumar',
      department: 'IT',
      skill: 'Network Engineer',
      workingHours: 8,
      availableHours: 8,
      currentTasks: 0,
      rating: 4.8,
    },
  ];

  it('calculates 4-part weighted assignment score accurately', () => {
    const worker = sampleWorkers[0];
    const scoreData = calculateWorkerAssignmentScore(worker, sampleComplaint);

    expect(scoreData.workerName).toBe('Rahul Verma');
    expect(scoreData.breakdown).toBeDefined();

    // Available hours: 6/8 = 0.75 * 40 = 30 pts
    expect(scoreData.breakdown.availability).toBe(30);

    // Active tasks: 1 task -> 22 pts
    expect(scoreData.breakdown.workload).toBe(22);

    // Skill match: Electrical category + Electrician skill -> 20 pts
    expect(scoreData.breakdown.skillMatch).toBe(20);

    // Rating: 4.9 / 5.0 * 10 = 10 pts
    expect(scoreData.breakdown.rating).toBe(10);

    // Total: 30 + 22 + 20 + 10 = 82
    expect(scoreData.totalScore).toBe(82);
  });

  it('penalizes busy technicians with 3+ tasks to prevent burnout', () => {
    const busyWorker = sampleWorkers[1];
    const scoreData = calculateWorkerAssignmentScore(busyWorker, sampleComplaint);

    // Workload score for >= 3 tasks is 5
    expect(scoreData.breakdown.workload).toBe(5);
    expect(scoreData.totalScore).toBeLessThan(60);
  });

  it('ranks workers from highest to lowest score in candidate pool', () => {
    const result = assignBestWorker(sampleWorkers, sampleComplaint);

    expect(result.bestCandidate).toBeDefined();
    expect(result.bestCandidate.worker.name).toBe('Rahul Verma');
    expect(result.rankedCandidates.length).toBe(2); // Only Electrical workers should be in eligible pool
    expect(result.rankedCandidates[0].totalScore).toBeGreaterThanOrEqual(result.rankedCandidates[1].totalScore);
  });

  it('falls back gracefully to all workers if no direct department match is found', () => {
    const unknownDeptComplaint = {
      id: 'CMP-SPECIAL',
      category: 'Audio Visual',
      department: 'SpecialEvents',
    };

    const result = assignBestWorker(sampleWorkers, unknownDeptComplaint);
    expect(result.rankedCandidates.length).toBe(sampleWorkers.length);
  });
});
