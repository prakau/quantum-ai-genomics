import { configureStore } from '@reduxjs/toolkit';
import experimentsReducer from './slices/experimentsSlice';
import pipelineReducer from './slices/pipelineSlice';

export const store = configureStore({
  reducer: {
    experiments: experimentsReducer,
    pipeline: pipelineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
