import React from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { 
  DEPARTMENT_DETAILS, 
  CATEGORY_DEPARTMENT_MAP 
} from '../utils/departmentRouting';
import { 
  Building2, 
  User, 
  MapPin, 
  Phone, 
  Clock, 
  Tag, 
  CheckCircle 
} from 'lucide-react';

/**
 * DepartmentsDirectory Component
 * Displays an institution-wide directory of campus maintenance departments,
 * showing department in-charges, offices, SLAs, and handled categories.
 */
function DepartmentsDirectory() {
  const departments = Object.entries(DEPARTMENT_DETAILS).map(([key, details]) => {
    // Find all categories mapped to this department
    const handledCategories = Object.entries(CATEGORY_DEPARTMENT_MAP)
      .filter(([cat, dept]) => dept === key)
      .map(([cat]) => cat);

    return {
      id: key,
      ...details,
      categories: handledCategories,
    };
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-text-main)' }}>
          Campus Service Departments & Routing Rules
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginTop: '4px' }}>
          Overview of campus maintenance departments, responsible in-charges, and automatic routing rules.
        </p>
      </div>

      {/* Departments Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {departments.map((dept) => (
          <Card
            key={dept.id}
            title={dept.name}
            subtitle={`Department Code: ${dept.code}`}
            action={
              <span 
                style={{ 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  color: dept.color, 
                  backgroundColor: `${dept.color}15`, 
                  padding: '3px 10px', 
                  borderRadius: '999px' 
                }}
              >
                SLA: {dept.defaultSlaHours}h
              </span>
            }
          >
            {/* Department In-Charge & Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-main)' }}>
                <User size={15} style={{ color: 'var(--color-primary)' }} />
                <span><strong>In-Charge:</strong> {dept.inCharge}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
                <MapPin size={15} style={{ color: 'var(--color-primary)' }} />
                <span><strong>Office:</strong> {dept.officeLocation}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
                <Phone size={15} style={{ color: 'var(--color-primary)' }} />
                <span><strong>Emergency Extension:</strong> {dept.contactNumber}</span>
              </div>
            </div>

            {/* Routed Issue Categories */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Auto-Routed Issue Types:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {dept.categories.map((category) => (
                  <span
                    key={category}
                    style={{
                      fontSize: '12px',
                      backgroundColor: 'var(--color-bg-subtle)',
                      color: 'var(--color-text-main)',
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Tag size={11} style={{ color: 'var(--color-text-muted)' }} />
                    <span>{category}</span>
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DepartmentsDirectory;
