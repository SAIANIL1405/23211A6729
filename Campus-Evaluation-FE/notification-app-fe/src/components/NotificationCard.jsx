import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';

const getTypeColor = (type) => {
  switch (type?.toLowerCase()) {
    case 'event': return 'secondary';
    case 'result': return 'success';
    case 'placement': return 'primary';
    default: return 'default';
  }
};

const getTypeIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'event': return <EventIcon fontSize="small" />;
    case 'result': return <EmojiEventsIcon fontSize="small" />;
    case 'placement': return <WorkIcon fontSize="small" />;
    default: return null;
  }
};

export default function NotificationCard({ notification, isRead, onClick }) {
  const { id, type, message, createdAt } = notification;

  return (
    <Card 
      onClick={() => onClick && onClick(id)}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        bgcolor: isRead ? 'background.paper' : '#f0f7ff',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        },
        borderLeft: isRead ? '4px solid transparent' : '4px solid #1976d2'
      }}
    >
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: isRead ? 'normal' : 'bold', mb: 1 }}>
          {message}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip 
            icon={getTypeIcon(type)} 
            label={type} 
            color={getTypeColor(type)} 
            size="small" 
            variant={isRead ? "outlined" : "filled"}
          />
          <Typography variant="caption" color="text.secondary">
            {new Date(createdAt).toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
