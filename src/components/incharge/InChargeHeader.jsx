import React from 'react';
import '../components.css';

/**
 * InChargeHeader Component
 * Displays Department Head identity banner and department selector.
 */
function InChargeHeader({ headInfo, activeDept, onDepartmentChange }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 24px',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
      marginBottom: '20px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-text-main)', margin: 0 }}>
              {headInfo?.name || 'Prof. H. R. Mehta'}
            </h1>
            <span style={{
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: '700',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
            }}>
              {activeDept} Department Head
            </span>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', margin: '6px 0 0 0' }}>
            {headInfo?.title || `Head of ${activeDept} Operations`} • 📍 {headInfo?.office || 'Campus Operations Wing'} • 📞 {headInfo?.phone || '+91 98765-20001'}
          </p>
        </div>

        {/* Quick Department Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-muted)' }}>
            Viewing Department:
          </span>
          <select
            className="form-select"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '13px', fontWeight: '600' }}
            value={activeDept}
            onChange={(e) => onDepartmentChange && onDepartmentChange(e.target.value)}
          >
            <option value="Electrical">Electrical Maintenance</option>
            <option value="Plumbing">Plumbing & Water Supply</option>
            <option value="IT">IT & Network Infrastructure</option>
            <option value="Civil">Civil Works & Carpentry</option>
            <option value="Housekeeping">Housekeeping & Hygiene</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default InChargeHeader;
