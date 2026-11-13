/**
 * Department Routing Utility
 * Pure JavaScript logic connecting complaint categories to campus maintenance departments.
 * Keeps logic simple, readable, and centralized.
 */

// 1. Direct Category-to-Department Mapping Dictionary
export const CATEGORY_DEPARTMENT_MAP = {
  // Electrical
  'Electrical': 'Electrical',
  'Fan Problem': 'Electrical',
  'Tube Light / Lighting': 'Electrical',
  'Switchboard / Socket': 'Electrical',
  'Power Cut / MCB Trip': 'Electrical',

  // Plumbing
  'Plumbing': 'Plumbing',
  'Water Leakage': 'Plumbing',
  'Washbasin / Tap Issue': 'Plumbing',
  'Drainage Blockage': 'Plumbing',
  'Flush Tank Fault': 'Plumbing',

  // IT & Networking
  'IT & Wi-Fi': 'IT',
  'Wi-Fi Router Issue': 'IT',
  'LAN Port Damaged': 'IT',
  'Slow Internet Speed': 'IT',

  // Civil Maintenance & Carpentry
  'Civil Maintenance': 'Civil',
  'Door Lock / Handle': 'Civil',
  'Window Latch / Glass': 'Civil',
  'Bed / Study Table Furniture': 'Civil',
  'Wall Dampness / Plaster': 'Civil',

  // Housekeeping & Sanitation
  'Housekeeping': 'Housekeeping',
  'Room Cleaning Request': 'Housekeeping',
  'Washroom Sanitation': 'Housekeeping',
  'Garbage Disposal': 'Housekeeping',

  // Security
  'Security': 'Security',
  'Lost Key / Lockout': 'Security',
  'ID Card / Gate Access': 'Security',
};

// 2. Department Profiles (In-Charges, Office, Default Turnaround)
export const DEPARTMENT_DETAILS = {
  'Electrical': {
    name: 'Electrical Maintenance',
    code: 'ELEC',
    inCharge: 'Prof. H. R. Mehta',
    officeLocation: 'Substation Building, Ground Floor',
    contactNumber: '+91 98765-43210',
    defaultSlaHours: 8,
    color: '#2563eb', // Blue
  },
  'Plumbing': {
    name: 'Plumbing & Water Supply',
    code: 'PLUMB',
    inCharge: 'Er. S. K. Bansal',
    officeLocation: 'Water Treatment Plant Wing',
    contactNumber: '+91 98765-43211',
    defaultSlaHours: 6,
    color: '#0284c7', // Sky Blue
  },
  'IT': {
    name: 'Campus IT & Network Cell',
    code: 'IT-CELL',
    inCharge: 'Dr. Neha Saxena',
    officeLocation: 'Computer Centre, 1st Floor',
    contactNumber: '+91 98765-43212',
    defaultSlaHours: 4,
    color: '#7c3aed', // Purple
  },
  'Civil': {
    name: 'Civil Works & Carpentry',
    code: 'CIVIL',
    inCharge: 'Er. Rajesh Gupta',
    officeLocation: 'Estate Maintenance Yard',
    contactNumber: '+91 98765-43213',
    defaultSlaHours: 24,
    color: '#b45309', // Amber
  },
  'Housekeeping': {
    name: 'Housekeeping & Sanitation',
    code: 'HKEEP',
    inCharge: 'Mr. Arvind Swamy',
    officeLocation: 'Hostel Admin Block',
    contactNumber: '+91 98765-43214',
    defaultSlaHours: 4,
    color: '#16a34a', // Green
  },
  'Security': {
    name: 'Campus Security & Gate Control',
    code: 'SEC',
    inCharge: 'Capt. R. S. Rathore',
    officeLocation: 'Main Security Gate',
    contactNumber: '+91 98765-43215',
    defaultSlaHours: 2,
    color: '#dc2626', // Red
  },
};

/**
 * Routes a category string to its managing department.
 * @param {string} category 
 * @returns {string} Department name (e.g. "Electrical", "Plumbing", "IT")
 */
export function routeCategoryToDepartment(category) {
  if (!category) return 'General Maintenance';
  return CATEGORY_DEPARTMENT_MAP[category] || 'General Maintenance';
}

/**
 * Calculates estimated resolution SLA based on category and urgency priority.
 * @param {string} category 
 * @param {string} priority ('Low' | 'Medium' | 'High' | 'Critical')
 * @returns {string} Human-friendly expected resolution timeframe
 */
export function calculateExpectedResolution(category, priority = 'Medium') {
  const department = routeCategoryToDepartment(category);
  const deptInfo = DEPARTMENT_DETAILS[department];
  const baseHours = deptInfo ? deptInfo.defaultSlaHours : 12;

  // Adjust hours based on priority
  let adjustedHours = baseHours;
  if (priority === 'Critical') {
    adjustedHours = Math.max(2, Math.floor(baseHours * 0.25)); // 4x faster for emergencies
  } else if (priority === 'High') {
    adjustedHours = Math.max(3, Math.floor(baseHours * 0.5));  // 2x faster for high priority
  } else if (priority === 'Low') {
    adjustedHours = baseHours * 1.5;                           // Relaxed for low priority
  }

  if (adjustedHours <= 4) {
    return `Within ${adjustedHours} hours (Fast-track)`;
  } else if (adjustedHours <= 24) {
    return `Within ${adjustedHours} hours (Same/Next Day)`;
  } else {
    const days = Math.ceil(adjustedHours / 24);
    return `Within ${days} business days`;
  }
}
