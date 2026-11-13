import React from 'react';
import { BarChart2, Wrench, CalendarCheck, Calendar } from 'lucide-react';
import '../components.css';

/**
 * WorkerNavTabs Component (Redesigned for Library Dashboard aesthetic)
 * Modern segmented pill navigation tabs for switching between Worker Dashboard views.
 */
function WorkerNavTabs({ currentTab, onSelectTab, activeCount = 0, resolvedCount = 0 }) {
  const isOverview = currentTab === 'dashboard' || currentTab === 'worker-dashboard';

  const tabs = [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: BarChart2,
      isActive: isOverview,
    },
    {
      id: 'my-tasks',
      label: 'My Tasks',
      icon: Wrench,
      isActive: currentTab === 'my-tasks',
      badge: activeCount > 0 ? `${activeCount} active` : null,
      badgeColor: 'primary',
    },
    {
      id: 'workload',
      label: 'My Workload',
      icon: CalendarCheck,
      isActive: currentTab === 'workload',
      badge: `${resolvedCount} completed`,
      badgeColor: 'success',
    },
    {
      id: 'schedule',
      label: 'Work Schedule',
      icon: Calendar,
      isActive: currentTab === 'schedule',
    },
  ];

  return (
    <div className="worker-nav-tabs" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: 'var(--color-secondary)',
      padding: '4px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--color-border)',
      marginBottom: '24px',
      overflowX: 'auto',
      maxWidth: '100%',
    }}>
      {tabs.map((t) => {
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelectTab(t.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '7px 15px',
              borderRadius: 'var(--radius-xs)',
              border: 'none',
              backgroundColor: t.isActive ? '#ffffff' : 'transparent',
              color: t.isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontWeight: t.isActive ? '700' : '500',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: t.isActive ? '0 1px 3px rgba(10, 27, 57, 0.08)' : 'none',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            <Icon size={15} style={{ color: t.isActive ? 'var(--color-primary)' : 'inherit' }} />
            <span>{t.label}</span>
            {t.badge && (
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '1px 7px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: t.isActive
                  ? (t.badgeColor === 'success' ? 'var(--color-success-light)' : 'var(--color-primary-light)')
                  : 'var(--color-border)',
                color: t.badgeColor === 'success' ? 'var(--color-success)' : 'var(--color-primary)',
              }}>
                {t.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default WorkerNavTabs;
