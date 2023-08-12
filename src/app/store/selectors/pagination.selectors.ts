import { AppState } from '../reducers';

export const selectPage = (state: AppState) => {
  return (state.pagination.page);
};

export const selectMovies = (state: AppState) => {
  return (state.pagination.results);
};
