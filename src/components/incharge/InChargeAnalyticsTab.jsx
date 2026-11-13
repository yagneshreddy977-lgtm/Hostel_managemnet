import React from 'react';
import Card from '../Card';
import { Star, MessageSquare } from 'lucide-react';
import '../components.css';

/**
 * InChargeAnalyticsTab Component
 * Tab View 4: Department Performance Analytics, Visual Distribution Graphs,
 * Worker Leaderboard Rankings, and Verified Student/Faculty Reviews.
 *
 * @param {Object} props
 * @param {string} props.activeDept - Active department
 * @param {Object} props.performanceData - Calculated score, grade, average rating
 * @param {number} props.overdueCount - Overdue complaints count
 * @param {number} props.totalCount - Total complaints
 * @param {number} props.resolvedCount - Resolved tickets count
 * @param {number} props.inProgressCount - In progress count
 * @param {number} props.pendingCount - Pending count
 * @param {Array} props.rankedWorkers - Workers sorted by rating and efficiency
 * @param {Array} props.deptFeedbacks - Department reviews
 */
function InChargeAnalyticsTab({
  activeDept,
  performanceData,
  overdueCount,
  totalCount,
  resolvedCount,
  inProgressCount,
  pendingCount,
  rankedWorkers,
  deptFeedbacks,
}) {
  return (
    <div>
      {/* Top Row: Overall Department Rating Card & Leaderboard Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Department Satisfaction Score */}
        <Card title={`${activeDept} Performance Index`} subtitle="Composite score based on resolution velocity, SLA, and customer feedback">
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '10px 0' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              border: '3px solid var(--color-primary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-primary)' }}>
                {performanceData.performanceScore}
              </span>
              <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: '700' }}>SCORE</span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-main)' }}>
                  Grade: {performanceData.grade}
                </span>
                <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: '700', backgroundColor: '#fef3c7', color: '#b45309' }}>
                  ★ {performanceData.averageRating} Average Rating
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
                Resolution Rate: <strong>{performanceData.resolutionRate}%</strong> • {performanceData.resolvedCount} of {performanceData.totalComplaints} tickets completed.
              </p>
            </div>
          </div>

          {/* Breakdown Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--color-border)', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Resolution Compliance</span>
              <strong>{performanceData.resolutionRate}%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>SLA On-Time Delivery</span>
              <strong>{Math.max(0, 100 - overdueCount * 10)}%</strong>
            </div>
          </div>
        </Card>

        {/* Department Visual Performance Graph */}
        <Card title={`${activeDept} Work Volume Distribution`} subtitle="Visual breakdown of completed vs in progress vs pending">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span>Resolved Fixes ({resolvedCount})</span>
                <strong>{totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0}%</strong>
              </div>
              <div style={{ height: '10px', width: '100%', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${totalCount > 0 ? (resolvedCount / totalCount) * 100 : 0}%`, backgroundColor: 'var(--color-success)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span>In Progress ({inProgressCount})</span>
                <strong>{totalCount > 0 ? Math.round((inProgressCount / totalCount) * 100) : 0}%</strong>
              </div>
              <div style={{ height: '10px', width: '100%', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${totalCount > 0 ? (inProgressCount / totalCount) * 100 : 0}%`, backgroundColor: 'var(--color-primary)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span>Pending Action ({pendingCount})</span>
                <strong>{totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0}%</strong>
              </div>
              <div style={{ height: '10px', width: '100%', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${totalCount > 0 ? (pendingCount / totalCount) * 100 : 0}%`, backgroundColor: 'var(--color-warning)' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Worker Leaderboard Section */}
      <Card
        title={`🏆 ${activeDept} Worker Leaderboard & Star Rankings`}
        subtitle="Recognition leaderboard identifying which worker earned top customer satisfaction ratings and efficiency scores"
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '10px 12px' }}>Rank</th>
                <th style={{ padding: '10px 12px' }}>Worker Name & Specialty</th>
                <th style={{ padding: '10px 12px' }}>Rating Score</th>
                <th style={{ padding: '10px 12px' }}>Shift Load</th>
                <th style={{ padding: '10px 12px' }}>Performance Tier</th>
              </tr>
            </thead>
            <tbody>
              {rankedWorkers.map((worker, index) => {
                const isFirst = index === 0;
                const isSecond = index === 1;
                const isThird = index === 2;

                return (
                  <tr
                    key={worker.id}
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

                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ fontWeight: '700', color: 'var(--color-text-main)', fontSize: '14px' }}>
                        {worker.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                        {worker.skill}
                      </div>
                    </td>

                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '800', color: '#f59e0b', fontSize: '14px' }}>
                        <Star size={16} fill="#f59e0b" color="#f59e0b" />
                        <span>{worker.rating || 4.7} / 5.0</span>
                      </div>
                    </td>

                    <td style={{ padding: '12px 10px' }}>
                      <span style={{ fontWeight: '600' }}>
                        {worker.availableHours}h Free
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginLeft: '4px' }}>
                        ({worker.currentTasks || 0} active)
                      </span>
                    </td>

                    <td style={{ padding: '12px 10px' }}>
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: '700',
                        backgroundColor: isFirst ? '#fde047' : isSecond ? '#e2e8f0' : '#f0fdf4',
                        color: isFirst ? '#854d0e' : isSecond ? '#334155' : 'var(--color-success)',
                      }}>
                        {isFirst ? '🏆 Top Performer' : isSecond ? '⭐ Exceptional' : '✓ Highly Reliable'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Customer Reviews & Feedback Feed */}
      <div style={{ marginTop: '24px' }}>
        <Card
          title={`Student & Faculty Verified Feedback (${deptFeedbacks.length} Reviews)`}
          subtitle="Direct feedback comments left by residents and campus staff following maintenance completions"
        >
          {deptFeedbacks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: 'var(--color-text-muted)' }}>
              <MessageSquare size={36} style={{ color: 'var(--color-text-light)', marginBottom: '8px' }} />
              <h4>No feedback reviews logged yet for this department</h4>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {deptFeedbacks.map((fb) => (
                <div
                  key={fb.id}
                  style={{
                    padding: '14px 18px',
                    backgroundColor: '#f8fafc',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                    <div>
                      <span style={{ fontWeight: '700', color: 'var(--color-text-main)', fontSize: '14px' }}>
                        {fb.studentName}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginLeft: '8px' }}>
                        • Handled by: <strong>{fb.workerName}</strong> (Ticket #{fb.ticketId})
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '2px', color: '#f59e0b' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < fb.rating ? '#f59e0b' : 'none'}
                            color="#f59e0b"
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{fb.date}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--color-text-main)', margin: 0, lineHeight: '1.5' }}>
                    "{fb.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default InChargeAnalyticsTab;
