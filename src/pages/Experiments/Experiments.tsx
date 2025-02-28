import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ExperimentConfig } from '../../types';

const mockExperiments: ExperimentConfig[] = [
  {
    id: '1',
    name: 'Drought Resistance Study',
    environmentalParams: {
      temperature: 30,
      humidity: 45,
      soilConditions: 'Sandy loam',
    },
    duration: 30,
    samplingFrequency: 24,
    baselineGenotypes: ['WT-Col-0', 'drought-1'],
    targetTraits: ['water-use-efficiency', 'root-depth'],
  },
  {
    id: '2',
    name: 'Salt Tolerance Analysis',
    environmentalParams: {
      temperature: 28,
      humidity: 60,
      soilConditions: 'Saline',
    },
    duration: 45,
    samplingFrequency: 12,
    baselineGenotypes: ['WT-Col-0', 'salt-1'],
    targetTraits: ['ion-homeostasis', 'growth-rate'],
  },
];

const Experiments: React.FC = () => {
  const [experiments] = useState<ExperimentConfig[]>(mockExperiments);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Experiments</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {/* TODO: Implement new experiment dialog */}}
        >
          New Experiment
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Environmental Parameters</TableCell>
              <TableCell>Duration (days)</TableCell>
              <TableCell>Target Traits</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experiments.map((experiment) => (
              <TableRow key={experiment.id}>
                <TableCell>{experiment.name}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    Temp: {experiment.environmentalParams.temperature}°C
                  </Typography>
                  <Typography variant="body2">
                    Humidity: {experiment.environmentalParams.humidity}%
                  </Typography>
                  <Typography variant="body2">
                    Soil: {experiment.environmentalParams.soilConditions}
                  </Typography>
                </TableCell>
                <TableCell>{experiment.duration}</TableCell>
                <TableCell>
                  {experiment.targetTraits.map((trait) => (
                    <Chip
                      key={trait}
                      label={trait}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {/* TODO: Implement view details */}}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Experiments;
