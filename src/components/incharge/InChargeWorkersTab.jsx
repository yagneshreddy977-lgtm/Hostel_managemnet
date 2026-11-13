import React from 'react';
import AdaptiveSlider from '../AdaptiveSlider';
import Button from '../Button';
import { Users, Wrench, Star } from 'lucide-react';
import '../components.css';

/**
 * InChargeWorkersTab Component
 * Tab View 3: Complete details of all department workers, their active jobs,
 * workload progress bar, contact details, and capacity slider filter.
 *
 * @param {Object} props
 * @param {string} props.activeDept - Active department
 * @param {Array} props.deptWorkers - All department workers
 * @param {number} props.workerMinHours - Filter threshold for free hours
 * @param {Function} props.onMinHoursChange - Slider change handler
 * @param {Array} props.displayedWorkers - Filtered workers array
 */
function InChargeWorkersTab({
  activeDept,
  deptWorkers,
  workerMinHours,
  onMinHoursChange,
  displayedWorkers,
}) {
  return (
    <div>
      {/* Header Summary */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 24px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-main)', margin: 0 }}>
            {activeDept} Workforce Dossier & Shift Workload
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
            Complete breakdown of what each worker is currently doing, live shift hours committed vs. free, and trade qualifications.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            fontWeight: '700',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
          }}>
            {deptWorkers.length} Registered Technicians
          </span>
        </div>
      </div>

      {/* Interactive Adaptive Capacity Slider */}
      <div style={{ marginBottom: '20px' }}>
        <AdaptiveSlider
          label="Interactive Capacity Filter: Minimum Available Shift Free Hours"
          unit="hrs"
          min={0}
          max={8}
          step={1}
          value={workerMinHours}
          onChange={onMinHoursChange}
          colorScheme="capacity"
          variant="card"
          onReset={() => onMinHoursChange(0)}
          isFiltered={workerMinHours > 0}
        />
      </div>

      {/* Worker Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        {displayedWorkers.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border)' }}>
            <Users size={40} style={{ color: 'var(--color-text-light)', marginBottom: '10px' }} />
            <h4>No workers match the selected free capacity filter ({workerMinHours} hrs free)</h4>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              Try lowering the required free hours threshold or resetting the filter.
            </p>
            <Button variant="secondary" size="sm" onClick={() => onMinHoursChange(0)}>
              Reset Capacity Filter
            </Button>
          </div>
        ) : (
          displayedWorkers.map((worker) => {
            const totalShift = worker.workingHours || 8;
            const available = worker.availableHours || 0;
            const committed = Math.max(0, totalShift - available);
            const loadPercent = Math.round((committed / totalShift) * 100);

            return (
              <div
                key={worker.id}
                className="card"
                style={{
                  borderLeft: loadPercent > 80 ? '5px solid var(--color-danger)' : loadPercent > 50 ? '5px solid var(--color-primary)' : '5px solid var(--color-success)',
                }}
              >
                {/* Header */}
                <div className="card-header" style={{ padding: '14px 20px', backgroundColor: '#fcfdfe' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-text-main)', margin: 0 }}>
                      {worker.name}
                    </h4>
                    <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: '600', marginTop: '2px' }}>
                      {worker.skill}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: '700',
                      backgroundColor: worker.status === 'On Duty' ? 'var(--color-success-light)' : '#f1f5f9',
                      color: worker.status === 'On Duty' ? 'var(--color-success)' : 'var(--color-text-muted)',
                    }}>
                      {worker.status || 'On Duty'}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="card-body" style={{ padding: '18px 20px' }}>
                  {/* What currently doing */}
                  <div style={{
                    padding: '12px 14px',
                    backgroundColor: '#f8fafc',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    marginBottom: '16px',
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Wrench size={13} style={{ color: 'var(--color-primary)' }} />
                      Currently Assigned Job:
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-main)' }}>
                      {worker.currentActiveJob || (worker.currentTasks > 0 ? `Active on ${worker.currentTasks} assigned ticket(s)` : 'Standby / Available for immediate assignment')}
                    </div>
                  </div>

                  {/* Workload Progress Bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>
                        Workload Capacity:
                      </span>
                      <span style={{ fontWeight: '700', color: loadPercent > 80 ? 'var(--color-danger)' : 'var(--color-primary)' }}>
                        {loadPercent}% Committed ({available}h free)
                      </span>
                    </div>

                    <div style={{ height: '8px', width: '100%', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${loadPercent}%`,
                          backgroundColor: loadPercent > 80 ? 'var(--color-danger)' : loadPercent > 50 ? 'var(--color-primary)' : 'var(--color-success)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Technical Details Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    <div>
                      <span>Shift Hours:</span>
                      <div style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{worker.shift || '09:00 AM - 05:00 PM'}</div>
                    </div>

                    <div>
                      <span>Contact Phone:</span>
                      <div style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{worker.phone || '+91 98765-XXXXX'}</div>
                    </div>

                    <div>
                      <span>Customer Rating:</span>
                      <div style={{ fontWeight: '700', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                        <span>{worker.rating || 4.7} / 5.0</span>
                      </div>
                    </div>

                    <div>
                      <span>Active Ticket Queue:</span>
                      <div style={{ fontWeight: '700', color: 'var(--color-primary)' }}>
                        {worker.currentTasks || 0} Tickets
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default InChargeWorkersTab;
