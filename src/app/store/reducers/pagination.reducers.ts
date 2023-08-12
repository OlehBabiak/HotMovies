import { ActionReducer, createReducer, on } from '@ngrx/store';
import { pageNumber, updateMoviesStore } from '../actions/pagination.actions';
import { MovieModel } from '../../shared/models';

export interface PaginationState {
  page: number;
  results: MovieModel[];
  total_pages: number;
  total_results: number;
}

export const initialState: PaginationState = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const paginationReducer: ActionReducer<PaginationState, any> =
  createReducer(
    initialState,
    on(pageNumber, (state, action) => {
      return {
        ...state,
        page: action.value, // Update the 'page' property, not 'moviePage'
      };
    }),
    on(updateMoviesStore, (state, action) => {
      console.log([...state.results, ...action.value])
      return {
        ...state,
        results: [...state.results, ...action.value],
      };
    })
  );
