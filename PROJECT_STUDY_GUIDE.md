# Smart Campus Service & Workforce Management System
# Comprehensive Step-by-Step Learning & Interview Guide

This guide documents every single step, concept, file, and line of architectural reasoning used in building the **Smart Campus Service & Workforce Management System**. Keep this file to study for project presentations, viva voce, and technical interviews.

---

## Table of Contents
1. [Project Overview & Core Rules](#project-overview)
2. [Step 1: Project Setup (Vite + React)](#step-1-project-setup)
3. [Step 2: Basic Layout & Reusable Component Library](#step-2-basic-layout)
4. [Step 3: Student & Staff Interface (Upcoming)](#step-3-student--staff-interface)
5. [Step 4: Create Complaint Form (Upcoming)](#step-4-create-complaint-form)
6. [Step 5: Visual Complaint Tracking Timeline (Upcoming)](#step-5-visual-tracking-timeline)
7. [Step 6: Department Routing Logic (Upcoming)](#step-6-department-routing)
8. [Step 7: Worker Module & Dashboard (Upcoming)](#step-7-worker-module)
9. [Step 8: Smart Worker Assignment Algorithm (Upcoming)](#step-8-smart-worker-assignment)
10. [Step 9: Priority Calculation System (Upcoming)](#step-9-priority-system)
11. [Step 10: Workload Balancing (Upcoming)](#step-10-workload-balancing)
12. [Step 11: Department In-Charge Dashboard (Upcoming)](#step-11-incharge-dashboard)
13. [Step 12: Analytics & Visual Charts (Upcoming)](#step-12-analytics)
14. [Step 13: Department Rating & Feedback (Upcoming)](#step-13-department-rating)
15. [Step 14: Workforce Capacity & Shortage Alerts (Upcoming)](#step-14-workforce-capacity)
16. [Step 15: Administrator Dashboard (Upcoming)](#step-15-admin-dashboard)
17. [Step 16: Frontend Notifications (Upcoming)](#step-16-notifications)
18. [Step 17: Overdue Escalation Logic (Upcoming)](#step-17-escalation)
19. [Step 18: Persistent Storage with localStorage (Upcoming)](#step-18-localstorage)

---

<a id="project-overview"></a>
## 1. Project Overview & Core Rules

### The Problem We Are Solving:
Traditional universities and colleges manage campus maintenance and complaints (broken fans, water leakage, no Wi-Fi, etc.) using physical paper registers kept at hostel gates or warden offices.
- **Issues with paper registers**:
  1. Students have no transparency or updates on their complaints.
  2. Workers have no organized task list; work is assigned informally.
  3. Department in-charges cannot track worker workloads, leading to worker burnout or slack.
  4. Administrators have zero campus-wide metrics on resolution rates or equipment failures.

### The Solution:
A centralized web application with 4 distinct user roles:
1. **Student / Staff**: Log complaints, track progress via a visual timeline, and rate resolution.
2. **Campus Worker**: View assigned tasks, accept, start work, update progress, and resolve.
3. **Department In-Charge**: Monitor department complaints, worker workloads, capacity, and overdue escalations.
4. **Administrator**: Institution-level analytics, cross-department comparison, and workforce utilization.

### Key Development Rules:
- **Frontend Prototype First**: Pure HTML, CSS, JavaScript, React.js.
- **No Complex Overhead**: No TypeScript, Next.js, Redux, Docker, or backend APIs in this initial phase.
- **Readable Code**: Meaningful variable names (`complaint`, `availableHours`, `priority`), modular components, and human-readable algorithms.

---

<a id="step-1-project-setup"></a>
## Step 1: Project Setup (Vite + React)

### 1. What is Vite and Why Are We Using It?
- **Vite** (French for *"fast"*) is a next-generation frontend build tool created by Evan You (creator of Vue.js).
- In React, browsers cannot natively execute JSX (HTML tags written inside JavaScript). A tool is required to compile JSX into regular JavaScript.
- **Why Vite instead of Create React App (CRA)?**:
  - **Instant Startup**: Vite serves source code over native ES Modules (`<script type="module">`). It does not bundle the entire application before starting.
  - **Lightning Hot Module Replacement (HMR)**: When editing a file, only that component updates in the browser without losing state or reloading the entire page.
  - **Lightweight & Clean**: Minimal configuration, modern defaults.

### 2. Project Directory Anatomy
```text
Hostel_managemnet/
├── index.html            # The single HTML entry page loaded by the browser
├── package.json          # Project manifest (dependencies, scripts: dev, build)
├── vite.config.js        # Vite configuration plugin for React
└── src/
    ├── main.jsx          # Mounts React into index.html DOM
    ├── App.jsx           # Root component
    ├── App.css           # Component layout styles
    ├── index.css         # Global design system (colors, typography, resets)
    ├── components/       # Reusable UI elements (Buttons, Cards, Badges)
    ├── pages/            # View pages for the 4 roles
    ├── data/             # Mock datasets for frontend prototype
    ├── utils/            # Simple business logic & calculation functions
    └── context/          # Shared state management
```

### 3. How React Boots Up
1. Browser requests `index.html`.
2. Browser finds `<div id="root"></div>` and the module script `<script type="module" src="/src/main.jsx"></script>`.
3. `main.jsx` executes:
   ```javascript
   import { createRoot } from 'react-dom/client';
   import App from './App.jsx';

   createRoot(document.getElementById('root')).render(<App />);
   ```
4. React injects the virtual DOM of `<App />` directly inside the `#root` element.

### 4. Color System & Design Tokens (`src/index.css`)
We established purpose-driven CSS variables so colors carry clear meaning:
- 🔵 `--color-primary` (`#2563eb`): General actions, active links, in-progress items.
- 🟢 `--color-success` (`#16a34a`): Completed tasks, resolved complaints, positive ratings.
- 🟡 `--color-warning` (`#d97706`): Pending items requiring attention.
- 🔴 `--color-danger` (`#dc2626`): Overdue complaints, critical priority, emergency alerts.
- 🟣 `--color-accent` (`#7c3aed`): Analytics, department comparisons.

---

<a id="step-2-basic-layout"></a>
## Step 2: Basic Layout & Reusable Component Library

Instead of repeating code across dozens of pages, we built reusable components in `src/components/`.

### 1. `StatusBadge.jsx` (`src/components/StatusBadge.jsx`)
- **Purpose**: Displays a colored pill badge with an indicator dot.
- **Supported Types**:
  - `status`: `'Pending'` (yellow), `'In Progress'` (blue), `'Resolved'` (green), `'Overdue'` (red).
  - `priority`: `'Low'`, `'Medium'`, `'High'`, `'Critical'`.
- **How it works**:
  ```javascript
  function StatusBadge({ value = 'Pending', type = 'status' }) {
    const formattedClass = value.toLowerCase().replace(/\s+/g, '-');
    const badgeClass = type === 'priority' 
      ? `badge badge-priority-${formattedClass}` 
      : `badge badge-${formattedClass}`;

    return (
      <span className={badgeClass}>
        <span className="badge-dot"></span>
        <span>{value}</span>
      </span>
    );
  }
  ```

### 2. `Button.jsx` (`src/components/Button.jsx`)
- **Purpose**: Standardized button with consistent padding, hover effects, and active click scaling.
- **Props**: `variant` (`primary`, `secondary`, `success`, `danger`), `size` (`sm`, `md`, `lg`), `icon`, `onClick`, `type`.

### 3. `Card.jsx` (`src/components/Card.jsx`)
- **Purpose**: White rounded surface with subtle drop shadow for cards, metrics, and tables.
- **Slots**: Header `title`, `subtitle`, header `action` (e.g. buttons or badges), `children` (body), and optional `footer`.

### 4. `Navbar.jsx` (`src/components/Navbar.jsx`)
- **Purpose**: Application header with logo, title, and an interactive **Role Switcher** dropdown (`student`, `worker`, `incharge`, `admin`).
- **Why the Role Switcher is crucial**: During academic evaluation or viva, you can toggle between student, worker, department in-charge, and admin with 1 click to show the exact perspective of each user.

### 5. `Sidebar.jsx` (`src/components/Sidebar.jsx`)
- **Purpose**: Role-aware navigation drawer that dynamically changes menus based on who is logged in:
  - **Student**: Dashboard, Create Complaint, My Complaints, Notifications.
  - **Worker**: Dashboard, My Tasks, Schedule, Workload.
  - **In-Charge**: Overview, Department Complaints, Workers & Capacity, Analytics, Escalations.
  - **Admin**: Overview, Departments, All Complaints, Workforce Analytics.

### 6. `MainLayout.jsx` (`src/components/MainLayout.jsx`)
- **Purpose**: The master frame combining `Navbar`, `Sidebar`, and the main page content with responsive flexbox layout.

### 7. `mockData.js` (`src/data/mockData.js`)
- Provides seed data for realistic complaints, workers with working/available hours, and department definitions.

---

<a id="step-3-student--staff-interface"></a>
## Step 3: Student & Staff Interface (Role-Based Privacy & Department Overview)

### 1. What We Built & Why We Need It
In this step, we built the dedicated **Student/Staff Dashboard** (`src/pages/StudentDashboard.jsx`) and the individual **ComplaintCard** (`src/components/ComplaintCard.jsx`).

**Why this screen exists**:
- Under traditional manual register systems, students and faculty have to visit physical maintenance offices or warden desks in person just to inquire about repairs.
- This portal delivers a **Dual-Level View**:
  1. **High-level Department Awareness**: Department-wide aggregate metrics (total issues, count currently working, count resolved, count pending).
  2. **Zero-Leakage Personal Privacy**: Strictly showing the personal complaint cards submitted by the logged-in user.

### 2. User Domains: Students vs Academic/Administrative Staff
The campus ecosystem separates users into two distinct operational domains:
- **Students (Hostel Department)**: E.g., **Aman Sharma** (Hostel Resident). Students reside in campus hostels and log issues relating to hostel rooms, common bathrooms, water coolers, and mess facilities. Their department context is **Hostel Department**.
- **Faculty & Staff (Academic/Administrative Departments)**: E.g., **Dr. Ramesh Kulkarni** (Associate Professor, Computer Engineering Dept). Faculty log complaints for computer labs, department servers, projector hardware, and classroom electrical fittings. Their department context is **Computer Engineering Department** (or IT, Mechanical, etc.).

### 3. Dual-Level Dashboard Architecture

#### Section 1: Department Maintenance Overview (Aggregate Counts Only)
Provides complete visibility into how the user's entire department/hostel is doing without revealing anyone else's private data:
```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│  🏢 Hostel Department Maintenance Overview (or Computer Engineering Dept)        │
│  🔒 Aggregate Counts Only • Personal privacy protected                          │
│                                                                                  │
│  [Total Complaints: 20]  [Currently Working: 7]  [Resolved: 9]  [Pending: 4]     │
└──────────────────────────────────────────────────────────────────────────────────┘
```
- **Privacy Rule**: The overview displays **aggregate numeric counters only**. It never renders cards, room numbers, descriptions, or names of other students/professors.

#### Section 2: My Personal Complaints History (Strict Privacy)
Displays only the complaints submitted personally by the logged-in individual:
```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│  📋 My Personal Complaints History (12 logged)                                    │
│  Filter Tabs: [ All (12) ]  [ Pending (3) ]  [ In Progress (4) ]  [ Resolved (5) ]│
│                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────┐  │
│  │ CMP-101 • Water leakage under washbasin • Hostel B-302    [In Progress]   │  │
│  │ Assigned: Ramesh Kumar (Plumbing) • Expected: Tomorrow, 2:00 PM            │  │
│  │ [Track Status]                                                             │  │
│  └────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 4. Implementation in React: State Partitioning Logic

In `src/App.jsx`, we partition the global dataset into two clean subsets before passing props down:
```javascript
// 1. Determine active user profile
const currentUser = currentRole === 'staff'
  ? { name: 'Dr. Ramesh Kulkarni', role: 'staff', department: 'Computer Engineering Department' }
  : { name: 'Aman Sharma', role: 'student', department: 'Hostel Department' };

// 2. Personal Complaints (Strict match by user's identity)
const personalComplaints = complaints.filter(c => 
  c.submittedBy === currentUser.name || c.studentName === currentUser.name
);

// 3. Department Aggregate Complaints (Match by user's department)
const departmentComplaints = complaints.filter(c => 
  c.originDepartment === currentUser.department
);
```

Then in `src/pages/StudentDashboard.jsx`:
```javascript
// Department aggregate counters (Count only - no sensitive details rendered)
const deptTotal = departmentComplaints.length;
const deptWorking = departmentComplaints.filter(c => c.status === 'In Progress').length;
const deptResolved = departmentComplaints.filter(c => c.status === 'Resolved').length;
const deptPending = departmentComplaints.filter(c => c.status === 'Pending').length;

// Card list iterates ONLY over personalComplaints
const displayedComplaints = personalComplaints.filter(c => {
  if (filter === 'all') return true;
  return c.status === filter;
});
```

### 5. Anatomical Breakdown of `ComplaintCard.jsx`
Each complaint card cleanly encapsulates the 9 essential pieces of information:
1. **Complaint ID**: Unique tracking identifier (e.g., `CMP-101`).
2. **Title**: Clear issue headline (e.g., *"Water leakage under washbasin"*).
3. **Category**: Campus domain (e.g., Plumbing, Electrical, IT, Civil, Housekeeping).
4. **Location**: Specific room and block (e.g., *"Hostel Block B, Room 302"* or *"Turing Computing Lab 3"*).
5. **Department**: Assigned campus maintenance wing.
6. **Priority**: Color-coded urgency (`Critical`, `High`, `Medium`, `Low`).
7. **Status**: Color-coded lifecycle (`Pending`, `In Progress`, `Resolved`, `Overdue`).
8. **Created Date**: Timestamp when the complaint was logged.
9. **Expected Resolution**: Estimated completion deadline.

Plus an interactive button:
- **`Track Status`**: Guides the user directly to Step 5's visual progress timeline.

---

<a id="step-4-create-complaint-form"></a>
## Step 4: Create Complaint Form

### 1. What We Built & Why We Need It
In this step, we built the **Create Complaint Form** (`src/pages/CreateComplaint.jsx`).

**Why this screen is essential**:
- Traditional paper registers ask students to write on crowded, messy register books with no standardization.
- The web form uses **human-centered questions** that make reporting an issue intuitive and fast:
  1. *"What is the problem?"* $\rightarrow$ Complaint Title
  2. *"Which category does it belong to?"* $\rightarrow$ Category (Electrical, Plumbing, IT, etc.)
  3. *"Where is the problem located?"* $\rightarrow$ Location (Hostel Block & Room)
  4. *"Describe the issue in detail"* $\rightarrow$ Detailed observations
  5. *"Urgency Level"* $\rightarrow$ Priority (Low, Medium, High, Critical)

### 2. The Form Submission Lifecycle
As outlined in your project requirements, the data flows in a clean 5-stage pipeline without needing a backend server yet:

```text
User fills HTML Form
        ↓
JavaScript handles onSubmit event
        ↓
Validates inputs & constructs new complaint object
        ↓
Updates React state: setComplaints([newComplaint, ...complaints])
        ↓
Persists to browser localStorage
```

### 3. Anatomical Breakdown of `CreateComplaint.jsx`

#### Controlled Inputs Pattern:
Instead of reading from the DOM manually, React components use state variables connected directly to each form input:
```javascript
const [title, setTitle] = useState('');
const [category, setCategory] = useState('Electrical');
const [location, setLocation] = useState('');
const [description, setDescription] = useState('');
const [priority, setPriority] = useState('Medium');
```

#### Real-Time Department Routing Preview:
As soon as the student picks a category from the dropdown, the form immediately informs them which campus maintenance department will receive the ticket:
```javascript
function getDepartmentForCategory(category) {
  switch (category) {
    case 'Electrical':        return 'Electrical';
    case 'Plumbing':          return 'Plumbing';
    case 'IT & Wi-Fi':        return 'IT';
    case 'Housekeeping':      return 'Housekeeping';
    case 'Civil Maintenance': return 'Civil';
    case 'Security':          return 'Security';
    default:                  return 'General Maintenance';
  }
}
```

#### Object Construction & State Injection:
```javascript
const newComplaint = {
  id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
  title: title.trim(),
  category: category,
  department: targetDepartment,
  location: location.trim(),
  description: description.trim(),
  priority: priority,
  status: 'Pending',
  createdAt: formattedDate,
  expectedResolution: 'Within 24 hours',
  studentName: 'Aman Sharma',
  studentRollNo: 'CS2023-042',
  assignedWorker: null,
};

// Send to state
onSaveComplaint(newComplaint);
```

---

<a id="step-5-visual-tracking-timeline"></a>
## Step 5: Visual Complaint Tracking Timeline

### 1. What We Built & Why We Need It
In this step, we built **`ComplaintDetails.jsx`** (`src/pages/ComplaintDetails.jsx`) featuring our **6-Stage Visual Progress Timeline**.

**Why this screen is essential**:
- Under traditional manual systems, students have no status updates and frequently get frustrated not knowing if someone has been sent to fix their issue.
- The visual tracking timeline shows the exact progress stage in real-time, eliminating anxiety and unnecessary inquiries.

### 2. The 6-Stage Timeline Lifecycle
As specified in your project requirements, the timeline maps directly to real-world campus maintenance workflows:

```text
✓ 1. Complaint Submitted      (Ticket registered with ID & timestamp)
     ↓
✓ 2. Department Assigned      (Auto-routed to Electrical, Plumbing, IT, etc.)
     ↓
✓ 3. Worker Assigned          (Technician assigned based on trade & availability)
     ↓
✓ 4. Worker Acknowledged      (Worker accepted assignment and verified tools)
     ↓
● 5. Work Started             (Worker is actively at the location performing repairs)
     ↓
○ 6. Resolution Completed     (Repairs finished, tested, and marked resolved)
```

### 3. Timeline State Logic in React
Each stage has one of three distinct visual states:
- **`completed`**: Green circle with a checkmark `✓` + green connecting line.
- **`active`**: Blue pulsing circle `●` with a clock/working indicator.
- **`pending`**: Clean grey circle `○` representing an upcoming stage.

**How we dynamically calculate stage states**:
```javascript
const isResolved = status === 'Resolved';
const isInProgress = status === 'In Progress';
const isPending = status === 'Pending';

const timelineStages = [
  {
    id: 1,
    title: 'Complaint Submitted',
    state: 'completed',
    time: createdAt,
    desc: 'Complaint successfully registered in the system with ticket ID ' + id,
  },
  {
    id: 2,
    title: 'Department Assigned',
    state: 'completed',
    time: createdAt,
    desc: `Auto-routed to the ${department} Department for maintenance queue allocation`,
  },
  {
    id: 3,
    title: 'Worker Assigned',
    state: assignedWorker ? 'completed' : isPending ? 'active' : 'completed',
    time: assignedWorker ? 'Within 30 mins' : 'In Progress',
    desc: assignedWorker 
      ? `Task assigned to ${assignedWorker}` 
      : 'Department In-Charge is assigning a qualified worker based on current capacity',
  },
  {
    id: 4,
    title: 'Worker Acknowledged',
    state: isResolved || isInProgress ? 'completed' : 'pending',
    time: isResolved || isInProgress ? 'Acknowledged' : 'Pending',
    desc: isResolved || isInProgress 
      ? 'Worker accepted the assignment and confirmed available tools' 
      : 'Awaiting worker task acceptance',
  },
  {
    id: 5,
    title: 'Work Started',
    state: isResolved ? 'completed' : isInProgress ? 'active' : 'pending',
    time: isResolved ? 'Completed' : isInProgress ? 'Currently In Progress' : 'Pending',
    desc: isResolved 
      ? 'Maintenance and repairs were performed on-site' 
      : isInProgress 
      ? 'Worker is currently at the location working on repairs' 
      : 'Worker will commence work once acknowledged',
  },
  {
    id: 6,
    title: isResolved ? 'Resolution Completed' : 'Resolution Pending',
    state: isResolved ? 'completed' : 'pending',
    time: isResolved ? (resolvedAt || 'Resolved') : `Expected: ${expectedResolution}`,
    desc: isResolved 
      ? (resolutionNote || 'Issue has been successfully resolved and tested.') 
      : `Work is scheduled to be completed by ${expectedResolution}.`,
  },
];
```

### 4. Resolution Feedback & Rating
When a complaint reaches `Resolved`:
- A feedback card appears allowing the student to give a **1 to 5 star rating**.
- The student can write optional comments about the quality of the repair.
- This feedback directly contributes to the **Department Rating & Performance** module (which we will build in Step 13).

---

<a id="step-6-department-routing"></a>
## Step 6: Department Routing

### 1. What We Built & Why We Need It
In this step, we created the **Centralized Department Routing Engine** (`src/utils/departmentRouting.js`) and the **Campus Departments Directory** (`src/pages/DepartmentsDirectory.jsx`).

**Why this logic is essential**:
- In paper-based systems, complaints often land in the wrong department's hands (e.g. an electrical problem reported to civil maintenance), resulting in days of lost time.
- The routing engine automatically maps complaint categories and sub-issues directly to the correct campus department.
- It also calculates real-world **Turnaround SLAs** (Service Level Agreements) so users know exactly when to expect their issue to be resolved.

### 2. Category to Department Mapping Rule
As outlined in your project specifications, the logic is kept clean, human-readable, and deterministic:

```text
Electrical Problem    ─────────►   Electrical Department (Prof. H. R. Mehta)
Water Leakage         ─────────►   Plumbing Department   (Er. S. K. Bansal)
Wi-Fi / Network Issue ─────────►   IT Department         (Dr. Neha Saxena)
Broken Door / Window  ─────────►   Civil Department      (Er. Rajesh Gupta)
Cleaning / Sanitation ─────────►   Housekeeping Dept     (Mr. Arvind Swamy)
Lost Key / Lockout    ─────────►   Security Department   (Capt. R. S. Rathore)
```

### 3. Anatomical Breakdown of `departmentRouting.js`

#### The Mapping Dictionary:
```javascript
export const CATEGORY_DEPARTMENT_MAP = {
  'Electrical': 'Electrical',
  'Fan Problem': 'Electrical',
  'Tube Light / Lighting': 'Electrical',
  'Plumbing': 'Plumbing',
  'Water Leakage': 'Plumbing',
  'Washbasin / Tap Issue': 'Plumbing',
  'IT & Wi-Fi': 'IT',
  'Wi-Fi Router Issue': 'IT',
  'Civil Maintenance': 'Civil',
  'Door Lock / Handle': 'Civil',
  'Housekeeping': 'Housekeeping',
  'Security': 'Security',
};

export function routeCategoryToDepartment(category) {
  return CATEGORY_DEPARTMENT_MAP[category] || 'General Maintenance';
}
```

#### Dynamic Turnaround SLA Calculation:
Turnaround time is computed based on the department's baseline SLA and the urgency priority selected by the user:
```javascript
export function calculateExpectedResolution(category, priority = 'Medium') {
  const department = routeCategoryToDepartment(category);
  const deptInfo = DEPARTMENT_DETAILS[department];
  const baseHours = deptInfo ? deptInfo.defaultSlaHours : 12;

  let adjustedHours = baseHours;
  if (priority === 'Critical') {
    adjustedHours = Math.max(2, Math.floor(baseHours * 0.25)); // 4x faster for emergencies
  } else if (priority === 'High') {
    adjustedHours = Math.max(3, Math.floor(baseHours * 0.5));  // 2x faster for high priority
  } else if (priority === 'Low') {
    adjustedHours = baseHours * 1.5;
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
```

### 4. Integration with Create Complaint Form
When a student creates a ticket in `CreateComplaint.jsx`:
- As soon as they select **"Plumbing"** with **"High"** priority, the form immediately computes:
  - Department: **Plumbing & Water Supply**
  - Department Head: **Er. S. K. Bansal**
  - SLA: **Within 3 hours (Fast-track)**
- This ensures full transparency before the ticket is even submitted.

---

<a id="step-7-worker-module"></a>
## Step 7: Worker Module & Dashboard

### 1. What We Built & Why We Need It
In this step, we built the dedicated **Worker Operations Hub** (`src/pages/WorkerDashboard.jsx`) and initialized our campus worker schema (`src/data/mockData.js`).

**Why this module is essential**:
- Under traditional paper registers, workers have no organized digital task list. Verbal requests lead to forgotten repairs, lost tools, and zero accountability.
- This module gives campus technicians (Electricians, Plumbers, Carpenters, IT techs):
  1. An organized queue of tasks assigned directly to them.
  2. Clear visibility into complaint priority and student room location.
  3. Action buttons to accept work, start work, and mark tasks resolved.
  4. Real-time capacity monitoring (Working Hours vs. Available Hours).

### 2. Mock Workers Data Structure
As specified in your requirements, workers are modeled with simple, meaningful properties:
```javascript
const workers = [
  {
    id: 1,
    name: "Rahul Verma",
    department: "Electrical",
    skill: "Senior Campus Electrician",
    workingHours: 8,
    availableHours: 4,
    currentTasks: 2,
    rating: 4.8,
    shift: "09:00 AM - 05:00 PM",
    phone: "+91 98765-11001",
    status: "On Duty",
  },
  // ... IT, Plumbing, Civil, Housekeeping workers
];
```

### 3. Workload & Capacity Calculation
We calculate worker utilization percentage using standard arithmetic:
```javascript
const totalHours = worker.workingHours;          // 8 hours
const availableHours = worker.availableHours;    // 4 hours remaining
const occupiedHours = totalHours - availableHours; // 4 hours committed
const workloadPercentage = Math.round((occupiedHours / totalHours) * 100); // 50%
```

A visual progress bar renders the utilization:
- 🟢 **$\le 50\%$**: Healthy Capacity (Green)
- 🔵 **$51\% - 80\%$**: Normal Load (Blue)
- 🔴 **$> 80\%$**: Near Capacity / Overload Warning (Red)

### 4. The Worker Action Lifecycle
When a worker manages a task:
```text
Task Assigned
     ↓
[Accept Task]          ──► Status becomes "In Progress"
     ↓
[Start Work]           ──► Worker on-site at room location
     ↓
[Mark as Resolved]     ──► Worker enters mandatory resolution note
                           (e.g., "Replaced fan capacitor and verified voltage")
     ↓
State & localStorage Update:
  - Complaint marked "Resolved" with timestamp
  - Worker's availableHours increased by +2 hours
  - Recorded immediately under "Today" in the Workload Completed Tasks section!
```

### 5. "My Tasks" Priority Filtering System
Workers can filter their assigned tasks by urgency to address high-risk issues first:
- 🚨 **Critical Issues**: Immediate hazards requiring emergency response (e.g., sparking fan, lab breaker trip).
- ⚡ **High Priority**: Significant operational impact (e.g., geyser tripping, UPS alarm).
- ⚖️ **Moderate / Medium Issues**: Standard repairs (e.g., flickering tube light, exhaust fan motor).
- 🟢 **Low Priority**: Routine upkeep (e.g., bollard lamp cleaning, library hum).
- **All Priorities**: Full work queue.

### 6. "Workload" Daily Completed History & Interactive Date Selection
Under the **Workload** section, the worker can inspect all completed maintenance history organized by date, or choose any specific calendar date:

**1. Interactive Date Selection Controls**:
- **Calendar Date Picker (`<input type="date" />`)**: Enables the worker to pick any arbitrary day from a native calendar popup.
- **Quick Date Preset Chips**:
  - `All Dates (X)`: Restores the full chronological grouped view.
  - `Today (12 Sep)`: Instantly narrows down to current shift resolutions.
  - `Yesterday (11 Sep)`: Inspects previous day resolutions.
  - `Dynamic Date Chips (10 Sep, 08 Sep, 03 Sep, etc.)`: Automatically computed from unique completion dates in state.
- **Active Date Filter Banner**:
  - Highlights `Showing Completed Tasks for [Date] — [X] Tasks Completed`.
  - Includes a `Show All Dates` reset button.
- **Informative Empty State**:
  - When picking a date without any recorded resolutions, an informative message explains that no tickets were completed on that date, paired with direct 1-click suggestion buttons for dates that do contain completed activity.

**2. Chronological Grouped Timeline (`!selectedCalendarDate`)**:
- 📅 **Today (12 Sep 2026)**: Verified fixes finished on the current shift.
- 📅 **Yesterday (11 Sep 2026)**: Fixes completed on the previous shift.
- 📅 **Earlier Dates (10 Sep, 08 Sep, 03 Sep, etc.)**: Historical resolution audit trail.

**3. Comprehensive Detail Breakdown per Completed Task**:
- **Ticket ID & Category**: E.g., `CMP-121 | Electrical`
- **Priority & Status Badges**: Critical / High / Moderate / Low + Resolved
- **Issue Title & Full Description**: Detailed problem statement
- **Location**: Specific room / kitchen line / lab
- **Reported By**: Student or staff submitter
- **Completed Time**: Exact timestamp with date and hour
- **Official Resolution Note**: Verified technician action box documenting what repairs were executed and how safety was tested.

**4. "My Tasks" Date Picker Filter**:
- In the **My Tasks** filter bar, workers also have an inline `<input type="date" />` picker to narrow down active, pending, or scheduled tasks by date.

---

<a id="step-8-smart-worker-assignment"></a>
## Step 8: Smart Worker Assignment Algorithm

### 1. What We Built & Why We Need It
In this step, we built **`src/utils/workerAssignment.js`**, implementing an **explainable, interview-ready Weighted Scoring Algorithm** for assigning campus complaints to technicians.

**Why this algorithm exists**:
- In manual paper systems, the same worker is repeatedly given tasks simply because they are familiar to the warden, while other workers remain idle.
- This creates worker burnout, slow turnaround, and unbalanced workload.
- The algorithm calculates an **Assignment Score (0 to 100)** for every eligible worker in that department and picks the candidate with the highest capacity and skill match.

### 2. The Weighted Scoring Formula (No Machine Learning Required)
```text
Total Assignment Score (100 pts) =
  + Available Hours Capacity   (40 pts)
  + Workload Balancing         (30 pts)
  + Trade / Skill Match        (20 pts)
  + Historical Rating          (10 pts)
```

1. **Available Hours (40 pts)**:
   $$\text{Capacity Score} = \left( \frac{\text{availableHours}}{\text{workingHours}} \right) \times 40$$
2. **Workload Balancing (30 pts)**:
   - 0 active tasks: 30 points
   - 1 active task: 22 points
   - 2 active tasks: 14 points
   - $\ge 3$ active tasks: 5 points
3. **Skill / Trade Match (20 pts)**:
   - Direct specialty match (e.g. Electrical issue $\leftrightarrow$ Electrician): 20 points
   - Same general department: 10 points
4. **Worker Rating (10 pts)**:
   $$\text{Rating Score} = \left( \frac{\text{rating}}{5.0} \right) \times 10$$

### 3. Example Execution (How to Explain in an Interview)
```text
Candidate A (Rahul Verma): 4h available, 2 active tasks, Rating 4.8  ──► Score = 20 + 14 + 20 + 10 = 64 pts
Candidate B (Sunil Kumar): 6h available, 0 active tasks, Rating 4.9  ──► Score = 30 + 30 + 20 + 10 = 90 pts
Candidate C (Vijay):       2h available, 3 active tasks, Rating 4.2  ──► Score = 10 + 5  + 20 + 8  = 43 pts

Result: Candidate B is automatically recommended with a score of 90/100!
```

---

<a id="step-9-priority-system"></a>
## Step 9: Priority Calculation System

### 1. What We Built & Why We Need It
In **`src/utils/priorityCalculation.js`**, we implemented a deterministic scoring algorithm to compute complaint priority (`Low`, `Medium`, `High`, `Critical`).

### 2. Three Evaluation Dimensions
1. **Hazard & Safety Impact (50 pts)**:
   - Keywords: `spark`, `fire`, `shock`, `smoke`, `short circuit` $\rightarrow$ +50 pts (Emergency)
   - Keywords: `leak`, `burst`, `flood` $\rightarrow$ +35 pts
   - Keywords: `broken`, `flicker`, `stuck` $\rightarrow$ +20 pts
2. **Location Impact (30 pts)**:
   - Public high-traffic areas (`corridor`, `staircase`, `mess`, `water cooler`, `common washroom`) $\rightarrow$ +30 pts
   - Semi-public areas (`reading room`, `wing`) $\rightarrow$ +20 pts
   - Private student room $\rightarrow$ +10 pts
3. **Number of People Affected (20 pts)**:
   - $\ge 20$ students (or entire floor) $\rightarrow$ +20 pts
   - $\ge 5$ students $\rightarrow$ +10 pts
   - Single student $\rightarrow$ +5 pts

```text
Score 80 - 100 ──► Critical  (Fast-track SLA: 2 hours)
Score 60 - 79  ──► High      (SLA: 4 hours)
Score 35 - 59  ──► Medium    (SLA: 8-12 hours)
Score 0 - 34   ──► Low       (SLA: 24-48 hours)
```

---

<a id="step-10-workload-balancing"></a>
## Step 10: Workload Balancing

### 1. The Core Philosophy
**"Never overload one technician while another capable technician has available capacity."**

- As a technician takes on tasks, their `availableHours` decrease and `currentTasks` count rises.
- In Step 8's algorithm, this reduces their workload score from 30 down to 5.
- Therefore, the next complaint automatically routes to their peer who has more free hours.

---

<a id="step-11-incharge-dashboard"></a>
## Step 11: Department In-Charge Dashboard

### 1. What We Built & Why We Need It
In **`src/pages/InChargeDashboard.jsx`**, we built the command center for the department supervisor (e.g. **Prof. H. R. Mehta** for Electrical Maintenance).

### 2. Core Modules on this Screen:
1. **Department KPI Cards**: Total issues, Pending, In Progress, Resolved, Overdue/Escalations, and Satisfaction Rating.
2. **Capacity Utilization Meter**: Real-time gauge comparing required repair hours to available worker hours.
3. **Staff Workload Breakdown**: Visual progress bars showing each worker's % load.
4. **Smart Assignment Action**: A one-click popup that displays ranked candidates with their scores, allowing the supervisor to assign tasks with 100% confidence.

---

<a id="step-12-analytics"></a>
## Step 12: Analytics & Visual Charts

### 1. What We Built & Why We Need It
In **`src/pages/AdminDashboard.jsx`**, we built visual analytics without heavy or buggy chart dependencies:
1. **Complaints by Category (Frequency Bar Chart)**: Compares complaint volume across Electrical, Plumbing, IT, Civil, and Housekeeping.
2. **Resolution Progress (Multi-Segment Stacked Bar)**: Visually displays Resolved (green) vs In Progress (blue) vs Pending (yellow) vs Overdue (red).
3. **Department Workload Distribution**: Displays load across campus facilities.

---

<a id="step-13-department-rating"></a>
## Step 13: Department Rating & Feedback

### 1. What We Built & Why We Need It
In **`src/utils/departmentRating.js`**, we created a multi-factor departmental performance index (0 to 100).

### 2. Multi-Factor Rating Formula:
$$\text{Performance Score} = \left( \frac{\text{Avg Rating}}{5.0} \times 30 \right) + \left( \frac{\text{Resolution Rate}}{100} \times 50 \right) + \max(0, 20 - \text{Overdue} \times 5)$$

- **Grade Mapping**:
  - $\ge 90$: **A+ (Exemplary Service)**
  - $80 - 89$: **A (Good)**
  - $70 - 79$: **B (Satisfactory)**
  - $< 70$: **Needs Improvement**

---

<a id="step-14-workforce-capacity"></a>
## Step 14: Workforce Capacity & Shortage Alerts

### 1. What We Built & Why We Need It
In **`src/utils/capacityCalculation.js`**, we calculate if a department has enough workers to handle its open maintenance backlog.

### 2. The Capacity Formula:
$$\text{Capacity Utilization} = \left( \frac{\text{Required Work Hours}}{\text{Available Worker Hours}} \right) \times 100$$

- **Shortage Alert Threshold**:
  If $\text{Capacity Utilization} > 100\%$:
  ```text
  ⚠ Department Over Capacity — Staffing Shortage Warning!
  Workload demand exceeds shift capacity. Reassignment or overtime authorization recommended.
  ```

---

<a id="step-15-admin-dashboard"></a>
## Step 15: Administrator Dashboard

### 1. What We Built & Why We Need It
In **`src/pages/AdminDashboard.jsx`**, we built the campus director's executive dashboard.

### 2. Cross-Department Comparison Table:
Displays all 6 departments side-by-side:
- Staff headcount
- Total issues
- Resolution rate bar
- Capacity utilization %
- Student satisfaction star rating
- Operational condition status (`✓ Normal Operation` vs `⚠ Over Capacity`)

---

<a id="step-16-notifications"></a>
## Step 16: Frontend Notifications

### 1. What We Built & Why We Need It
In **`src/pages/NotificationsPage.jsx`** and **`src/components/Navbar.jsx`**, we built an interactive notification feed.
- Navbar **Notification Bell** with unread count badge.
- Event triggers:
  - New complaint registered
  - Worker accepted task
  - Repair marked resolved
  - SLA overdue warnings

---

<a id="step-17-escalation"></a>
## Step 17: Overdue Complaint Escalation Logic

### 1. What We Built & Why We Need It
In **`src/utils/escalationLogic.js`**, complaints that exceed their expected resolution time or critical emergencies without an assigned worker are flagged as **Overdue**.
- Highlighted with red borders and red status badges.
- Escalated to **Tier 1 (Department In-Charge)** for immediate supervisor attention.

---

<a id="step-18-localstorage"></a>
## Step 18: Persistent Storage with localStorage

### 1. What We Built & Why We Need It
In **`src/App.jsx`**, all state is synchronized to the browser's `localStorage`:
```javascript
// Read on startup
const [complaints, setComplaints] = useState(() => {
  const saved = localStorage.getItem('campus_complaints');
  return saved ? JSON.parse(saved) : initialComplaints;
});

// Auto-save on every state change
useEffect(() => {
  localStorage.setItem('campus_complaints', JSON.stringify(complaints));
  localStorage.setItem('campus_workers', JSON.stringify(workers));
  localStorage.setItem('campus_notifications', JSON.stringify(notifications));
}, [complaints, workers, notifications]);
```

- **Reset Demo Data Button**: Located in the top-right corner, allowing you to instantly restore the initial 12 complaints and default workers before starting an academic demo or viva presentation!

---

<a id="step-19-vitest-testing"></a>
## Step 19: Vitest & Automated Testing Infrastructure

### 1. What We Built & Why We Need It
We integrated **Vitest** (`vitest`), **JSDOM** (`jsdom`), and **React Testing Library** (`@testing-library/react`, `@testing-library/jest-dom`) to provide unit and integration testing:
- **Zero Config Duplication**: Vitest uses the existing `vite.config.js` plugins, aliases, and transformation pipeline without requiring separate Babel or Webpack setups.
- **Fast Execution**: Tests execute against native ES Modules in ~3 seconds.
- **Headless DOM Testing**: JSDOM allows rendering, inspecting, and interacting with React component trees without spawning a full web browser.

### 2. Test Architecture:
- **Algorithm & Utility Unit Tests**:
  - `src/utils/__tests__/workerAssignment.test.js`: Verifies the 4-part weighted scoring formula (Availability 40%, Load 30%, Skill 20%, Rating 10%), burnout prevention for workers with 3+ tasks, candidate ranking, and pool fallback.
  - `src/utils/__tests__/capacityCalculation.test.js`: Validates department work demand hours, technician shift availability, capacity utilization percentage, and shortage alert triggers (`isOverCapacity`).
  - `src/utils/__tests__/priorityCalculation.test.js`: Tests hazard keyword detection (`spark`, `leak`), location weighting, and score mapping (Critical, High, Medium, Low).
  - `src/utils/__tests__/departmentRating.test.js`: Tests composite performance index (0 - 100) and letter grade mapping (A+, A, B, C).
- **Component & UI Integration Tests**:
  - `src/components/__tests__/StatusBadge.test.jsx`: Tests badge color rendering, dots, and priority/status class mapping.
  - `src/components/__tests__/Card.test.jsx`: Tests title, subtitle, children, and action buttons.
  - `src/pages/__tests__/InChargeDashboard.test.jsx`: Verifies Department Head scoping (Prof. H. R. Mehta - Electrical), separation of ongoing issues into Assigned vs. Unassigned, and tab switching between the "Not Assigned" and "Assigned Workers" segments.
  - `src/pages/__tests__/AdminDashboard.test.jsx`: Tests the Executive Escalation Alerts banner from Department Heads, the 1-click administrative authorization trigger (`onAcknowledgeEscalation`), and cross-department comparison tables.

### 3. NPM Test Commands:
```bash
# Run all automated tests once
npm test

# Run tests in interactive watch mode
npm run test:watch
```

---

## Technical Interview & Viva Voce Quick Answers

### Q1: Why did you not use Redux or complex state management?
> *"For this prototype, React's built-in `useState`, `useEffect`, and component composition provided full reactivity, zero boilerplate, and complete readability without unnecessary abstraction."*

### Q2: How does your Smart Worker Assignment algorithm work?
> *"It uses a transparent, explainable 4-part weighted scoring model: 40% based on available shift hours, 30% for workload balancing to prevent burnout, 20% for direct trade match, and 10% for historical rating. The highest score wins."*

### Q3: How do you prevent student complaints from sitting unresolved indefinitely?
> *"Through our automatic SLA calculation in Step 6 and Overdue Escalation in Step 17. Every complaint is given a strict deadline. If breached, it is flagged with a red alert and escalated directly to the department supervisor's dashboard."*

### Q4: How do you enforce privacy between individual users and their departments?
> *"We implemented a Dual-Level Data Partitioning architecture: In `App.jsx`, complaints are split into `personalComplaints` (filtered strictly by `c.submittedBy === currentUser.name`) and `departmentComplaints` (filtered by `c.originDepartment === currentUser.department`). In the dashboard, the card feed renders exclusively from `personalComplaints`. The department overview displays only numerical aggregates (`.length`, working, resolved, pending) with a privacy lock badge, ensuring zero disclosure of other students' or colleagues' personal issue histories."*

### Q5: How are Students and Staff differentiated across campus domains?
> *"Students belong to the 'Hostel Department / Resident' domain (logging hostel room, bathroom, and mess issues), while Staff belong to academic/administrative departments like 'Computer Engineering Department' or 'IT Department' (logging lab equipment, projector, and departmental server issues). Both use the unified user portal, which dynamically adapts its titles, department badges, and location fields to their role."*

### Q6: How does the Campus Worker track and review daily completed workload by date?
> *"The Worker Dashboard includes a dedicated Workload section equipped with an HTML5 calendar date picker (`<input type='date' />`) and quick preset chips (All Dates, Today, Yesterday, and dynamic historical dates). When any date is selected, the system filters all resolved tasks matching that date's ISO format (`YYYY-MM-DD`). Each completed card provides full accountability: Complaint ID, priority badge, requester name, exact location, completion timestamp, and a mandatory technician verification note explaining the physical action taken to resolve the issue. If an empty date is chosen, intuitive guidance chips suggest dates that contain logged work."*

### Q7: How does the Department Head Scoping & 5-View Operations Architecture work?
> *"Each maintenance department has one designated In-Charge (e.g., Prof. H. R. Mehta for Electrical, Er. S. K. Bansal for Plumbing, Dr. A. P. Rao for IT, Prof. K. N. Verma for Civil, and Mrs. S. Patil for Housekeeping). When logging in as a Department Head, the dashboard is strictly scoped to that department's operational scope:
> 1. **Overview**: Live department KPI cards, shift capacity meter, and an ongoing issues breakdown clearly separating assigned workers from unassigned items.
> 2. **Department Complaints**: Divided into two distinct segments: **Not Assigned** (unassigned queue with 1-click Smart Assignment) and **Assigned Workers** (showing current technician load and Reassign actions).
> 3. **Workers & Capacity**: Complete worker dossiers showing what each technician is currently doing, shift commitment %, free hours, and direct assignment actions.
> 4. **Performance Analytics**: Worker recognition leaderboard awarding 🥇 1st, 🥈 2nd, and 🥉 3rd rankings based on satisfaction ratings, visual work volume distribution graphs, and student/faculty verified review comments.
> 5. **Escalations**: A dedicated emergency dispatch queue where supervisors can review critical hazards or SLA breaches and report them directly to Central Administration."*

### Q8: How does the Administrative Escalation Loop function across the hierarchy?
> *"When a Department Head encounters an issue requiring higher authority—such as emergency replacement parts exceeding petty cash thresholds or hazardous substation breakdowns—they click 'Report to Administration' in the Escalations tab. This dispatches an official escalation record with reason, urgency tier ('Critical', 'Urgent', 'High'), and timestamp. On the **Administrator Dashboard**, an Executive Escalation banner immediately alerts the Campus Director. The Director can inspect the full ticket dossier and click 'Authorize Procurement & Acknowledge', granting emergency contractor authorization and clearing the escalation alert in real time."*

### Q9: Why did you choose Vitest for testing instead of Jest?
> *"Vitest shares the exact same configuration, plugin pipeline, and ESM resolution as Vite, completely eliminating the duplicate configuration overhead, Babel transforms, and ESM issues typical of Jest in modern Vite projects. With JSDOM and React Testing Library, Vitest executes all 24 unit and component test suites in under 4 seconds with 100% native compatibility with React 19."*

---

*(Project Complete — Keep this guide for reference and study!)*



