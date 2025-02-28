export interface GeneAssembly {
  id: string;
  name: string;
  components: string[];
  predictedPerformance: {
    stressTolerance: number;
    growthRate: number;
    yield: number;
  };
  validationStatus: 'pending' | 'in_progress' | 'validated' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface ExperimentConfig {
  id: string;
  name: string;
  environmentalParams: {
    temperature: number;
    humidity: number;
    soilConditions: string;
  };
  duration: number;
  samplingFrequency: number;
  baselineGenotypes: string[];
  targetTraits: string[];
}

export interface SimulationResult {
  id: string;
  experimentId: string;
  timestamp: string;
  metrics: {
    pearsonCoefficient: number;
    rmse: number;
    stressToleranceImprovement: number;
  };
  predictions: Array<{
    timepoint: number;
    values: Record<string, number>;
  }>;
}

export interface SensorData {
  id: string;
  sensorId: string;
  timestamp: string;
  measurements: {
    temperature: number;
    humidity: number;
    soilMoisture: number;
    lightIntensity: number;
  };
  qualityIndicator: number;
}
