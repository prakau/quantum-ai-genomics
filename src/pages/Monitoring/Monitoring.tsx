import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Thermostat,
  WaterDrop,
  WbSunny,
  Speed,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { SensorData } from '../../types';

const mockSensorData: SensorData[] = [
  {
    id: '1',
    sensorId: 'FIELD-001-TEMP',
    timestamp: new Date().toISOString(),
    measurements: {
      temperature: 25.4,
      humidity: 65.2,
      soilMoisture: 0.42,
      lightIntensity: 850,
    },
    qualityIndicator: 0.95,
  },
  {
    id: '2',
    sensorId: 'FIELD-002-TEMP',
    timestamp: new Date().toISOString(),
    measurements: {
      temperature: 26.1,
      humidity: 62.8,
      soilMoisture: 0.38,
      lightIntensity: 820,
    },
    qualityIndicator: 0.92,
  },
];

const SensorCard: React.FC<{
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, unit, icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ mr: 1, color }}>{icon}</Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Typography variant="h4" gutterBottom>
        {value.toFixed(1)}
        <Typography variant="body1" component="span" color="text.secondary">
          {' '}
          {unit}
        </Typography>
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(value / 100) * 100}
        sx={{ height: 8, borderRadius: 4 }}
      />
    </CardContent>
  </Card>
);

const Monitoring: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>(mockSensorData);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      const newData = mockSensorData.map(sensor => ({
        ...sensor,
        measurements: {
          ...sensor.measurements,
          temperature: sensor.measurements.temperature + (Math.random() - 0.5),
          humidity: sensor.measurements.humidity + (Math.random() - 0.5),
          soilMoisture: Math.max(0, Math.min(1, sensor.measurements.soilMoisture + (Math.random() - 0.5) * 0.1)),
          lightIntensity: sensor.measurements.lightIntensity + (Math.random() - 0.5) * 50,
        },
      }));
      setSensorData(newData);
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Environmental Monitoring</Typography>
        <Box>
          <IconButton onClick={refreshData} disabled={isLoading}>
            <RefreshIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </Typography>
        </Box>
      </Box>

      {sensorData.map((sensor) => (
        <Paper key={sensor.id} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Sensor: {sensor.sensorId}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <SensorCard
                title="Temperature"
                value={sensor.measurements.temperature}
                unit="°C"
                icon={<Thermostat />}
                color="#f44336"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SensorCard
                title="Humidity"
                value={sensor.measurements.humidity}
                unit="%"
                icon={<WaterDrop />}
                color="#2196f3"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SensorCard
                title="Soil Moisture"
                value={sensor.measurements.soilMoisture * 100}
                unit="%"
                icon={<Speed />}
                color="#4caf50"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SensorCard
                title="Light Intensity"
                value={sensor.measurements.lightIntensity}
                unit="lux"
                icon={<WbSunny />}
                color="#ff9800"
              />
            </Grid>
          </Grid>

          {sensor.qualityIndicator < 0.9 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Sensor data quality below threshold. Maintenance may be required.
            </Alert>
          )}
        </Paper>
      ))}

      <Stack spacing={2}>
        {/* Placeholder for historical data charts */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            24-Hour Trends
          </Typography>
          <Box sx={{ height: 200, bgcolor: 'background.default', p: 2 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              Historical data visualization will be implemented here
            </Typography>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default Monitoring;
