import { createAction, props } from '@ngrx/store';
import { MovieModel } from '../../shared/models';

export const pageNumber = createAction(
  '[Pagination] Page',
  props<{ value: number }>()
);

export const updateMoviesStore = createAction(
  '[Pagination] Movies',
  props<{ value: MovieModel[] }>()
);



