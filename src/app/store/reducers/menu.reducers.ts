import { createReducer, on } from '@ngrx/store';
import { isMenuActive } from '../actions/menu.actions';

export interface MenuState {
  isMenuActive: boolean;
}

export const initialState: MenuState = {
  isMenuActive: false,
};

export const menuReducer = createReducer(
  initialState,
  on(isMenuActive, (state: MenuState, action) => {
    return {
      ...state,
      isMenuActive: action.value,
    };
  })
);
