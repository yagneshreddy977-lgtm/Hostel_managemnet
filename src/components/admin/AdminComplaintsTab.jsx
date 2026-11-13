import React from 'react';
import Card from '../Card';
import StatusBadge from '../StatusBadge';
import Button from '../Button';
import { Search, Eye } from 'lucide-react';
import '../components.css';

/**
 * AdminComplaintsTab Component
 * Tab View 2: Campus-wide complaints directory with real-time text search,
 * department filtering, status selector, and modal inspection trigger.
 *
 * @param {Object} props
 * @param {string} props.complaintSearch - Search query string
 * @param {Function} props.onSearchChange - Search input handler
 * @param {string} props.deptFilter - Department filter value ('All' or dept name)
 * @param {Function} props.onDeptFilterChange - Department filter handler
 * @param {string} props.statusFilter - Status filter value ('All' or status string)
 * @param {Function} props.onStatusFilterChange - Status filter handler
 * @param {Array} props.departments - List of departments
 * @param {Array} props.filteredComplaints - Filtered complaints array
 * @param {number} props.totalComplaints - Total complaints count
 * @param {Function} props.onSelectTicketModal - Click handler to open ticket dossier modal
 */
function AdminComplaintsTab({
  complaintSearch,
  onSearchChange,
  deptFilter,
  onDeptFilterChange,
  statusFilter,
  onStatusFilterChange,
  departments,
  filteredComplaints,
  totalComplaints,
  onSelectTicketModal,
}) {
  return (
    <div>
      {/* Filter Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 300px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              placeholder="Search campus issues by ID, title, submitter, location..."
              value={complaintSearch}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-muted)' }}>Dept:</span>
            <select
              value={deptFilter}
              onChange={(e) => onDeptFilterChange(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                fontSize: '12px',
                backgroundColor: '#ffffff'
              }}
            >
              <option value="All">All Departments</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-muted)' }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                fontSize: '12px',
                backgroundColor: '#ffffff'
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Escalated to Admin">Escalated to Admin</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary)' }}>
            Showing {filteredComplaints.length} of {totalComplaints}
          </span>
        </div>
      </div>

      {/* Complaints Table */}
      <Card title="Campus Maintenance Master Registry" subtitle="Complete cross-department record of all facility repairs and service requests">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '10px 12px' }}>Ticket ID</th>
                <th style={{ padding: '10px 12px' }}>Department</th>
                <th style={{ padding: '10px 12px' }}>Issue Title</th>
                <th style={{ padding: '10px 12px' }}>Location</th>
                <th style={{ padding: '10px 12px' }}>Priority</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
                <th style={{ padding: '10px 12px' }}>Assigned Worker</th>
                <th style={{ padding: '10px 12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '800', color: 'var(--color-primary)' }}>
                    {c.id}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '700',
                      backgroundColor: 'var(--color-bg-subtle)',
                      color: 'var(--color-text-main)'
                    }}>
                      {c.department}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: '600', maxWidth: '240px' }}>
                    <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {c.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                      By: {c.submittedBy || c.studentName} ({c.originDepartment || 'Campus'})
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    {c.location}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <StatusBadge value={c.priority} type="priority" />
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <StatusBadge value={c.status} type="status" />
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: '12px' }}>
                    {c.assignedWorker ? (
                      <span style={{ color: 'var(--color-text-main)', fontWeight: '600' }}>{c.assignedWorker}</span>
                    ) : (
                      <span style={{ color: 'var(--color-warning)', fontWeight: '700' }}>Unassigned</span>
                    )}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectTicketModal(c)}
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default AdminComplaintsTab;
