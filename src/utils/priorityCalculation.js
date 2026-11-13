/**
 * Priority Calculation System (Step 9)
 * 
 * Simple, explainable algorithm to determine complaint urgency.
 * Evaluates:
 * 1. Issue Severity & Hazard (Sparking, Gas, Water Leakage vs Aesthetic)
 * 2. Location Impact (Common area / Corridor / Washroom vs Private room)
 * 3. Scope of People Affected (Single person vs Entire wing/floor)
 */

export function calculatePriorityScore({
  category = '',
  description = '',
  location = '',
  peopleAffected = 1,
}) {
  let score = 0;
  const text = `${category} ${description} ${location}`.toLowerCase();

  // 1. Safety & Hazard keywords (+40 to +50 points)
  if (text.includes('spark') || text.includes('fire') || text.includes('shock') || text.includes('smoke') || text.includes('short circuit')) {
    score += 50;
  } else if (text.includes('leak') || text.includes('burst') || text.includes('flood') || text.includes('water log')) {
    score += 35;
  } else if (text.includes('lock') || text.includes('stuck') || text.includes('trapped')) {
    score += 30;
  } else if (text.includes('broken') || text.includes('flicker') || text.includes('noise')) {
    score += 20;
  } else {
    score += 10;
  }

  // 2. Location Impact (+10 to +30 points)
  if (text.includes('corridor') || text.includes('staircase') || text.includes('mess') || text.includes('water cooler') || text.includes('common washroom')) {
    score += 30; // High traffic public area
  } else if (text.includes('floor') || text.includes('wing') || text.includes('reading room')) {
    score += 20;
  } else {
    score += 10; // Private room
  }

  // 3. Number of People Affected (+5 to +20 points)
  if (peopleAffected >= 20 || text.includes('entire floor') || text.includes('all students')) {
    score += 20;
  } else if (peopleAffected >= 5) {
    score += 10;
  } else {
    score += 5;
  }

  // Final Priority Mapping
  // Score 0 - 35   -> Low
  // Score 36 - 60  -> Medium
  // Score 61 - 80  -> High
  // Score 81 - 100 -> Critical
  let priority = 'Medium';
  if (score >= 80) {
    priority = 'Critical';
  } else if (score >= 60) {
    priority = 'High';
  } else if (score >= 35) {
    priority = 'Medium';
  } else {
    priority = 'Low';
  }

  return {
    score,
    priority,
    rationale: `Computed priority "${priority}" (Score: ${score}/100) based on hazard evaluation and location impact.`,
  };
}
