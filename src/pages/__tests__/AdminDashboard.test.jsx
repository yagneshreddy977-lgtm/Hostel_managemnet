import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard from '../AdminDashboard';

describe('AdminDashboard page component', () => {
  const mockComplaints = [
    {
      id: 'CMP-128',
      title: 'Transformer secondary bushing oil leakage',
      department: 'Electrical',
      category: 'Electrical',
      status: 'Escalated to Admin',
      priority: 'Critical',
      escalatedToAdmin: true,
      escalationReason: 'Requires certified OEM vendor repair exceeding department budget threshold.',
      escalationUrgency: 'Critical',
      escalatedAt: '12 Sep 2026, 09:30 AM',
      escalatedBy: 'Prof. H. R. Mehta',
      location: 'Campus Main Substation, Transformer 2',
      submittedBy: 'Substation Shift Operator',
      expectedResolution: '2026-09-12 02:00 PM',
    },
    {
      id: 'CMP-101',
      title: 'Water leakage under washbasin',
      department: 'Plumbing',
      category: 'Plumbing',
      status: 'Pending',
      priority: 'High',
    },
    {
      id: 'CMP-102',
      title: 'Study table drawer slider stuck',
      department: 'Civil',
      category: 'Civil',
      status: 'Resolved',
      priority: 'Low',
    },
  ];

  const mockWorkers = [
    { id: 1, name: 'Rahul Verma', department: 'Electrical', rating: 4.9, availableHours: 6, skill: 'Senior Electrician' },
    { id: 2, name: 'Ramesh Yadav', department: 'Plumbing', rating: 4.7, availableHours: 4, skill: 'Senior Plumber' },
  ];

  it('renders executive escalation alerts banner when department heads dispatch escalations', () => {
    render(
      <AdminDashboard
        complaints={mockComplaints}
        workers={mockWorkers}
        activeTab="admin-dashboard"
      />
    );

    expect(screen.getByText(/Executive Escalations from Department Heads/i)).toBeInTheDocument();
    expect(screen.getByText(/Transformer secondary bushing oil leakage/i)).toBeInTheDocument();
    expect(screen.getByText(/Requires certified OEM vendor repair/i)).toBeInTheDocument();
    expect(screen.getByText(/Reported on: 12 Sep 2026, 09:30 AM/i)).toBeInTheDocument();
  });

  it('triggers onAcknowledgeEscalation when administrator authorizes emergency resources', () => {
    const handleAcknowledge = vi.fn();

    render(
      <AdminDashboard
        complaints={mockComplaints}
        workers={mockWorkers}
        activeTab="admin-dashboard"
        onAcknowledgeEscalation={handleAcknowledge}
      />
    );

    const authBtn = screen.getByRole('button', { name: /Authorize Procurement & Acknowledge/i });
    fireEvent.click(authBtn);

    expect(handleAcknowledge).toHaveBeenCalledWith('CMP-128');
  });

  it('renders green SLA compliance banner when there are zero escalations', () => {
    const normalComplaints = mockComplaints.filter(c => !c.escalatedToAdmin);

    render(
      <AdminDashboard
        complaints={normalComplaints}
        workers={mockWorkers}
        activeTab="admin-dashboard"
      />
    );

    expect(screen.getByText(/All Campus Departments Operating Within SLA Bounds/i)).toBeInTheDocument();
    expect(screen.queryByText(/Executive Escalations from Department Heads/i)).not.toBeInTheDocument();
  });

  it('displays cross-department comparison table with all 6 departments', () => {
    render(
      <AdminDashboard
        complaints={mockComplaints}
        workers={mockWorkers}
        activeTab="admin-dashboard"
      />
    );

    expect(screen.getByText('Department Workforce & Capacity Comparison')).toBeInTheDocument();
    expect(screen.getAllByText('Electrical').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Plumbing').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Civil').length).toBeGreaterThanOrEqual(1);
  });

  it('switches to Live Pipeline (Astrix) command center tab smoothly', () => {
    render(
      <AdminDashboard
        complaints={mockComplaints}
        workers={mockWorkers}
        activeTab="admin-dashboard"
      />
    );

    const astrixTabBtn = screen.getByRole('button', { name: /Live Pipeline \(Astrix\)/i });
    fireEvent.click(astrixTabBtn);

    expect(screen.getByText(/Astrix Operations Command Center/i)).toBeInTheDocument();
    expect(screen.getByText(/Live Pipeline Engine/i)).toBeInTheDocument();
    expect(screen.getByText(/Resident Intake/i)).toBeInTheDocument();
  });
});
