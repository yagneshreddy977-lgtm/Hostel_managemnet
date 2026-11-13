import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCampus } from '../context/CampusContext';

/**
 * RouteSync Component
 * Automatically synchronizes the active persona role and department in context
 * based on the current URL pathname.
 */
function RouteSync() {
  const location = useLocation();
  const { currentRole, setCurrentRole, setInchargeDepartment } = useCampus();

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/worker')) {
      if (setCurrentRole && currentRole !== 'worker') setCurrentRole('worker');
    } else if (path.startsWith('/incharge')) {
      if (setCurrentRole && currentRole !== 'incharge') setCurrentRole('incharge');
      const parts = path.split('/');
      // Format: /incharge/:department
      if (parts[2] && setInchargeDepartment) {
        setInchargeDepartment(parts[2]);
      }
    } else if (path.startsWith('/admin')) {
      if (setCurrentRole && currentRole !== 'admin') setCurrentRole('admin');
    } else if (path.startsWith('/staff')) {
      if (setCurrentRole && currentRole !== 'staff') setCurrentRole('staff');
    } else if (path.startsWith('/student')) {
      if (setCurrentRole && currentRole !== 'student') setCurrentRole('student');
    }
  }, [location.pathname, currentRole, setCurrentRole, setInchargeDepartment]);

  return null;
}

export default RouteSync;
