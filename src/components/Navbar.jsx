import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Bell, Menu, X } from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import './components.css';

/**
 * Navbar Component (Redesigned for Shadcn Library Dashboard aesthetic)
 * Top header with brand identity, notification center,
 * role switcher, and user avatar.
 */
function Navbar({
  currentRole: propRole,
  inchargeDepartment: propDept,
  onRoleChange: propOnRoleChange,
  userName: propUserName,
  unreadNotificationsCount: propUnreadCount,
  onOpenNotifications: propOnOpenNotifications,
  onMenuClick,
  mobileNavOpen = false,
}) {
  const navigate = useNavigate();
  const campus = useCampus();

  const currentRole = propRole ?? campus.currentRole ?? 'student';
  const inchargeDepartment = propDept ?? campus.inchargeDepartment ?? 'Electrical';
  const userName = propUserName ?? campus.userName ?? 'Aman Sharma';
  const unreadNotificationsCount = propUnreadCount ?? campus.notifications?.length ?? 0;

  const roleNames = {
    student: 'Student Resident',
    staff: 'Faculty / Staff',
    worker: 'Campus Technician',
    incharge: `${inchargeDepartment} Dept Head`,
    admin: 'Administrator',
  };

  const handleRoleSelection = (val) => {
    let newRole = val;
    let newDept = inchargeDepartment;

    if (val.startsWith('incharge:')) {
      newRole = 'incharge';
      newDept = val.split(':')[1];
      if (campus.setInchargeDepartment) campus.setInchargeDepartment(newDept);
    }

    if (campus.setCurrentRole) {
      campus.setCurrentRole(newRole);
    }

    if (propOnRoleChange) {
      propOnRoleChange(newRole, newDept);
    }

    // Navigate to role-specific route
    if (newRole === 'student') {
      navigate('/student');
    } else if (newRole === 'staff') {
      navigate('/staff');
    } else if (newRole === 'worker') {
      navigate('/worker');
    } else if (newRole === 'incharge') {
      navigate(`/incharge/${newDept}`);
    } else if (newRole === 'admin') {
      navigate('/admin');
    }
  };

  const handleBellClick = () => {
    if (propOnOpenNotifications) {
      propOnOpenNotifications();
    } else {
      navigate('/notifications');
    }
  };

  return (
    <header className="navbar">
      <button
        type="button"
        className="sidebar-toggle"
        onClick={onMenuClick}
        aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
        title={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
      >
        {mobileNavOpen ? <X size={19} /> : <Menu size={19} />}
      </button>
      {/* Brand Logo & Title */}
      <Link to="/" className="navbar-brand">
        <div className="navbar-brand-icon">
          <Building2 size={19} />
        </div>
        <div>
          <span style={{ display: 'block', lineHeight: 1.1, fontWeight: 800, fontSize: '15px', color: 'var(--color-text-main)' }}>
            Smart Campus
          </span>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
            Operations & Housing
          </span>
        </div>
      </Link>

      {/* Right Actions: Notifications, Role Switcher & User Profile */}
      <div className="navbar-actions">
        {/* Notification Bell Button */}
        <button
          type="button"
          onClick={handleBellClick}
          style={{
            position: 'relative',
            background: 'var(--color-secondary)',
            border: '1px solid var(--color-border)',
            cursor: 'pointer',
            color: 'var(--color-text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            transition: 'all 0.15s ease',
          }}
          title="View Notifications"
          aria-label="View notifications"
        >
          <Bell size={17} />
          {unreadNotificationsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              fontSize: '10px',
              fontWeight: '800',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #ffffff',
              boxShadow: 'var(--shadow-xs)',
            }}>
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Prototype Role Switcher */}
        <div className="role-switcher-container">
          <span className="role-switcher-label">Role</span>
          <select 
            className="role-select"
            value={
              currentRole === 'incharge'
                ? `incharge:${inchargeDepartment}`
                : currentRole
            }
            onChange={(e) => handleRoleSelection(e.target.value)}
            aria-label="Select User Role"
          >
            <option value="student">Student</option>
            <option value="staff">Staff</option>
            <option value="worker">Worker</option>
            <optgroup label="── Department Heads ──">
              <option value="incharge:Electrical">Electrical Lead</option>
              <option value="incharge:Plumbing">Plumbing Lead</option>
              <option value="incharge:IT">IT & Wi-Fi Lead</option>
              <option value="incharge:Civil">Civil Lead</option>
              <option value="incharge:Housekeeping">Housekeeping Lead</option>
            </optgroup>
            <option value="admin">Administrator</option>
          </select>
        </div>

        {/* User Profile Badge */}
        <div className="user-profile-badge">
          <div className="user-avatar">
            {userName.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: '12.5px', lineHeight: 1.1, fontWeight: 700 }}>{userName}</div>
            <div style={{ fontSize: '10.5px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              {roleNames[currentRole] || currentRole}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
