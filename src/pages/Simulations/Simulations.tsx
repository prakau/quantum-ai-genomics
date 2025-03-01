import React, { useState, useCallback } from 'react';
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
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { usePipeline, useSimulationResults } from '../../hooks/usePipeline';
import { mockGeneAssemblies, getRandomColor } from '../../data/mockData';

const Simulations: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { startPipeline, isProcessing, error, clearError } = usePipeline();
  const simulationResults = useSimulationResults();

  const startSimulation = useCallback(async () => {
    setIsSimulating(true);
    setProgress(0);

    const mockConfig = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Quantum Simulation',
      environmentalParams: {
        temperature: 25,
        humidity: 60,
        soilConditions: 'Controlled',
      },
      duration: 96,
      samplingFrequency: 24,
      baselineGenotypes: ['WT-Col-0'],
      targetTraits: ['stress_tolerance', 'growth_rate'],
    };

    // Use first gene assembly for simulation
    await startPipeline({
      experimentConfig: mockConfig,
      assembly: mockGeneAssemblies[0],
    });

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
  }, [startPipeline]);

  const renderQuantumMetrics = (result: any) => {
    const data = [
      { name: 'Coherence', value: result.quantumMetrics.coherenceTime },
      { name: 'Gate Error', value: result.quantumMetrics.gateErrors * 100 },
      { name: 'Volume', value: result.quantumMetrics.quantumVolume / 10 },
      { name: 'Circuit', value: result.quantumMetrics.circuitDepth / 2 },
    ];

    return (
      <Box sx={{ height: 300, width: '100%' }}>
        <Typography variant="subtitle2" gutterBottom>
          Quantum Computing Metrics
        </Typography>
        <ResponsiveContainer>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar
              name="Quantum Metrics"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  const renderOptimizationResults = (result: any) => {
    const data = result.optimizationMetrics.energyLandscape.map((value: number, index: number) => ({
      step: index,
      energy: value,
    }));

    return (
      <Box sx={{ height: 300, width: '100%' }}>
        <Typography variant="subtitle2" gutterBottom>
          Energy Landscape Optimization
        </Typography>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="step" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="#82ca9d"
              name="Energy Level"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  const renderPredictions = (result: any) => {
    return (
      <Box sx={{ height: 300, width: '100%' }}>
        <Typography variant="subtitle2" gutterBottom>
          Trait Predictions Over Time
        </Typography>
        <ResponsiveContainer>
          <LineChart data={result.results}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timepoint" />
            <YAxis />
            <Tooltip />
            <Legend />
            {result.results[0].predictions.map((pred: any) => (
              <Line
                key={pred.trait}
                type="monotone"
                data={result.results.map((r: any) => ({
                  timepoint: r.timepoint,
                  value: r.predictions.find((p: any) => p.trait === pred.trait).value,
                }))}
                dataKey="value"
                name={pred.trait}
                stroke={getRandomColor()}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Quantum-Enhanced Simulations
      </Typography>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
              disabled={isSimulating || isProcessing}
              sx={{ mb: 2 }}
            >
              {isSimulating || isProcessing ? (
                <CircularProgress size={24} />
              ) : (
                'Start Simulation'
              )}
            </Button>
            {(isSimulating || isProcessing) && (
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
            {simulationResults.map((result) => (
              <Card key={result.id}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Simulation Results
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(result.timestamp).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {renderQuantumMetrics(result)}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {renderOptimizationResults(result)}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {renderPredictions(result)}
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
