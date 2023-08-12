import { ActionReducerMap } from '@ngrx/store';
import { menuReducer, MenuState } from './menu.reducers';
import {paginationReducer, PaginationState} from './pagination.reducers';

export interface AppState {
  menu: MenuState;
  pagination: PaginationState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  menu: menuReducer,
  pagination: paginationReducer,
};
