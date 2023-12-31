import { createAction } from "@ngrx/store";

export const startLoading = createAction(
    'Start loading'
);

export const stopLoading = createAction(
    'Stop loading'
);