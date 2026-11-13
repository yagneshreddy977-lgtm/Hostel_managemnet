import React, { useState } from 'react';
import { 
  Activity, 
  Layers, 
  FileText, 
  Moon, 
  Sun, 
  Building2, 
  ShieldAlert, 
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import AstrixMetricCards from './AstrixMetricCards';
import AstrixPipeline from './AstrixPipeline';
import AstrixStreamTable from './AstrixStreamTable';
import AstrixReports from './AstrixReports';
import './AstrixDashboard.css';

/**
 * AstrixDashboard Master Component
 * Flagship enterprise-grade operations command center adapted from the Watermelon Astrix Dashboard registry.
 */
export default function AstrixDashboard({
  complaints = [],
  workers = [],
  onAssignWorker,
  initialDepartment = 'all',
}) {
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'queue' | 'reports'
  const [selectedDept, setSelectedDept] = useState(initialDepartment);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dateRange, setDateRange] = useState('last-7-days');
  const [selectedPipelineStage, setSelectedPipelineStage] = useState(null);

  // Scoped complaints based on selected department
  const scopedComplaints = selectedDept === 'all'
    ? complaints
    : complaints.filter(c => c.department?.toLowerCase() === selectedDept.toLowerCase());

  const scopedWorkers = selectedDept === 'all'
    ? workers
    : workers.filter(w => w.department?.toLowerCase() === selectedDept.toLowerCase());

  const departments = ['All', 'Electrical', 'Plumbing', 'IT', 'Civil', 'Housekeeping', 'Security'];

  return (
    <div className={`astrix-dashboard-root ${isDarkMode ? 'dark-theme' : ''}`}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px' }}>
        
        {/* Top Header & System Controls */}
        <div className="astrix-header">
          <div className="astrix-title-area">
            <h1>
              <Zap size={24} style={{ color: 'var(--astrix-primary)' }} />
              <span>Astrix Operations Command Center</span>
            </h1>
            <p>
              Autonomous campus workflow intelligence, live ticket pipeline, and institutional workforce telemetry.
            </p>
          </div>

          <div className="astrix-actions">
            {/* Department Scope Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={16} style={{ color: 'var(--astrix-text-muted)' }} />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                style={{
                  height: '40px',
                  padding: '0 12px',
                  borderRadius: 'var(--astrix-radius-sm)',
                  border: '1px solid var(--astrix-border-strong)',
                  backgroundColor: 'var(--astrix-surface)',
                  color: 'var(--astrix-text-primary)',
                  fontSize: '13px',
                  fontWeight: '600',
                  outline: 'none',
                  cursor: 'pointer',
                }}
                aria-label="Filter scope by department"
              >
                {departments.map((d) => (
                  <option key={d} value={d.toLowerCase()}>
                    {d === 'All' ? 'Campus-Wide (All Depts)' : `${d} Department`}
                  </option>
                ))}
              </select>
            </div>

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              className="astrix-btn-icon"
              onClick={() => setIsDarkMode(prev => !prev)}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Astrix theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Sub-View Navigation Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--astrix-border)',
          paddingBottom: '12px',
          overflowX: 'auto',
        }}>
          <button
            type="button"
            className={`astrix-filter-pill ${activeTab === 'pipeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('pipeline')}
            style={{ fontSize: '14px', padding: '8px 16px' }}
          >
            <Activity size={16} />
            <span>Live Pipeline & Stream</span>
          </button>

          <button
            type="button"
            className={`astrix-filter-pill ${activeTab === 'queue' ? 'active' : ''}`}
            onClick={() => setActiveTab('queue')}
            style={{ fontSize: '14px', padding: '8px 16px' }}
          >
            <Layers size={16} />
            <span>Operations Queue</span>
            <span className="badge">{scopedComplaints.length}</span>
          </button>

          <button
            type="button"
            className={`astrix-filter-pill ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
            style={{ fontSize: '14px', padding: '8px 16px' }}
          >
            <FileText size={16} />
            <span>SLA Audit & Reports</span>
          </button>
        </div>

        {/* TAB 1: Live Pipeline & Stream (Overview) */}
        {activeTab === 'pipeline' && (
          <div>
            {/* KPI Cards */}
            <AstrixMetricCards
              complaints={scopedComplaints}
              workers={scopedWorkers}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />

            {/* Live Visual Flowchart Pipeline */}
            <AstrixPipeline
              complaints={scopedComplaints}
              workers={scopedWorkers}
              selectedStage={selectedPipelineStage}
              onStageSelect={setSelectedPipelineStage}
            />

            {/* Live Stream Table */}
            <AstrixStreamTable
              complaints={scopedComplaints}
              workers={scopedWorkers}
              onAssignWorker={onAssignWorker}
              stageFilter={selectedPipelineStage}
              onClearStageFilter={() => setSelectedPipelineStage(null)}
            />
          </div>
        )}

        {/* TAB 2: Dedicated Queue View */}
        {activeTab === 'queue' && (
          <AstrixStreamTable
            complaints={scopedComplaints}
            workers={scopedWorkers}
            onAssignWorker={onAssignWorker}
            stageFilter={selectedPipelineStage}
            onClearStageFilter={() => setSelectedPipelineStage(null)}
          />
        )}

        {/* TAB 3: SLA Audit & Reports */}
        {activeTab === 'reports' && (
          <AstrixReports
            complaints={scopedComplaints}
            workers={scopedWorkers}
          />
        )}

      </div>
    </div>
  );
}
