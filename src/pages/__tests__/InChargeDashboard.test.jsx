import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InChargeDashboard from '../InChargeDashboard';

describe('InChargeDashboard page component', () => {
  const mockComplaints = [
    {
      id: 'CMP-104',
      title: 'Main MCB tripping repeatedly on 3rd floor',
      department: 'Electrical',
      category: 'Electrical',
      status: 'In Progress',
      priority: 'Critical',
      assignedWorker: 'Rahul Verma (Electrician)',
      location: 'Hostel Block B, 3rd Floor DB Room',
      submittedBy: 'Aman Sharma',
      expectedResolution: '2026-09-12 01:30 PM',
    },
    {
      id: 'CMP-126',
      title: 'Study hall exhaust fan motor jammed',
      department: 'Electrical',
      category: 'Electrical',
      status: 'Pending',
      priority: 'Medium',
      assignedWorker: null,
      location: 'Hostel Block B, 3rd Floor Reading Hall',
      submittedBy: 'Sachin Dave',
      expectedResolution: '2026-09-12 04:00 PM',
    },
    {
      id: 'CMP-101',
      title: 'Water leakage under washbasin',
      department: 'Plumbing',
      category: 'Plumbing',
      status: 'Pending',
      priority: 'High',
      assignedWorker: null,
    },
  ];

  const mockWorkers = [
    {
      id: 1,
      name: 'Rahul Verma',
      department: 'Electrical',
      skill: 'Senior Campus Electrician',
      workingHours: 8,
      availableHours: 6,
      currentTasks: 1,
      rating: 4.9,
      phone: '+91 98765-11001',
      shift: '09:00 AM - 05:00 PM',
      currentActiveJob: 'CMP-104: Main MCB tripping repeatedly',
    },
    {
      id: 2,
      name: 'Amit Shah',
      department: 'Electrical',
      skill: 'Assistant Electrician',
      workingHours: 8,
      availableHours: 4,
      currentTasks: 2,
      rating: 4.6,
      phone: '+91 98765-11006',
      shift: '08:00 AM - 04:00 PM',
      currentActiveJob: 'CMP-106: Corridor tube light repair',
    },
  ];

  const headInfo = {
    name: 'Prof. H. R. Mehta',
    office: 'Electrical Engg Block, Room 102',
    phone: '+91 98765-43210',
  };

  it('scopes view strictly to Electrical Department and displays Department Head name', () => {
    render(
      <InChargeDashboard
        departmentName="Electrical"
        headInfo={headInfo}
        activeTab="incharge-dashboard"
        complaints={mockComplaints}
        workers={mockWorkers}
      />
    );

    // Displays Head of Department banner
    expect(screen.getByText('Prof. H. R. Mehta')).toBeInTheDocument();
    expect(screen.getByText(/Electrical Department Head/i)).toBeInTheDocument();

    // Electrical issues are displayed
    expect(screen.getByText('CMP-104')).toBeInTheDocument();
    expect(screen.getByText('CMP-126')).toBeInTheDocument();

    // Plumbing issue CMP-101 is filtered out
    expect(screen.queryByText('CMP-101')).not.toBeInTheDocument();
  });

  it('separates ongoing issues into assigned vs unassigned in overview', () => {
    render(
      <InChargeDashboard
        departmentName="Electrical"
        headInfo={headInfo}
        activeTab="overview"
        complaints={mockComplaints}
        workers={mockWorkers}
      />
    );

    // Assigned issue has worker name
    expect(screen.getByText(/Assigned: Rahul Verma/i)).toBeInTheDocument();

    // Unassigned issue shows alert and Smart Assign button
    expect(screen.getByText(/Worker Not Assigned/i)).toBeInTheDocument();
  });

  it('switches between Not Assigned and Assigned Workers segments in Department Complaints tab', () => {
    render(
      <InChargeDashboard
        departmentName="Electrical"
        headInfo={headInfo}
        activeTab="dept-complaints"
        complaints={mockComplaints}
        workers={mockWorkers}
      />
    );

    // Default segment is "Not Assigned"
    expect(screen.getByText(/Study hall exhaust fan motor jammed/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Smart Assign/i })).toBeInTheDocument();

    // Click "Assigned Workers" segment tab
    const assignedTabBtn = screen.getByRole('button', { name: /Assigned Workers/i });
    fireEvent.click(assignedTabBtn);

    // Assigned complaint CMP-104 should be visible
    expect(screen.getByText(/Main MCB tripping repeatedly/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reassign/i })).toBeInTheDocument();
  });

  it('renders Workers & Capacity tab and filters technicians using AdaptiveSlider without crashing', () => {
    render(
      <InChargeDashboard
        departmentName="Electrical"
        headInfo={headInfo}
        activeTab="dept-workers"
        complaints={mockComplaints}
        workers={mockWorkers}
      />
    );

    // Header and technician count
    expect(screen.getByText(/Electrical Workforce Dossier & Shift Workload/i)).toBeInTheDocument();
    expect(screen.getByText(/2 Registered Technicians/i)).toBeInTheDocument();

    // Capacity slider is rendered
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();

    // Both workers initially rendered (both have >= 0 available hours)
    expect(screen.getByText('Rahul Verma')).toBeInTheDocument();
    expect(screen.getByText('Amit Shah')).toBeInTheDocument();

    // Filter by 5 hours free (Rahul has 6h, Amit has 4h)
    fireEvent.change(slider, { target: { value: '5' } });

    // Rahul Verma (6h free) is visible, Amit Shah (4h free) is filtered out
    expect(screen.getByText('Rahul Verma')).toBeInTheDocument();
    expect(screen.queryByText('Amit Shah')).not.toBeInTheDocument();

    // Reset filter button
    const resetBtn = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetBtn);

    // Both workers visible again
    expect(screen.getByText('Rahul Verma')).toBeInTheDocument();
    expect(screen.getByText('Amit Shah')).toBeInTheDocument();
  });
});
