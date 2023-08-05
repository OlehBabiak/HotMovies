import { AppState } from '../reducers';

export const selectIsFilterActive = (state: AppState) => {
  return state.menu.isMenuActive;
};
