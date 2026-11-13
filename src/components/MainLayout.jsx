import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useCampus } from '../context/CampusContext';
import './components.css';

/**
 * MainLayout Component
 * Wraps pages in the standard application shell with Navbar, Sidebar, and Content Area.
 * Supports nested React Router <Outlet /> as well as legacy `children` props.
 */
function MainLayout({
  currentRole: propRole,
  inchargeDepartment: propDept,
  onRoleChange: propOnRoleChange,
  activeTab: propActiveTab,
  onSelectTab: propOnSelectTab,
  userName: propUserName,
  badgeCounts: propBadgeCounts,
  unreadNotificationsCount: propUnreadCount,
  onOpenNotifications: propOnOpenNotifications,
  children,
}) {
  const campus = useCampus();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setMobileNavOpen((open) => !open);
      return;
    }
    setSidebarCollapsed((collapsed) => !collapsed);
  };

  useEffect(() => {
    if (!mobileNavOpen) return undefined;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileNavOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileNavOpen]);

  const currentRole = propRole ?? campus.currentRole ?? 'student';
  const inchargeDepartment = propDept ?? campus.inchargeDepartment ?? 'Electrical';
  const userName = propUserName ?? campus.userName ?? 'Aman Sharma';
  const notificationsCount = propUnreadCount ?? campus.notifications?.length ?? 0;

  const defaultBadgeCounts = {
    myComplaints: campus.personalComplaints?.length ?? 0,
    assignedTasks: campus.workerTasks?.filter(t => t.status !== 'Resolved').length ?? 0,
    deptComplaints: campus.currentDeptComplaints?.length ?? 0,
    escalations: campus.currentDeptEscalations?.length ?? 0,
    notifications: campus.notifications?.length ?? 0,
  };
  const badgeCounts = propBadgeCounts ?? defaultBadgeCounts;

  return (
    <div className={`layout-root${mobileNavOpen ? ' mobile-nav-visible' : ''}${sidebarCollapsed ? ' sidebar-is-collapsed' : ''}`}>
      {/* Top Navigation */}
      <Navbar
        currentRole={currentRole}
        inchargeDepartment={inchargeDepartment}
        onRoleChange={propOnRoleChange}
        userName={userName}
        unreadNotificationsCount={notificationsCount}
        onOpenNotifications={propOnOpenNotifications}
        onMenuClick={handleSidebarToggle}
        mobileNavOpen={mobileNavOpen}
      />

      {/* Main Body with Sidebar + Content */}
      <div className="layout-body">
        <Sidebar
          currentRole={currentRole}
          activeTab={propActiveTab}
          onSelectTab={propOnSelectTab}
          badgeCounts={badgeCounts}
          inchargeDepartment={inchargeDepartment}
          mobileNavOpen={mobileNavOpen}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((collapsed) => !collapsed)}
          onNavigate={() => setMobileNavOpen(false)}
        />
        {mobileNavOpen && (
          <button
            type="button"
            className="sidebar-backdrop"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          />
        )}

        <main className="layout-content">
          {campus.handleResetDemo && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <button
                type="button"
                onClick={campus.handleResetDemo}
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  background: 'none',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 10px',
                  cursor: 'pointer',
                }}
              >
                Reset Demo Data
              </button>
            </div>
          )}

          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
