import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ExperimentConfig, GeneAssembly } from '../../types';
import { ExperimentPipeline, ExperimentResult } from '../../utils/pipelines/experimentPipeline';
import { GenomicAnalysisResult } from '../../utils/pipelines/genomicAnalysis';
import { QuantumSimulationResult } from '../../utils/pipelines/simulationPipeline';

interface PipelineState {
  activeExperiments: ExperimentResult[];
  genomicAnalyses: GenomicAnalysisResult[];
  simulations: QuantumSimulationResult[];
  isProcessing: boolean;
  error: string | null;
}

const initialState: PipelineState = {
  activeExperiments: [],
  genomicAnalyses: [],
  simulations: [],
  isProcessing: false,
  error: null,
};

// Async thunks for pipeline operations
export const runExperiment = createAsyncThunk(
  'pipeline/runExperiment',
  async ({ config, assembly }: { config: ExperimentConfig; assembly: GeneAssembly }) => {
    const result = await ExperimentPipeline.runExperiment(config, assembly);
    return result;
  }
);

export const monitorExperiment = createAsyncThunk(
  'pipeline/monitorExperiment',
  async (experimentId: string) => {
    await ExperimentPipeline.monitorExperiment(experimentId);
    return experimentId;
  }
);

export const stopExperiment = createAsyncThunk(
  'pipeline/stopExperiment',
  async (experimentId: string) => {
    await ExperimentPipeline.stopExperiment(experimentId);
    return experimentId;
  }
);

const pipelineSlice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    removeExperiment: (state, action: PayloadAction<string>) => {
      state.activeExperiments = state.activeExperiments.filter(
        exp => exp.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Run Experiment
      .addCase(runExperiment.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
      })
      .addCase(runExperiment.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.activeExperiments.push(action.payload);
        state.genomicAnalyses.push(action.payload.genomicAnalysis);
        state.simulations.push(action.payload.simulation);
      })
      .addCase(runExperiment.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.error.message || 'Failed to run experiment';
      })
      // Monitor Experiment
      .addCase(monitorExperiment.rejected, (state, action) => {
        state.error = `Failed to monitor experiment: ${action.error.message}`;
      })
      // Stop Experiment
      .addCase(stopExperiment.fulfilled, (state, action) => {
        const experiment = state.activeExperiments.find(exp => exp.id === action.payload);
        if (experiment) {
          experiment.status = 'completed';
          experiment.endTime = new Date().toISOString();
        }
      });
  },
});

export const { clearError, removeExperiment } = pipelineSlice.actions;
export default pipelineSlice.reducer;
