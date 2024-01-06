import { AppState } from 'src/app/app.reducer';
import { Exercise } from '../model/exercise.model';
import { createReducer, on } from '@ngrx/store';
import {
  setAvailableExercises,
  setCompletedExercise,
  startTraining,
  stopTraining,
} from './training.actions';

export interface TrainingState {
  availableExercises: Exercise[];
  completedExercises: Exercise[];
  activeExercise: Exercise;
}

export interface State extends AppState {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  completedExercises: [],
  activeExercise: null,
};

export const trainingReducer = createReducer(
  initialState,
  on(setAvailableExercises, (state, action) => {
    return { ...state, availableExercises: [...action.exercises] };
  }),
  on(setCompletedExercise, (state, action) => {
    return { ...state, completedExercises: [...action.exercises] };
  }),
  on(startTraining, (state, action) => {
    return {
      ...state,
      activeExercise: {
        ...state.availableExercises.find(
          (exercise) => exercise.id === action.exerciseId
        ),
      },
    };
  }),
  on(stopTraining, (state, action) => {
    return { ...state, activeExercise: null };
  })
);
