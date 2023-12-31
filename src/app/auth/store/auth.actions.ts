import { createAction } from '@ngrx/store';

export const setAuthenticated = createAction('Set Authenticated');
export const setUnauthenticated = createAction('Set Unauthenticated');
