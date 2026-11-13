import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ComplaintCard from '../components/ComplaintCard';
import Button from '../components/Button';
import { useCampus } from '../context/CampusContext';
import { 
  PlusCircle, 
  Clock, 
  Hourglass, 
  CheckCircle2, 
  FileText, 
  Building, 
  ShieldCheck, 
  Inbox,
  Search,
  X
} from 'lucide-react';

/**
 * StudentDashboard / UserDashboard Component
 * Redesigned for the Shadcn Library Dashboard visual language.
 * 
 * Separates the resident's submitted complaints from department-wide aggregate counts in the interface.
 */
function StudentDashboard({
  currentUser: propUser,
  personalComplaints: propPersonal,
  departmentComplaints: propDept,
  onCreateNew,
  onTrackComplaint,
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const campus = useCampus();

  const currentUser = propUser || campus.currentUser || {
    name: 'Aman Sharma',
    role: 'student',
    department: 'Hostel Department',
    unit: 'Hostel Block B',
  };

  const personalComplaints = propPersonal || campus.personalComplaints || [];
  const departmentComplaints = propDept || campus.departmentComplaints || [];

  // Filter for personal complaints list: 'all' | 'Pending' | 'In Progress' | 'Resolved'
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [complaintSearch, setComplaintSearch] = useState('');

  // React to query parameters if specified (e.g. ?filter=Pending)
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam && ['Pending', 'In Progress', 'Resolved', 'Needs attention'].includes(filterParam)) {
      setSelectedFilter(filterParam);
    } else if (filterParam === 'my-complaints') {
      setSelectedFilter('all');
    }
  }, [searchParams]);

  const handleCreate = () => {
    if (onCreateNew) {
      onCreateNew();
    } else {
      navigate('/complaints/new');
    }
  };

  const handleTrack = (complaint) => {
    if (onTrackComplaint) {
      onTrackComplaint(complaint);
    } else {
      navigate(`/complaints/${complaint.id}`);
    }
  };

  // --- 1. Department-Level Aggregate Counts ---
  const deptTotalCount = departmentComplaints.length;
  const deptPendingCount = departmentComplaints.filter(c => c.status === 'Pending').length;
  const deptInProgressCount = departmentComplaints.filter(c => c.status === 'In Progress').length;
  const deptResolvedCount = departmentComplaints.filter(c => c.status === 'Resolved').length;

  // --- 2. Personal Complaints Counts ---
  const myTotalCount = personalComplaints.length;
  const myPendingCount = personalComplaints.filter(c => c.status === 'Pending').length;
  const myInProgressCount = personalComplaints.filter(c => c.status === 'In Progress').length;
  const myResolvedCount = personalComplaints.filter(c => c.status === 'Resolved').length;
  const myNeedsAttentionCount = personalComplaints.filter(c => ['Overdue', 'Escalated to Admin'].includes(c.status)).length;

  // --- 3. Filtered Personal Complaints for the Cards List ---
  const query = complaintSearch.trim().toLowerCase();
  const displayedComplaints = personalComplaints.filter((complaint) => {
    const matchesStatus = selectedFilter === 'all'
      || (selectedFilter === 'Needs attention' && ['Overdue', 'Escalated to Admin'].includes(complaint.status))
      || complaint.status === selectedFilter;
    const searchableText = [
      complaint.id,
      complaint.title,
      complaint.category,
      complaint.department,
      complaint.location,
      complaint.status,
    ].filter(Boolean).join(' ').toLowerCase();
    return matchesStatus && (!query || searchableText.includes(query));
  });

  const isStudent = currentUser.role === 'student';

  return (
    <div>
      {/* 1. Top Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-main)', margin: 0, letterSpacing: '-0.02em' }}>
              {isStudent ? 'Student Resident Portal' : 'Faculty & Staff Service Portal'}
            </h1>
            <span style={{
              fontSize: '11.5px',
              fontWeight: '700',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              border: '1px solid rgba(255, 81, 80, 0.2)',
            }}>
              {isStudent ? 'Hostel Resident' : 'Department Staff'}
            </span>
          </div>

          <p style={{ color: 'var(--color-text-muted)', fontSize: '13.5px', marginTop: '6px', margin: '6px 0 0 0' }}>
            Logged in as <strong>{currentUser.name}</strong> • Affiliated with <strong>{currentUser.department}</strong> ({currentUser.unit})
          </p>
        </div>

        <Button 
          variant="primary" 
          icon={PlusCircle}
          onClick={handleCreate}
          size="md"
        >
          Report New Issue
        </Button>
      </div>

      {/* 2. Department-Wide Aggregate Statistics Section (Metric Tiles) */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-xs)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={17} style={{ color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text-main)', margin: 0 }}>
              {currentUser.department} Overview
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-secondary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
              Campus Statistics
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-success)', fontWeight: '600' }}>
            <ShieldCheck size={15} />
            <span>Department metrics show counts only</span>
          </div>
        </div>

        {/* 4 Stat Cards for Department */}
        <div className="student-dept-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '14px 16px', backgroundColor: 'var(--color-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Issues
            </div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-main)', marginTop: '4px' }}>
              {deptTotalCount}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              Department-wide log
            </div>
          </div>

          <div style={{ padding: '14px 16px', backgroundColor: 'var(--color-warning-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-warning-border)' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Awaiting Action
            </div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#b45309', marginTop: '4px' }}>
              {deptPendingCount}
            </div>
            <div style={{ fontSize: '11.5px', color: '#b45309', marginTop: '2px' }}>
              In queue for triage
            </div>
          </div>

          <div style={{ padding: '14px 16px', backgroundColor: 'var(--color-info-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-info-border)' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Being Repaired
            </div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#0369a1', marginTop: '4px' }}>
              {deptInProgressCount}
            </div>
            <div style={{ fontSize: '11.5px', color: '#0369a1', marginTop: '2px' }}>
              Active on-site fixes
            </div>
          </div>

          <div style={{ padding: '14px 16px', backgroundColor: 'var(--color-success-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-success-border)' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Resolved
            </div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#15803d', marginTop: '4px' }}>
              {deptResolvedCount}
            </div>
            <div style={{ fontSize: '11.5px', color: '#15803d', marginTop: '2px' }}>
              Verified and closed
            </div>
          </div>
        </div>
      </div>

      {/* 3. Personal Complaints History (Strict Student Isolation) */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} style={{ color: 'var(--color-primary)' }} />
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-main)', margin: 0, letterSpacing: '-0.01em' }}>
                My Submitted Issues
              </h2>
              <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#ffffff', backgroundColor: 'var(--color-primary)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                {myTotalCount}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
              Your submitted tickets are listed here. This demo saves changes in this browser.
            </p>
          </div>

          {/* Quick status counters */}
          <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span>Pending: <strong style={{ color: 'var(--color-text-main)' }}>{myPendingCount}</strong></span>
            <span>•</span>
            <span style={{ color: 'var(--color-info)', fontWeight: '600' }}>In Progress: {myInProgressCount}</span>
            <span>•</span>
            <span style={{ color: 'var(--color-success)', fontWeight: '600' }}>Resolved: {myResolvedCount}</span>
          </div>
        </div>

        {/* Filter Navigation Tabs for Personal History (Library Dashboard Segmented Pill Style) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--color-secondary)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
            {[
              { key: 'all', label: `All My Issues (${myTotalCount})` },
              { key: 'Pending', label: `Pending (${myPendingCount})` },
              { key: 'Needs attention', label: `Needs attention (${myNeedsAttentionCount})` },
              { key: 'In Progress', label: `In Progress (${myInProgressCount})` },
              { key: 'Resolved', label: `Resolved (${myResolvedCount})` },
            ].map((tab) => {
              const isActive = selectedFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedFilter(tab.key)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '13px',
                    fontWeight: isActive ? '700' : '500',
                    border: 'none',
                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--color-text-muted)',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 1px 3px rgba(255, 81, 80, 0.25)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="complaint-list-controls">
            <label className="complaint-search">
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                value={complaintSearch}
                onChange={(event) => setComplaintSearch(event.target.value)}
                placeholder="Search my complaints"
                aria-label="Search my complaints"
              />
              {complaintSearch && (
                <button type="button" onClick={() => setComplaintSearch('')} aria-label="Clear complaint search">
                  <X size={15} />
                </button>
              )}
            </label>
            <div className="complaint-results-count" aria-live="polite">
              Showing <strong>{displayedComplaints.length}</strong> of {myTotalCount} complaints
            </div>
          </div>
        </div>

        {/* 4. Personal Complaints Cards List */}
        <div>
          {displayedComplaints.length === 0 ? (
            <div style={{ 
              backgroundColor: '#ffffff', 
              border: '1px dashed var(--color-border-strong)', 
              borderRadius: 'var(--radius-md)', 
              padding: '48px 24px', 
              textAlign: 'center',
              color: 'var(--color-text-muted)'
            }}>
              <Inbox size={38} style={{ marginBottom: '12px', color: 'var(--color-text-light)' }} />
              <h4 style={{ fontSize: '15px', color: 'var(--color-text-main)', marginBottom: '4px', fontWeight: '700' }}>
                {query ? 'No complaints match your search' : 'No personal complaints found'}
              </h4>
              <p style={{ fontSize: '13px', margin: 0 }}>
                {query
                  ? <>Try another ticket ID, title, location, or category.</>
                  : <>You have no tickets matching the filter: <strong>"{selectedFilter}"</strong>.</>}
              </p>
            </div>
          ) : (
            displayedComplaints.map((complaint) => (
              <ComplaintCard 
                key={complaint.id} 
                complaint={complaint} 
                onTrack={handleTrack}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
