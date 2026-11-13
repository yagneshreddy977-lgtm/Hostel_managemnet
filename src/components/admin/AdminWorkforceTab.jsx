import React from 'react';
import Card from '../Card';
import AdaptiveSlider from '../AdaptiveSlider';
import { calculateDepartmentCapacity } from '../../utils/capacityCalculation';
import { Star } from 'lucide-react';
import '../../components/components.css';

/**
 * AdminWorkforceTab Component
 * Tab View 3: Workforce Intelligence with adaptive capacity availability slider,
 * campus-wide technician leaderboard, and department capacity cards.
 *
 * @param {Object} props
 * @param {number} props.workforceMinHours - Minimum free hours threshold
 * @param {Function} props.onMinHoursChange - Slider change handler
 * @param {Array} props.allRankedWorkers - Filtered and sorted worker list
 * @param {Array} props.departments - List of department names
 * @param {Array} props.workers - Full workers array
 * @param {Array} props.complaints - Full complaints array
 */
function AdminWorkforceTab({
  workforceMinHours,
  onMinHoursChange,
  allRankedWorkers,
  departments,
  workers,
  complaints,
}) {
  return (
    <div>
      {/* Interactive Adaptive Capacity Filter Slider */}
      <div style={{ marginBottom: '20px' }}>
        <AdaptiveSlider
          label="Campus Workforce Availability Filter (Minimum Shift Free Hours)"
          unit="hrs"
          min={0}
          max={8}
          step={1}
          value={workforceMinHours}
          onChange={onMinHoursChange}
          colorScheme="capacity"
          variant="card"
          onReset={() => onMinHoursChange(0)}
          isFiltered={workforceMinHours > 0}
        />
      </div>

      {/* Top Leaderboard Card */}
      <div style={{ marginBottom: '24px' }}>
        <Card
          title={`🏆 Campus-Wide Technician Performance Leaderboard (${allRankedWorkers.length} Technicians)`}
          subtitle="Recognizing top performing facility workers across all 6 departments based on customer feedback and punctuality"
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '10px 12px' }}>Standing</th>
                  <th style={{ padding: '10px 12px' }}>Technician</th>
                  <th style={{ padding: '10px 12px' }}>Department</th>
                  <th style={{ padding: '10px 12px' }}>Specialty Skill</th>
                  <th style={{ padding: '10px 12px' }}>Satisfaction Rating</th>
                  <th style={{ padding: '10px 12px' }}>Shift Availability</th>
                  <th style={{ padding: '10px 12px' }}>Current Active Job</th>
                </tr>
              </thead>
              <tbody>
                {allRankedWorkers.map((w, index) => {
                  const isFirst = index === 0;
                  const isSecond = index === 1;
                  const isThird = index === 2;

                  return (
                    <tr
                      key={w.id}
                      style={{
                        borderBottom: '1px solid var(--color-border)',
                        backgroundColor: isFirst ? '#fefce8' : '#ffffff',
                      }}
                    >
                      <td style={{ padding: '12px 10px', fontWeight: '800' }}>
                        {isFirst && <span style={{ fontSize: '18px' }}>🥇 1st</span>}
                        {isSecond && <span style={{ fontSize: '18px' }}>🥈 2nd</span>}
                        {isThird && <span style={{ fontSize: '18px' }}>🥉 3rd</span>}
                        {!isFirst && !isSecond && !isThird && <span style={{ color: 'var(--color-text-muted)' }}>#{index + 1}</span>}
                      </td>

                      <td style={{ padding: '12px 10px', fontWeight: '700', color: 'var(--color-text-main)' }}>
                        {w.name}
                      </td>

                      <td style={{ padding: '12px 10px' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '700',
                          backgroundColor: 'var(--color-bg-subtle)',
                          color: 'var(--color-text-main)'
                        }}>
                          {w.department}
                        </span>
                      </td>

                      <td style={{ padding: '12px 10px', color: 'var(--color-text-muted)' }}>
                        {w.skill}
                      </td>

                      <td style={{ padding: '12px 10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '800', color: '#f59e0b' }}>
                          <Star size={15} fill="#f59e0b" color="#f59e0b" />
                          <span>{w.rating || 4.7} / 5.0</span>
                        </div>
                      </td>

                      <td style={{ padding: '12px 10px' }}>
                        <span style={{ fontWeight: '700', color: w.availableHours > 2 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                          {w.availableHours}h Free
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginLeft: '4px' }}>
                          ({w.currentTasks || 0} tasks)
                        </span>
                      </td>

                      <td style={{ padding: '12px 10px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                        {w.currentActiveJob || 'On standby in workshop'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Department Capacity Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {departments.map(dept => {
          const deptWorkersList = workers.filter(w => w.department === dept);
          const deptComplaintsList = complaints.filter(c => c.department === dept);
          const capacity = calculateDepartmentCapacity(dept, complaints, workers);

          return (
            <div
              key={dept}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text-main)', margin: 0 }}>
                  {dept} Department
                </h3>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: '700',
                  backgroundColor: capacity.isOverCapacity ? '#fee2e2' : 'var(--color-success-light)',
                  color: capacity.isOverCapacity ? 'var(--color-danger)' : 'var(--color-success)',
                }}>
                  {capacity.capacityUtilization}% Utilized
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Assigned Staff:</span>
                  <strong>{deptWorkersList.length} Technicians</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Ongoing Workload:</span>
                  <strong>{deptComplaintsList.filter(c => c.status !== 'Resolved').length} Active Issues</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Capacity Hours:</span>
                  <strong>{capacity.requiredWorkHours}h Demand / {capacity.availableWorkerHours}h Avail</strong>
                </div>
              </div>

              <div style={{ height: '8px', width: '100%', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '999px', overflow: 'hidden', marginBottom: '12px' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, capacity.capacityUtilization)}%`,
                    backgroundColor: capacity.isOverCapacity ? 'var(--color-danger)' : capacity.capacityUtilization > 75 ? 'var(--color-warning)' : 'var(--color-success)',
                  }}
                />
              </div>

              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                {deptWorkersList.map(w => w.name).join(', ') || 'No staff assigned'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminWorkforceTab;
