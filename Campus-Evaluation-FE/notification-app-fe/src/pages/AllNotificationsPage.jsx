import React, { useState } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import NotificationFilter from '../components/NotificationFilter';
import { useNotifications } from '../hooks/useNotifications';
import { useViewedState } from '../hooks/useViewedState';

export default function AllNotificationsPage() {
  const [filterType, setFilterType] = useState('All');
  
  // Fetch all notifications with the selected filter type
  const { notifications, loading, error } = useNotifications({ 
    notification_type: filterType 
  });
  
  const { isViewed, markAsViewed } = useViewedState();

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleNotificationClick = (id) => {
    markAsViewed(id);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          All Notifications
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <NotificationFilter currentFilter={filterType} onFilterChange={handleFilterChange} />
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {notifications.length === 0 ? (
            <Typography color="text.secondary" textAlign="center" my={4}>
              No notifications found.
            </Typography>
          ) : (
            notifications.map((notif) => (
              <NotificationCard 
                key={notif.id} 
                notification={notif} 
                isRead={isViewed(notif.id)}
                onClick={handleNotificationClick}
              />
            ))
          )}
        </Box>
      )}
    </Container>
  );
}
