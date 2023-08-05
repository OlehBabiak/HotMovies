import { ActionReducerMap } from '@ngrx/store';
import { menuReducer, MenuState } from "./menu.reducers";

export interface AppState {
  menu: MenuState
}

export const reducers: ActionReducerMap<AppState, any> = {
  menu: menuReducer,
};
