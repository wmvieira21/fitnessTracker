import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { StateModel, uiReducer } from './shared/ngrx/ui.reducer';
import { StateAuth, authReducer } from './auth/store/auth.recuder';

export interface AppState {
  uiState: StateModel;
  authState: StateAuth;
}

export const reducers: ActionReducerMap<AppState> = {
  uiState: uiReducer,
  authState: authReducer,
};

export const getUiState = createFeatureSelector<StateModel>('uiState');
export const getAuthState = createFeatureSelector<StateAuth>('authState');
