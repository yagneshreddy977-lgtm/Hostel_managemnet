import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useCampus } from '../context/CampusContext';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  Trash2, 
  Check 
} from 'lucide-react';
import '../components/components.css';

/**
 * NotificationsPage Component (Step 16)
 * System event feed informing users of task assignments, SLA warnings, and complaint milestones.
 */
function NotificationsPage({ notifications: propNotifications, onClearAll: propOnClearAll, onMarkAsRead }) {
  const campus = useCampus();
  const notifications = propNotifications || campus.notifications || [];
  const onClearAll = propOnClearAll || (() => campus.setNotifications && campus.setNotifications([]));
  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-text-main)' }}>
            System Notifications & Alerts
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Recent updates to your service tickets and campus workforce activity.
          </p>
        </div>

        {notifications.length > 0 && (
          <Button variant="secondary" size="sm" icon={Trash2} onClick={onClearAll}>
            Clear All
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
              <Bell size={36} style={{ opacity: 0.4, marginBottom: '10px' }} />
              <h3 style={{ color: 'var(--color-text-main)' }}>All Caught Up!</h3>
              <p style={{ fontSize: '13px' }}>No notifications yet.</p>
            </div>
          </Card>
        ) : (
          notifications.map((notif) => {
            const isWarning = notif.type === 'warning' || notif.type === 'overdue';
            const isSuccess = notif.type === 'success' || notif.type === 'resolved';

            return (
              <div
                key={notif.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-border)',
                  borderLeft: isWarning ? '4px solid var(--color-danger)' : isSuccess ? '4px solid var(--color-success)' : '4px solid var(--color-primary)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: isWarning ? 'var(--color-danger-light)' : isSuccess ? 'var(--color-success-light)' : 'var(--color-primary-light)',
                  color: isWarning ? 'var(--color-danger)' : isSuccess ? 'var(--color-success)' : 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {isWarning ? <AlertTriangle size={18} /> : isSuccess ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-text-main)', margin: 0 }}>
                      {notif.title}
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>
                      {notif.time}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '4px 0 0 0', lineHeight: '1.4' }}>
                    {notif.message}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
