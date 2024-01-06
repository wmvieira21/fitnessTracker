import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainingState } from './training.reducer';

export const getTrainingState = createFeatureSelector('trainingState');

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);

export const getCompletedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.completedExercises
);

export const getActiveExercise = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeExercise
);

export const getIsRunningExercise = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeExercise !== null
);
