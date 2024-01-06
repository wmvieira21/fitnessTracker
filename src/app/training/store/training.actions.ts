import { createAction, props } from '@ngrx/store';
import { Exercise } from '../model/exercise.model';

export const setAvailableExercises = createAction(
  'Set Available exercises',
  props<{ exercises: Exercise[] }>()
);

export const setCompletedExercise = createAction(
  'Set Completed exercise',
  props<{ exercises: Exercise[] }>()
);

export const startTraining = createAction(
  'Start training',
  props<{ exerciseId: string }>()
);

export const stopTraining = createAction('Stop training');
