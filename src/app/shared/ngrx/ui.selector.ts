import { createSelector } from '@ngrx/store';
import { StateModel } from './ui.reducer';
import { getUiState } from 'src/app/app.reducer';

export const getIsLoadingUI = (state: StateModel) => state.isLoading;

export const getIsLoading = createSelector(getUiState, getIsLoadingUI);
