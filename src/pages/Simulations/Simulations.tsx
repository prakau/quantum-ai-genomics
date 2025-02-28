import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import { SimulationResult } from '../../types';

const mockSimulationResults: SimulationResult[] = [
  {
    id: '1',
    experimentId: '1',
    timestamp: '2025-02-28T12:00:00Z',
    metrics: {
      pearsonCoefficient: 0.83,
      rmse: 0.05,
      stressToleranceImprovement: 14.2,
    },
    predictions: [
      { timepoint: 0, values: { growth: 1.0, stress: 0.0 } },
      { timepoint: 24, values: { growth: 1.2, stress: 0.3 } },
      { timepoint: 48, values: { growth: 1.5, stress: 0.5 } },
    ],
  },
  {
    id: '2',
    experimentId: '2',
    timestamp: '2025-02-28T13:00:00Z',
    metrics: {
      pearsonCoefficient: 0.81,
      rmse: 0.06,
      stressToleranceImprovement: 12.8,
    },
    predictions: [
      { timepoint: 0, values: { growth: 1.0, stress: 0.0 } },
      { timepoint: 24, values: { growth: 1.1, stress: 0.4 } },
      { timepoint: 48, values: { growth: 1.3, stress: 0.6 } },
    ],
  },
];

const Simulations: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);

  const startSimulation = () => {
    setIsSimulating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getStatusColor = (value: number, threshold: number = 0.8) => {
    if (value >= threshold) return 'success';
    if (value >= threshold - 0.1) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Quantum-Enhanced Simulations
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              New Simulation
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={startSimulation}
              disabled={isSimulating}
              sx={{ mb: 2 }}
            >
              Start Simulation
            </Button>
            {isSimulating && (
              <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={progress} />
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                  {progress}% Complete
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            {mockSimulationResults.map((result) => (
              <Card key={result.id}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Simulation Result #{result.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(result.timestamp).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Performance Metrics:
                      </Typography>
                      <Stack spacing={1}>
                        <Chip
                          label={`Correlation: ${result.metrics.pearsonCoefficient.toFixed(2)}`}
                          color={getStatusColor(result.metrics.pearsonCoefficient)}
                          size="small"
                        />
                        <Chip
                          label={`RMSE: ${result.metrics.rmse.toFixed(3)}`}
                          color={getStatusColor(1 - result.metrics.rmse)}
                          size="small"
                        />
                        <Chip
                          label={`Improvement: ${result.metrics.stressToleranceImprovement.toFixed(1)}%`}
                          color={getStatusColor(result.metrics.stressToleranceImprovement / 15)}
                          size="small"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Latest Predictions:
                      </Typography>
                      {result.predictions.slice(-1).map((prediction, index) => (
                        <Box key={index}>
                          <Typography variant="body2">
                            Growth Rate: {prediction.values.growth.toFixed(2)}x
                          </Typography>
                          <Typography variant="body2">
                            Stress Level: {(prediction.values.stress * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                      ))}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Simulations;
