import { createReducer, on } from '@ngrx/store';
import { startLoading, stopLoading } from './ui.action';

export interface StateModel {
  isLoading: boolean;
}

const initialState: StateModel = {
  isLoading: false
};

export const uiReducer = createReducer(
  initialState,
  on(startLoading, (state, action) => {
    return { isLoading: true };
  }),
  on(stopLoading, (state, action) => {
    return { isLoading: false };
  })
);
