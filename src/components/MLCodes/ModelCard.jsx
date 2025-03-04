import React from 'react';
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const ScoreBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1.5),
  background: 'rgba(99, 102, 241, 0.1)',
  fontSize: '0.9rem',
  gap: theme.spacing(1),
  flex: 1,
  '& span:last-child': {
    marginLeft: 'auto',
    fontWeight: 600,
    color: theme.palette.primary.main,
  }
}));

const ModelCard = ({ model, onSelect, selectedModelName }) => {
  const { name, readability, functionality, performance, description } = model;
  const isSelected = selectedModelName === name;

  return (
    <Card sx={{ 
      p: 2,
      height: '100%',
      backgroundColor: 'background.paper',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 8,
        transition: 'transform 0.2s, box-shadow 0.2s',
        backgroundColor: 'background.paper',
      }
    }}>
      <CardContent sx={{ p: 1, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" color="text.primary">{name}</Typography>
          <Typography variant="body1" color="primary.main">{performance}%</Typography>
        </Box>
        
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <ScoreBadge>
              📖 Readability
              <span>{readability}/10</span>
            </ScoreBadge>
          </Grid>
          <Grid item xs={6}>
            <ScoreBadge>
              ⚙️ Functionality
              <span>{functionality}/10</span>
            </ScoreBadge>
          </Grid>
        </Grid>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Button 
          variant="contained" 
          fullWidth 
          onClick={() => onSelect(name)}
          sx={{
            bgcolor: isSelected ? '#10b981' : 'primary.main',
            '&:hover': {
              bgcolor: isSelected ? '#059669' : 'primary.hover',
            }
          }}
        >
          {isSelected ? 'Selected' : 'Select Model'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModelCard;
