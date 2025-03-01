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

// Pipeline-related types
export interface AnalysisPipeline {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  progress: number;
  result?: any;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startTime?: string;
  endTime?: string;
  error?: string;
  result?: any;
}

export interface PipelineMetrics {
  executionTime: number;
  memoryUsage: number;
  cpuUtilization: number;
  quantumResourceUsage: number;
}

export interface AnalysisResult {
  id: string;
  pipelineId: string;
  timestamp: string;
  metrics: PipelineMetrics;
  stages: PipelineStage[];
  output: {
    data: any;
    visualizations: {
      type: string;
      data: any;
      config: any;
    }[];
  };
}

// Hook return types
export interface UsePipelineResult {
  isProcessing: boolean;
  error: string | null;
  startPipeline: (config: any) => Promise<void>;
  stopPipeline: (id: string) => Promise<void>;
  clearError: () => void;
}

// Utility types
export type PipelineStatus = 'idle' | 'running' | 'completed' | 'failed';
export type AnalysisType = 'genomic' | 'proteomic' | 'metabolomic' | 'transcriptomic';
export type VisualizationType = 'heatmap' | 'scatter' | 'network' | 'pathway';
