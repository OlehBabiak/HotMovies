import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';
import { MenuState } from '../reducers/menu.reducers';

export const selectMenu = (state: AppState) => {
  return state.menu;
};
export const selectIsFilterActive = createSelector(
  selectMenu,
  (state: MenuState) => state.isMenuActive
);
