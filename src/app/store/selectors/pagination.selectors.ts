import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { PaginationState } from '../reducers/pagination.reducers';

export const selectPagination = (state: AppState) => {
  return state?.pagination;
};

export const selectPage = createSelector(
  selectPagination,
  (state: PaginationState) => state?.page
);


export const selectMovies = createSelector(
  selectPagination,
  (state: PaginationState) => state?.results
);
