import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { 
  runExperiment, 
  monitorExperiment, 
  stopExperiment, 
  clearError 
} from '../store/slices/pipelineSlice';
import { ExperimentConfig, GeneAssembly, UsePipelineResult } from '../types';

export const usePipeline = (): UsePipelineResult => {
  const dispatch = useDispatch<AppDispatch>();
  const { isProcessing, error } = useSelector((state: RootState) => state.pipeline);

  const startPipeline = useCallback(
    async (config: { experimentConfig: ExperimentConfig; assembly: GeneAssembly }) => {
      try {
        await dispatch(runExperiment({ 
          config: config.experimentConfig, 
          assembly: config.assembly 
        })).unwrap();
        // Start monitoring the experiment
        const experimentId = config.experimentConfig.id;
        await dispatch(monitorExperiment(experimentId)).unwrap();
      } catch (error) {
        console.error('Pipeline execution failed:', error);
      }
    },
    [dispatch]
  );

  const stopPipelineExecution = useCallback(
    async (id: string) => {
      try {
        await dispatch(stopExperiment(id)).unwrap();
      } catch (error) {
        console.error('Failed to stop pipeline:', error);
      }
    },
    [dispatch]
  );

  const clearPipelineError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    isProcessing,
    error,
    startPipeline,
    stopPipeline: stopPipelineExecution,
    clearError: clearPipelineError,
  };
};

// Selector hooks for different pipeline results
export const useExperimentResults = () => {
  return useSelector((state: RootState) => state.pipeline.activeExperiments);
};

export const useGenomicAnalyses = () => {
  return useSelector((state: RootState) => state.pipeline.genomicAnalyses);
};

export const useSimulationResults = () => {
  return useSelector((state: RootState) => state.pipeline.simulations);
};

// Export for module resolution
export default usePipeline;
