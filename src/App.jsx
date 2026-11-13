import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CampusProvider } from './context/CampusContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

/**
 * Root Application Component
 * Wraps the app shell with Router and CampusContext state providers.
 */
function App() {
  return (
    <BrowserRouter>
      <CampusProvider>
        <AppRoutes />
      </CampusProvider>
    </BrowserRouter>
  );
}

export default App;
export { AppRoutes };
