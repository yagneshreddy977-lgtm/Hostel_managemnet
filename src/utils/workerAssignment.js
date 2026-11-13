/**
 * Smart Worker Assignment System (Step 8 & Step 10)
 * 
 * Simple, explainable Weighted Scoring Algorithm.
 * 
 * Formula:
 * Total Score (100 pts) =
 *   + Available Hours Capacity (40 pts)
 *   + Workload Balancing (30 pts)
 *   + Skill Match (20 pts)
 *   + Performance Rating (10 pts)
 * 
 * The worker with the highest score is recommended.
 * Avoids overloading busy workers while capable workers have free capacity!
 */

export function calculateWorkerAssignmentScore(worker, complaint) {
  // 1. Availability Capacity (Max 40 points)
  // More free hours = higher score
  const totalShiftHours = worker.workingHours || 8;
  const availableHours = worker.availableHours || 0;
  const capacityRatio = Math.min(1, Math.max(0, availableHours / totalShiftHours));
  const availabilityScore = Math.round(capacityRatio * 40);

  // 2. Workload Balancing (Max 30 points)
  // Fewer active tasks = higher score (Prevents overloading)
  const activeTasks = worker.currentTasks || 0;
  let workloadScore = 30;
  if (activeTasks === 1) workloadScore = 22;
  else if (activeTasks === 2) workloadScore = 14;
  else if (activeTasks >= 3) workloadScore = 5;

  // 3. Skill & Specialty Match (Max 20 points)
  const workerSkill = (worker.skill || '').toLowerCase();
  const complaintCategory = (complaint.category || '').toLowerCase();
  let skillScore = 10; // Base baseline for same department
  if (
    (complaintCategory.includes('electrical') && workerSkill.includes('electrician')) ||
    (complaintCategory.includes('plumbing') && workerSkill.includes('plumber')) ||
    (complaintCategory.includes('it') && workerSkill.includes('network')) ||
    (complaintCategory.includes('civil') && (workerSkill.includes('carpenter') || workerSkill.includes('masonry'))) ||
    (complaintCategory.includes('housekeeping') && workerSkill.includes('sanitation'))
  ) {
    skillScore = 20; // Direct trade match
  }

  // 4. Performance Rating (Max 10 points)
  const rating = worker.rating || 4.0;
  const ratingScore = Math.round((rating / 5.0) * 10);

  // Total Assignment Score
  const totalScore = availabilityScore + workloadScore + skillScore + ratingScore;

  return {
    workerId: worker.id,
    workerName: worker.name,
    department: worker.department,
    totalScore,
    breakdown: {
      availability: availabilityScore,
      workload: workloadScore,
      skillMatch: skillScore,
      rating: ratingScore,
    },
    workloadPercentage: Math.round(((totalShiftHours - availableHours) / totalShiftHours) * 100),
    explanation: `${worker.name} scored ${totalScore}/100 (Capacity: ${availabilityScore}/40, Load: ${workloadScore}/30, Skill: ${skillScore}/20, Rating: ${ratingScore}/10).`,
  };
}

/**
 * Finds and ranks the best worker for a given complaint from a pool of workers.
 * @param {Array} workersList 
 * @param {Object} complaint 
 * @returns {Object} { bestWorker, rankedCandidates }
 */
export function assignBestWorker(workersList = [], complaint) {
  // 1. Filter workers by the complaint's department
  const eligibleWorkers = workersList.filter(
    (w) => w.department.toLowerCase() === (complaint.department || '').toLowerCase()
  );

  // If no direct department match, consider all workers
  const candidatePool = eligibleWorkers.length > 0 ? eligibleWorkers : workersList;

  // 2. Score every candidate
  const rankedCandidates = candidatePool.map((worker) => {
    const scoreData = calculateWorkerAssignmentScore(worker, complaint);
    return {
      worker,
      ...scoreData,
    };
  });

  // 3. Sort by totalScore in descending order
  rankedCandidates.sort((a, b) => b.totalScore - a.totalScore);

  return {
    bestCandidate: rankedCandidates[0] || null,
    rankedCandidates,
  };
}
