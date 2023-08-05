import { createAction, props } from '@ngrx/store';

export const isMenuActive = createAction(
  '[Menu] IsActive',
  props<{
    value: boolean;
  }>()
);
