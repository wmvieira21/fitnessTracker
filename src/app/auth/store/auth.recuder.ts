import { createReducer, on } from '@ngrx/store';
import { setAuthenticated, setUnauthenticated } from './auth.actions';

export interface StateAuth {
  isAuthenticated: boolean;
}

const initialState: StateAuth = {
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(setAuthenticated, (state, action) => {
    return { isAuthenticated: true };
  }),
  on(setUnauthenticated, (state, action) => {
    return { isAuthenticated: false };
  })
);
