import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AstrixDashboard from '../AstrixDashboard';

describe('AstrixDashboard component', () => {
  const mockComplaints = [
    {
      id: 'CMP-104',
      title: 'Main MCB tripping repeatedly on 3rd floor',
      department: 'Electrical',
      status: 'In Progress',
      priority: 'Critical',
      assignedWorker: 'Rahul Verma (Electrician)',
      location: 'Block B, 3rd Floor DB Room',
      submittedBy: 'Aman Sharma',
    },
    {
      id: 'CMP-126',
      title: 'Study hall exhaust fan motor jammed',
      department: 'Electrical',
      status: 'Pending',
      priority: 'Medium',
      assignedWorker: null,
      location: 'Block B, 3rd Floor Reading Hall',
      submittedBy: 'Sachin Dave',
    },
    {
      id: 'CMP-101',
      title: 'Water leakage under washbasin',
      department: 'Plumbing',
      status: 'Resolved',
      priority: 'High',
      assignedWorker: 'Suresh Kumar (Plumber)',
      location: 'Block A, 1st Floor Common Washroom',
      submittedBy: 'Rohan Verma',
    },
  ];

  const mockWorkers = [
    {
      id: 1,
      name: 'Rahul Verma',
      department: 'Electrical',
      workingHours: 8,
      availableHours: 4,
    },
    {
      id: 2,
      name: 'Suresh Kumar',
      department: 'Plumbing',
      workingHours: 8,
      availableHours: 6,
    },
  ];

  it('renders executive command center title, telemetry beacon, and metric tiles', () => {
    render(
      <AstrixDashboard
        complaints={mockComplaints}
        workers={mockWorkers}
      />
    );

    // Title and telemetry
    expect(screen.getByText(/Astrix Operations Command Center/i)).toBeInTheDocument();
    expect(screen.getByText(/Live Pipeline Engine/i)).toBeInTheDocument();

    // Metric cards
    expect(screen.getByText(/Campus Resolution Velocity/i)).toBeInTheDocument();
    expect(screen.getByText(/In-Flight Active Pipeline/i)).toBeInTheDocument();
    expect(screen.getByText(/Workforce Capacity Load/i)).toBeInTheDocument();
    expect(screen.getByText(/Critical Escalations/i)).toBeInTheDocument();
  });

  it('renders live visual pipeline flowchart stages', () => {
    render(
      <AstrixDashboard
        complaints={mockComplaints}
        workers={mockWorkers}
      />
    );

    // Pipeline stages
    expect(screen.getByText('Resident Intake')).toBeInTheDocument();
    expect(screen.getByText('Priority & Triage')).toBeInTheDocument();
    expect(screen.getByText('Smart Dispatch')).toBeInTheDocument();
    expect(screen.getByText('On-Site Fix')).toBeInTheDocument();
    expect(screen.getByText('SLA Sign-Off')).toBeInTheDocument();
  });

  it('filters live stream table when searching by ticket ID or title', () => {
    render(
      <AstrixDashboard
        complaints={mockComplaints}
        workers={mockWorkers}
      />
    );

    expect(screen.getByText('CMP-104')).toBeInTheDocument();
    expect(screen.getByText('CMP-126')).toBeInTheDocument();
    expect(screen.getByText('CMP-101')).toBeInTheDocument();

    // Search for MCB
    const searchInput = screen.getByRole('textbox', { name: /search/i });
    fireEvent.change(searchInput, { target: { value: 'MCB' } });

    // CMP-104 matches, others filtered out
    expect(screen.getByText('CMP-104')).toBeInTheDocument();
    expect(screen.queryByText('CMP-126')).not.toBeInTheDocument();
    expect(screen.queryByText('CMP-101')).not.toBeInTheDocument();
  });

  it('switches to SLA Audit & Reports tab seamlessly', () => {
    render(
      <AstrixDashboard
        complaints={mockComplaints}
        workers={mockWorkers}
      />
    );

    const reportsTabBtn = screen.getByRole('button', { name: /SLA Audit & Reports/i });
    fireEvent.click(reportsTabBtn);

    expect(screen.getByText(/Departmental Operational Audit Matrix/i)).toBeInTheDocument();
    expect(screen.getByText(/Institution SLA Compliance Index/i)).toBeInTheDocument();
  });

  it('toggles dark theme smoothly', () => {
    const { container } = render(
      <AstrixDashboard
        complaints={mockComplaints}
        workers={mockWorkers}
      />
    );

    const rootEl = container.firstChild;
    expect(rootEl).not.toHaveClass('dark-theme');

    const themeToggleBtn = screen.getByRole('button', { name: /Toggle Astrix theme/i });
    fireEvent.click(themeToggleBtn);

    expect(rootEl).toHaveClass('dark-theme');
  });
});
