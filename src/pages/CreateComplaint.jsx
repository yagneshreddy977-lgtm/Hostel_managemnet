import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useCampus } from '../context/CampusContext';
import { 
  routeCategoryToDepartment, 
  calculateExpectedResolution, 
  DEPARTMENT_DETAILS 
} from '../utils/departmentRouting';
import { 
  Send, 
  ArrowLeft, 
  Building, 
  AlertCircle, 
  Clock, 
  User 
} from 'lucide-react';
import '../components/components.css';

/**
 * CreateComplaint Component
 * Props:
 * - currentUser: Logged in user profile
 * - onSaveComplaint: Function called with newly created complaint
 * - onCancel: Function called to cancel/return
 */
function CreateComplaint({ 
  currentUser: propUser, 
  onSaveComplaint, 
  onCancel 
}) {
  const navigate = useNavigate();
  const campus = useCampus();

  const currentUser = propUser || campus.currentUser || {
    name: 'Aman Sharma',
    role: 'student',
    department: 'Hostel Department',
    rollNo: 'CS2023-042',
  };
  const knownLocations = [...new Set([
    currentUser.unit,
    ...(campus.complaints || []).map((complaint) => complaint.location),
  ].filter(Boolean))];

  // Controlled form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electrical');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  // Simple validation error state
  const [errorMessage, setErrorMessage] = useState('');

  // Automatically calculate target department and estimated turnaround using centralized routing logic
  const targetDepartment = routeCategoryToDepartment(category);
  const departmentInfo = DEPARTMENT_DETAILS[targetDepartment];
  const estimatedTime = calculateExpectedResolution(category, priority);

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();

    // 1. Basic validation
    if (!title.trim()) {
      setErrorMessage('Please enter what the problem is (Complaint Title).');
      return;
    }
    if (!location.trim()) {
      setErrorMessage('Please specify where the issue is located (e.g. Block B Room 302 or Lab 304).');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Please provide a brief description of the issue.');
      return;
    }

    // 2. Clear any previous error
    setErrorMessage('');

    // 3. Format current date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    // 4. Construct the clean complaint object
    const newComplaint = {
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      title: title.trim(),
      category: category,
      department: targetDepartment,
      originDepartment: currentUser.department || 'Hostel Department',
      location: location.trim(),
      description: description.trim(),
      priority: priority,
      status: 'Pending',
      createdAt: formattedDate,
      expectedResolution: estimatedTime,
      studentName: currentUser.name,
      submittedBy: currentUser.name,
      userRole: currentUser.role || 'student',
      studentRollNo: currentUser.rollNo || (currentUser.role === 'staff' ? 'FAC-CS-104' : 'CS2023-042'),
      assignedWorker: null,
    };

    // 5. Send up to parent state or context
    if (onSaveComplaint) {
      onSaveComplaint(newComplaint);
    } else if (campus.handleSaveComplaint) {
      campus.handleSaveComplaint(newComplaint);
      navigate(`/complaints/${newComplaint.id}`);
    } else {
      navigate('/student');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Top Back Action */}
      <div style={{ marginBottom: '18px' }}>
        <button
          type="button"
          onClick={handleCancel}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-muted)',
            fontSize: '14px',
            cursor: 'pointer',
            padding: '4px 0',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Complaints</span>
        </button>
      </div>

      <Card
        title="Create New Complaint"
        subtitle="Fill in the details below to report a maintenance or service issue."
      >
        {/* Validation Error Alert */}
        {errorMessage && (
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--color-danger-light)',
              color: 'var(--color-danger-hover)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '20px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* User Persona Banner */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              fontSize: '13px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} color="var(--color-primary)" />
              <span>Reporting as: <strong>{currentUser.name}</strong></span>
              <span style={{ color: 'var(--color-text-muted)' }}>({currentUser.rollNo || 'ID: 104'})</span>
            </div>
            <div style={{ color: 'var(--color-text-muted)' }}>
              Affiliation: <strong>{currentUser.department}</strong>
            </div>
          </div>

          {/* 1. Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="complaint-title">
              Complaint Title *
            </label>
            <input
              id="complaint-title"
              type="text"
              className="form-input"
              placeholder="e.g. Water leaking under washbasin, Wi-Fi not connecting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 2. Category & Target Department Routing Preview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="complaint-category">
                Issue category *
              </label>
              <select
                id="complaint-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Electrical">Electrical (Lights, Fans, Sockets, Wiring)</option>
                <option value="Plumbing">Plumbing (Pipes, Taps, Leakages, Drains)</option>
                <option value="IT & Wi-Fi">Internet & Wi-Fi (Routers, LAN Ports, Speed)</option>
                <option value="Housekeeping">Housekeeping (Cleaning, Dustbins, Hygiene)</option>
                <option value="Civil Maintenance">Furniture / Civil (Desks, Doors, Locks, Windows)</option>
                <option value="Security">Security (Access Gates, CCTV, Safety)</option>
              </select>
            </div>

            {/* Target Department Routing Preview Card */}
            <div className="form-group">
              <label className="form-label">
                Will route to
              </label>
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: 'var(--color-success-light)',
                  border: '1px solid var(--color-success-border)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  minHeight: '42px',
                }}
              >
                <Building size={18} color="var(--color-success)" />
                <div style={{ fontSize: '13px' }}>
                  <span style={{ color: 'var(--color-success)', fontWeight: '600' }}>{departmentInfo?.name || targetDepartment}</span>
                  <span style={{ color: 'var(--color-text-muted)', marginLeft: '6px', fontSize: '11px' }}>({departmentInfo?.code || 'GEN'})</span>
                </div>
              </div>
            </div>
          </div>

          {/* SLA Turnaround Estimate Notice */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              marginBottom: '16px',
              backgroundColor: 'var(--color-bg-subtle)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Clock size={14} color="var(--color-primary)" />
            <span>
              Typical target: <strong>{estimatedTime}</strong> (department SLA: <strong>{departmentInfo?.defaultSlaHours || 12} hours</strong>). This is an estimate, not a confirmed appointment.
            </span>
          </div>

          {/* 3. Location */}
          <div className="form-group">
            <label className="form-label" htmlFor="complaint-location">
              Exact location *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="complaint-location"
                type="text"
                className="form-input"
                list="known-complaint-locations"
                placeholder="e.g. Hostel Block B, Room 302 or Faculty Wing Cabin 12"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <datalist id="known-complaint-locations">
                {knownLocations.map((knownLocation) => <option key={knownLocation} value={knownLocation} />)}
              </datalist>
            </div>
            <p className="form-helper">Include the block and room, or name the shared area. Choose a suggested location or type your own.</p>
          </div>

          {/* 4. Priority Selection */}
          <div className="form-group">
            <label className="form-label">Priority Level</label>
            <div role="group" aria-label="Choose issue priority" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {['Low', 'Medium', 'High'].map((p) => {
                const isSelected = priority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    aria-pressed={isSelected}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                      backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-bg-card)',
                      color: isSelected ? 'var(--color-primary)' : 'var(--color-text-main)',
                      fontWeight: isSelected ? '600' : '400',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontSize: '13px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {p === 'Low' && '🟢 Low'}
                    {p === 'Medium' && '🟡 Medium'}
                    {p === 'High' && '🔴 High (Urgent)'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="complaint-desc">
              Detailed Description *
            </label>
            <textarea
              id="complaint-desc"
              className="form-textarea"
              rows={4}
              placeholder="What is happening, when did it start, and how is it affecting you? Mention any relevant details."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
            />
            <div className="form-field-footer">
              <span className="form-helper">For immediate danger, contact campus security or the hostel warden directly. This form is not an emergency channel.</span>
              <span className="form-character-count">{description.length}/1000</span>
            </div>
          </div>

          {/* 6. Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={Send}
            >
              Submit Complaint
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default CreateComplaint;
