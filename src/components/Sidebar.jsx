import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ListChecks, 
  Bell, 
  UserCheck, 
  Calendar, 
  BarChart3, 
  AlertTriangle, 
  Building, 
  FileText,
  Zap,
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import './components.css';

/**
 * Sidebar Component (Redesigned with Shadcn Library Dashboard visual language)
 * Clean white background with subtle 1px border, coral-tinted pill active states,
 * and bottom user profile card.
 */
function Sidebar({ 
  currentRole: propRole, 
  activeTab, 
  onSelectTab, 
  badgeCounts: propBadges = {},
  inchargeDepartment: propDept,
  mobileNavOpen = false,
  sidebarCollapsed = false,
  onToggleSidebar,
  onNavigate,
}) {
  const location = useLocation();
  const campus = useCampus();

  const currentRole = propRole ?? campus.currentRole ?? 'student';
  const inchargeDepartment = propDept ?? campus.inchargeDepartment ?? 'Electrical';
  const userName = campus.userName || 'Aman Sharma';

  const defaultBadges = {
    myComplaints: campus.personalComplaints?.length || 0,
    assignedTasks: campus.workerTasks?.filter(t => t.status !== 'Resolved').length || 0,
    deptComplaints: campus.currentDeptComplaints?.length || 0,
    escalations: campus.currentDeptEscalations?.length || 0,
    notifications: campus.notifications?.length || 0,
  };
  const badgeCounts = { ...defaultBadges, ...propBadges };

  const navigationByRole = {
    student: [
      { id: 'dashboard', label: 'Resident Dashboard', icon: LayoutDashboard, path: '/student' },
      { id: 'create-complaint', label: 'Report Hostel Issue', icon: PlusCircle, path: '/complaints/new' },
      { id: 'my-complaints', label: 'My Complaints', icon: ListChecks, badge: badgeCounts.myComplaints || 0, path: '/student?filter=my-complaints' },
      { id: 'notifications', label: 'Notifications', icon: Bell, badge: badgeCounts.notifications || 0, path: '/notifications' },
    ],
    staff: [
      { id: 'dashboard', label: 'Faculty Dashboard', icon: LayoutDashboard, path: '/staff' },
      { id: 'create-complaint', label: 'Report Dept Issue', icon: PlusCircle, path: '/complaints/new' },
      { id: 'my-complaints', label: 'My Complaints', icon: ListChecks, badge: badgeCounts.myComplaints || 0, path: '/staff?filter=my-complaints' },
      { id: 'notifications', label: 'Notifications', icon: Bell, badge: badgeCounts.notifications || 0, path: '/notifications' },
    ],
    worker: [
      { id: 'worker-dashboard', label: 'Worker Operations', icon: LayoutDashboard, path: '/worker' },
      { id: 'my-tasks', label: 'My Tasks', icon: ListChecks, badge: badgeCounts.assignedTasks || 0, path: '/worker/tasks' },
      { id: 'schedule', label: 'Work Schedule', icon: Calendar, path: '/worker/schedule' },
      { id: 'workload', label: 'My Workload', icon: BarChart3, path: '/worker/workload' },
    ],
    incharge: [
      { id: 'incharge-dashboard', label: 'Overview', icon: LayoutDashboard, path: `/incharge/${inchargeDepartment}` },
      { id: 'dept-complaints', label: 'Department Queue', icon: FileText, badge: badgeCounts.deptComplaints || 0, path: `/incharge/${inchargeDepartment}/complaints` },
      { id: 'dept-workers', label: 'Workers & Capacity', icon: UserCheck, path: `/incharge/${inchargeDepartment}/workers` },
      { id: 'dept-analytics', label: 'Performance Analytics', icon: BarChart3, path: `/incharge/${inchargeDepartment}/analytics` },
      { id: 'dept-escalations', label: 'Escalations', icon: AlertTriangle, badge: badgeCounts.escalations || 0, path: `/incharge/${inchargeDepartment}/escalations` },
    ],
    admin: [
      { id: 'admin-dashboard', label: 'Institution Overview', icon: LayoutDashboard, path: '/admin' },
      { id: 'astrix-pipeline', label: 'Operations Pipeline', icon: Zap, path: '/admin/pipeline' },
      { id: 'all-departments', label: 'Departments', icon: Building, path: '/admin/departments' },
      { id: 'all-complaints', label: 'All Complaints', icon: FileText, path: '/admin/complaints' },
      { id: 'workforce-analytics', label: 'Workforce Analytics', icon: BarChart3, path: '/admin/workforce' },
    ],
  };

  const navItems = navigationByRole[currentRole] || navigationByRole.student;
  const CollapseIcon = sidebarCollapsed ? ChevronRight : ChevronLeft;

  const isItemActive = (item) => {
    if (activeTab && activeTab === item.id) return true;

    const currentPath = location.pathname;
    const currentSearch = location.search;

    if (item.path.includes('?')) {
      const [itemBasePath, itemQuery] = item.path.split('?');
      return currentPath === itemBasePath && currentSearch === `?${itemQuery}`;
    }

    if (item.path === currentPath) return true;
    if (item.path !== '/' && currentPath === item.path) return true;

    if (item.id === 'dashboard' && (currentPath === '/student' || currentPath === '/staff') && !currentSearch.includes('filter=')) {
      return true;
    }
    if (item.id === 'worker-dashboard' && currentPath === '/worker') {
      return true;
    }
    if (item.id === 'incharge-dashboard' && currentPath === `/incharge/${inchargeDepartment}`) {
      return true;
    }
    if (item.id === 'admin-dashboard' && currentPath === '/admin') {
      return true;
    }

    return false;
  };

  const handleLinkClick = (e, item) => {
    if (onSelectTab) {
      onSelectTab(item.id);
    }
  };

  const roleLabels = {
    student: 'Student Resident',
    staff: 'Faculty Member',
    worker: 'Duty Technician',
    incharge: `${inchargeDepartment} Lead`,
    admin: 'Administrator',
  };

  return (
    <aside className={`sidebar${mobileNavOpen ? ' sidebar-open' : ''}${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      <div>
        {/* Navigation Category Label */}
        <div className="sidebar-nav-heading">
          <div className="sidebar-section-label">Navigation</div>
          <button
            type="button"
            className="sidebar-collapse-toggle"
            onClick={onToggleSidebar}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <CollapseIcon size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Links Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`sidebar-link ${active ? 'active' : ''}`}
                title={item.label}
                aria-label={item.label}
                onClick={(e) => { handleLinkClick(e, item); onNavigate?.(); }}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {Boolean(item.badge && item.badge > 0) && (
                  <span className="sidebar-link-badge">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Dossier Card (Library Dashboard Style) */}
      <div className="sidebar-footer">
        <div className="sidebar-user-card">
          <div className="user-avatar" style={{ width: '32px', height: '32px', fontSize: '12px' }}>
            {userName.charAt(0)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {userName}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'inline-block' }} />
              <span>{roleLabels[currentRole] || currentRole}</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--color-text-light)', textAlign: 'center' }}>
          Demo workspace · data saved in this browser
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
