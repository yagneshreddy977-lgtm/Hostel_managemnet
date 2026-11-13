import React from 'react';
import { Layers, FileText, UserCheck, BarChart3, AlertTriangle } from 'lucide-react';
import '../components.css';

/**
 * InChargeNavTabs Component
 * Sub-navigation tabs for the Department In-Charge command center.
 */
function InChargeNavTabs({ 
  currentTab, 
  onSelectTab, 
  ongoingCount = 0, 
  totalCount = 0, 
  workersCount = 0, 
  overdueCount = 0 
}) {
  const isOverview = currentTab === 'overview' || currentTab === 'incharge-dashboard';

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginBottom: '20px',
      padding: '4px',
      backgroundColor: 'var(--color-bg-card)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--color-border)',
    }}>
      <button
        type="button"
        onClick={() => onSelectTab('overview')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          fontWeight: '600',
          border: 'none',
          backgroundColor: isOverview ? 'var(--color-primary)' : 'transparent',
          color: isOverview ? '#ffffff' : 'var(--color-text-main)',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
      >
        <Layers size={15} />
        <span>Overview</span>
        <span style={{
          padding: '1px 6px',
          borderRadius: '999px',
          fontSize: '11px',
          backgroundColor: isOverview ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
          color: isOverview ? '#ffffff' : 'var(--color-text-muted)',
        }}>
          {ongoingCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSelectTab('dept-complaints')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          fontWeight: '600',
          border: 'none',
          backgroundColor: currentTab === 'dept-complaints' ? 'var(--color-primary)' : 'transparent',
          color: currentTab === 'dept-complaints' ? '#ffffff' : 'var(--color-text-main)',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
      >
        <FileText size={15} />
        <span>Department Complaints</span>
        <span style={{
          padding: '1px 6px',
          borderRadius: '999px',
          fontSize: '11px',
          backgroundColor: currentTab === 'dept-complaints' ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
          color: currentTab === 'dept-complaints' ? '#ffffff' : 'var(--color-text-muted)',
        }}>
          {totalCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSelectTab('dept-workers')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          fontWeight: '600',
          border: 'none',
          backgroundColor: currentTab === 'dept-workers' ? 'var(--color-primary)' : 'transparent',
          color: currentTab === 'dept-workers' ? '#ffffff' : 'var(--color-text-main)',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
      >
        <UserCheck size={15} />
        <span>Workers & Capacity</span>
        <span style={{
          padding: '1px 6px',
          borderRadius: '999px',
          fontSize: '11px',
          backgroundColor: currentTab === 'dept-workers' ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
          color: currentTab === 'dept-workers' ? '#ffffff' : 'var(--color-text-muted)',
        }}>
          {workersCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSelectTab('dept-analytics')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          fontWeight: '600',
          border: 'none',
          backgroundColor: currentTab === 'dept-analytics' ? 'var(--color-primary)' : 'transparent',
          color: currentTab === 'dept-analytics' ? '#ffffff' : 'var(--color-text-main)',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
      >
        <BarChart3 size={15} />
        <span>Performance Analytics</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectTab('dept-escalations')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '13px',
          fontWeight: '600',
          border: 'none',
          backgroundColor: currentTab === 'dept-escalations' ? 'var(--color-primary)' : 'transparent',
          color: currentTab === 'dept-escalations' ? '#ffffff' : 'var(--color-text-main)',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
      >
        <AlertTriangle size={15} color={overdueCount > 0 && currentTab !== 'dept-escalations' ? 'var(--color-danger)' : 'currentColor'} />
        <span>Escalations</span>
        {overdueCount > 0 && (
          <span style={{
            padding: '1px 6px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: '700',
            backgroundColor: 'var(--color-danger)',
            color: '#ffffff',
          }}>
            {overdueCount}
          </span>
        )}
      </button>
    </div>
  );
}

export default InChargeNavTabs;
