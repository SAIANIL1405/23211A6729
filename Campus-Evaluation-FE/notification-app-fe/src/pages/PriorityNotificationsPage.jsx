import React, { useState } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import NotificationFilter from '../components/NotificationFilter';
import { useNotifications } from '../hooks/useNotifications';
import { useViewedState } from '../hooks/useViewedState';

export default function PriorityNotificationsPage() {
  const [filterType, setFilterType] = useState('All');
  const [limit, setLimit] = useState(10);
  
  // Fetch priority notifications with limit and filter
  const { notifications, loading, error } = useNotifications({ 
    notification_type: filterType,
    limit: limit 
  });
  
  const { isViewed, markAsViewed } = useViewedState();

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handleNotificationClick = (id) => {
    markAsViewed(id);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Priority Inbox
        </Typography>
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="limit-select-label">Top 'n'</InputLabel>
          <Select
            labelId="limit-select-label"
            value={limit}
            label="Top 'n'"
            onChange={handleLimitChange}
          >
            <MenuItem value={5}>Top 5</MenuItem>
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={15}>Top 15</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>
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
              No priority notifications found.
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
