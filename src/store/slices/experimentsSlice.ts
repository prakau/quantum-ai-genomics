import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExperimentConfig, SimulationResult } from '../../types';

interface ExperimentsState {
  experiments: ExperimentConfig[];
  activeExperiment: ExperimentConfig | null;
  simulationResults: SimulationResult[];
  loading: boolean;
  error: string | null;
}

const initialState: ExperimentsState = {
  experiments: [],
  activeExperiment: null,
  simulationResults: [],
  loading: false,
  error: null,
};

const experimentsSlice = createSlice({
  name: 'experiments',
  initialState,
  reducers: {
    setExperiments(state, action: PayloadAction<ExperimentConfig[]>) {
      state.experiments = action.payload;
    },
    setActiveExperiment(state, action: PayloadAction<ExperimentConfig>) {
      state.activeExperiment = action.payload;
    },
    addExperiment(state, action: PayloadAction<ExperimentConfig>) {
      state.experiments.push(action.payload);
    },
    updateExperiment(state, action: PayloadAction<ExperimentConfig>) {
      const index = state.experiments.findIndex(exp => exp.id === action.payload.id);
      if (index !== -1) {
        state.experiments[index] = action.payload;
      }
    },
    addSimulationResult(state, action: PayloadAction<SimulationResult>) {
      state.simulationResults.push(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setExperiments,
  setActiveExperiment,
  addExperiment,
  updateExperiment,
  addSimulationResult,
  setLoading,
  setError,
} = experimentsSlice.actions;

export default experimentsSlice.reducer;
