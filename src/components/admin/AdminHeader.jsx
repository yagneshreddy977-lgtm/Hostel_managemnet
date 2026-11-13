import React from 'react';
import { Building2, BarChart3, Users, Zap } from 'lucide-react';
import '../components.css';

/**
 * AdminHeader Component
 * Executive command center header banner and fast navigation sub-tabs.
 *
 * @param {Object} props
 * @param {string} props.currentSubTab - 'overview' | 'complaints' | 'workforce'
 * @param {Function} props.onSelectSubTab - Tab selection handler
 * @param {number} props.escalatedCount - Count of urgent escalations
 * @param {number} props.totalComplaints - Total complaint count
 * @param {number} props.totalWorkers - Total workforce count
 */
function AdminHeader({
  currentSubTab,
  onSelectSubTab,
  escalatedCount = 0,
  totalComplaints = 0,
  totalWorkers = 0,
}) {
  return (
    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-text-main)', margin: 0 }}>
            Campus Administration & Workforce Intelligence
          </h1>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            padding: '3px 10px',
            borderRadius: '999px',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Director Office
          </span>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '4px', margin: '4px 0 0 0' }}>
          Central administrative oversight governing all 6 maintenance departments, facility operations, and technician allocations.
        </p>
      </div>

      {/* Secondary Sub-Tabs for Fast Navigation */}
      <div className="admin-nav-tabs" style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--color-bg-subtle)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
        <button
          type="button"
          onClick={() => onSelectSubTab('overview')}
          style={{
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: currentSubTab === 'overview' ? '700' : '500',
            backgroundColor: currentSubTab === 'overview' ? '#ffffff' : 'transparent',
            color: currentSubTab === 'overview' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            boxShadow: currentSubTab === 'overview' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Building2 size={15} />
          <span>Overview & Escalations</span>
          {escalatedCount > 0 && (
            <span style={{
              backgroundColor: 'var(--color-danger)',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '800',
              padding: '1px 6px',
              borderRadius: '999px'
            }}>
              {escalatedCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => onSelectSubTab('complaints')}
          style={{
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: currentSubTab === 'complaints' ? '700' : '500',
            backgroundColor: currentSubTab === 'complaints' ? '#ffffff' : 'transparent',
            color: currentSubTab === 'complaints' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            boxShadow: currentSubTab === 'complaints' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <BarChart3 size={15} />
          <span>Campus Complaints ({totalComplaints})</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectSubTab('workforce')}
          style={{
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: currentSubTab === 'workforce' ? '700' : '500',
            backgroundColor: currentSubTab === 'workforce' ? '#ffffff' : 'transparent',
            color: currentSubTab === 'workforce' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            boxShadow: currentSubTab === 'workforce' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Users size={15} />
          <span>Workforce Intelligence ({totalWorkers})</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectSubTab('astrix')}
          style={{
            padding: '6px 14px',
            fontSize: '13px',
            fontWeight: currentSubTab === 'astrix' ? '700' : '500',
            backgroundColor: currentSubTab === 'astrix' ? '#ffffff' : 'transparent',
            color: currentSubTab === 'astrix' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            boxShadow: currentSubTab === 'astrix' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Zap size={15} style={{ color: 'var(--color-primary)' }} />
          <span>Operations Pipeline</span>
        </button>
      </div>
    </div>
  );
}

export default AdminHeader;
