import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExperimentConfig, SimulationResult, GeneAssembly } from '../../types';
import { ExperimentResult } from '../../utils/pipelines/experimentPipeline';

interface ExperimentsState {
  experiments: ExperimentConfig[];
  activeExperiment: ExperimentConfig | null;
  simulationResults: SimulationResult[];
  experimentResults: ExperimentResult[];
  geneAssemblies: GeneAssembly[];
  loading: boolean;
  error: string | null;
}

const initialState: ExperimentsState = {
  experiments: [],
  activeExperiment: null,
  simulationResults: [],
  experimentResults: [],
  geneAssemblies: [],
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
    addExperimentResult(state, action: PayloadAction<ExperimentResult>) {
      state.experimentResults.push(action.payload);
    },
    setGeneAssemblies(state, action: PayloadAction<GeneAssembly[]>) {
      state.geneAssemblies = action.payload;
    },
    addGeneAssembly(state, action: PayloadAction<GeneAssembly>) {
      state.geneAssemblies.push(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setExperiments,
  setActiveExperiment,
  addExperiment,
  updateExperiment,
  addSimulationResult,
  addExperimentResult,
  setGeneAssemblies,
  addGeneAssembly,
  setLoading,
  setError,
  clearError,
} = experimentsSlice.actions;

export default experimentsSlice.reducer;
