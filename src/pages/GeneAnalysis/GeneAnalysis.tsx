import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { GeneAssembly } from '../../types';

const mockGeneAssemblies: GeneAssembly[] = [
  {
    id: '1',
    name: 'Enhanced Drought Assembly v1',
    components: ['DREB1A', 'HSF3', 'ABA1'],
    predictedPerformance: {
      stressTolerance: 0.85,
      growthRate: 0.92,
      yield: 0.88,
    },
    validationStatus: 'validated',
    createdAt: '2025-02-28T10:00:00Z',
    updatedAt: '2025-02-28T14:30:00Z',
  },
  {
    id: '2',
    name: 'Salt Resistance Assembly v2',
    components: ['SOS1', 'NHX1', 'HKT1'],
    predictedPerformance: {
      stressTolerance: 0.78,
      growthRate: 0.85,
      yield: 0.82,
    },
    validationStatus: 'in_progress',
    createdAt: '2025-02-28T11:00:00Z',
    updatedAt: '2025-02-28T15:30:00Z',
  },
];

const GeneAnalysis: React.FC = () => {
  const [selectedAssembly, setSelectedAssembly] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis process
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gene Analysis
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Gene Assembly Selection
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Assembly</InputLabel>
              <Select
                value={selectedAssembly}
                label="Select Assembly"
                onChange={(e) => setSelectedAssembly(e.target.value)}
              >
                {mockGeneAssemblies.map((assembly) => (
                  <MenuItem key={assembly.id} value={assembly.id}>
                    {assembly.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              fullWidth
              onClick={handleAnalyze}
              disabled={!selectedAssembly || isAnalyzing}
            >
              {isAnalyzing ? <CircularProgress size={24} /> : 'Analyze Assembly'}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {mockGeneAssemblies.map((assembly) => (
              <Grid item xs={12} key={assembly.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {assembly.name}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2">Components:</Typography>
                        <Typography variant="body2">
                          {assembly.components.join(', ')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2">Performance Metrics:</Typography>
                        <Typography variant="body2">
                          Stress Tolerance: {(assembly.predictedPerformance.stressTolerance * 100).toFixed(1)}%
                        </Typography>
                        <Typography variant="body2">
                          Growth Rate: {(assembly.predictedPerformance.growthRate * 100).toFixed(1)}%
                        </Typography>
                        <Typography variant="body2">
                          Yield: {(assembly.predictedPerformance.yield * 100).toFixed(1)}%
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneAnalysis;
