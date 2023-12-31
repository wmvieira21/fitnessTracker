import { createSelector } from '@ngrx/store';
import { StateAuth } from './auth.recuder';
import { getAuthState } from 'src/app/app.reducer';

export const getIsAuth = (state: StateAuth) => state.isAuthenticated;

export const getIsAuthSelector = createSelector(getAuthState, getIsAuth);
