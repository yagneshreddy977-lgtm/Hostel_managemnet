import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CampusProvider } from '../context/CampusContext';
import { AppRoutes } from '../App';

function renderWithRouter(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <CampusProvider>
        <AppRoutes />
      </CampusProvider>
    </MemoryRouter>
  );
}

describe('Application Routing with React Router', () => {
  it('redirects root "/" to "/student" and renders Student Resident Portal', () => {
    renderWithRouter('/');
    expect(screen.getByText(/Student Resident Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/Report New Issue/i)).toBeInTheDocument();
  });

  it('renders Faculty & Staff Service Portal when navigating to "/staff"', () => {
    renderWithRouter('/staff');
    expect(screen.getByText(/Faculty & Staff Service Portal/i)).toBeInTheDocument();
  });

  it('renders Create Complaint form when navigating to "/complaints/new"', () => {
    renderWithRouter('/complaints/new');
    expect(screen.getByText(/Create New Complaint/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Complaint Title \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Complaint/i })).toBeInTheDocument();
  });

  it('renders Complaint Details with visual timeline when navigating to deep link "/complaints/CMP-101"', () => {
    renderWithRouter('/complaints/CMP-101');
    expect(screen.getByText(/Visual Resolution Lifecycle Timeline/i)).toBeInTheDocument();
    expect(screen.getByText('CMP-101')).toBeInTheDocument();
    expect(screen.getByText(/Stage 1: Complaint Submitted/i)).toBeInTheDocument();
  });

  it('renders Worker Dashboard when navigating to "/worker"', () => {
    renderWithRouter('/worker');
    expect(screen.getByText(/Worker Operations Hub/i)).toBeInTheDocument();
  });

  it('renders In-Charge Dashboard when navigating to "/incharge/Electrical"', () => {
    renderWithRouter('/incharge/Electrical');
    expect(screen.getByText(/Electrical Department Head/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Prof. H. R. Mehta/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders Admin Dashboard when navigating to "/admin"', () => {
    renderWithRouter('/admin');
    expect(screen.getByText(/Campus Administration & Workforce Intelligence/i)).toBeInTheDocument();
  });

  it('renders Departments Directory when navigating to "/admin/departments"', () => {
    renderWithRouter('/admin/departments');
    expect(screen.getByText(/Campus Service Departments & Routing Rules/i)).toBeInTheDocument();
  });

  it('renders Notifications page when navigating to "/notifications"', () => {
    renderWithRouter('/notifications');
    expect(screen.getByText(/System Notifications & Alerts/i)).toBeInTheDocument();
  });

  it('renders 404 Page Not Found when navigating to an unknown route', () => {
    renderWithRouter('/some/non-existent/route');
    expect(screen.getByText(/404 Error/i)).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Resident Dashboard/i })).toBeInTheDocument();
  });

  it('renders Astrix Live Pipeline when navigating to "/admin/pipeline"', () => {
    renderWithRouter('/admin/pipeline');
    expect(screen.getByText(/Astrix Operations Command Center/i)).toBeInTheDocument();
    expect(screen.getByText(/Live Pipeline Engine/i)).toBeInTheDocument();
  });
});
