import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AllNotificationsPage from './pages/AllNotificationsPage';
import PriorityNotificationsPage from './pages/PriorityNotificationsPage';
import { LogDebug } from '../../logging-middleware/index.js';

function App() {
  // Log application startup
  React.useEffect(() => {
    LogDebug('frontend', 'component', 'App component mounted, Router initialized');
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AllNotificationsPage />} />
        <Route path="priority" element={<PriorityNotificationsPage />} />
      </Route>
    </Routes>
  );
}

export default App;