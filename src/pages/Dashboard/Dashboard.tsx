import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minHeight: 200,
}));

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom>
              Active Experiments
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track your ongoing experiments and their progress
            </Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom>
              Gene Analysis Overview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View recent genetic optimization results
            </Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom>
              Environmental Monitoring
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time sensor data and alerts
            </Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom>
              Recent Simulations
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Latest quantum-enhanced simulation results
            </Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom>
              Performance Metrics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              System performance and optimization stats
            </Typography>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start new experiments or analyses
            </Typography>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
