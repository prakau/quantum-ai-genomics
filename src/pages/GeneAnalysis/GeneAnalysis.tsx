import React, { useState, useCallback } from 'react';
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
  Alert,
  LinearProgress,
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
} from 'recharts';
import { GeneAssembly } from '../../types';
import { usePipeline, useGenomicAnalyses } from '../../hooks/usePipeline';
import { mockGeneAssemblies } from '../../data/mockData';

const defaultExperimentConfig = {
  id: Math.random().toString(36).substr(2, 9),
  name: 'Gene Analysis Experiment',
  environmentalParams: {
    temperature: 25,
    humidity: 60,
    soilConditions: 'Controlled',
  },
  duration: 30,
  samplingFrequency: 24,
  baselineGenotypes: ['WT-Col-0'],
  targetTraits: ['stress_tolerance', 'growth_rate'],
};

const GeneAnalysis: React.FC = () => {
  const [selectedAssembly, setSelectedAssembly] = useState<string>('');
  const { startPipeline, isProcessing, error, clearError } = usePipeline();
  const analysisResults = useGenomicAnalyses();

  const handleAnalyze = useCallback(async () => {
    if (!selectedAssembly) return;

    const assembly = mockGeneAssemblies.find(a => a.id === selectedAssembly);
    if (!assembly) return;

    await startPipeline({
      experimentConfig: {
        ...defaultExperimentConfig,
        name: `Analysis of ${assembly.name}`,
      },
      assembly,
    });
  }, [selectedAssembly, startPipeline]);

  const renderAnalysisResults = () => {
    if (!analysisResults.length) return null;

    const latestResult = analysisResults[analysisResults.length - 1];
    const geneExpressionData = latestResult.metrics.geneExpression.map((value, index) => ({
      time: `T${index}`,
      expression: value,
    }));

    return (
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Analysis Results
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Gene Expression Levels</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={geneExpressionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="expression"
                    stroke="#8884d8"
                    name="Expression Level"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Regulatory Elements
              </Typography>
              {latestResult.metrics.regulatoryElements.map((element, index) => (
                <Typography key={index} variant="body2">
                  • {element}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Pathway Enrichment
              </Typography>
              {latestResult.metrics.pathwayEnrichment.map((pathway, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    {pathway.pathway}: {(pathway.score * 100).toFixed(1)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={pathway.score * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gene Analysis
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
              disabled={!selectedAssembly || isProcessing}
            >
              {isProcessing ? <CircularProgress size={24} /> : 'Analyze Assembly'}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          {renderAnalysisResults()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneAnalysis;
