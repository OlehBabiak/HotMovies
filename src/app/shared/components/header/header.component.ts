import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import * as MenuSelectors from '../../../store/selectors/menu.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { isMenuActive } from '../../../store/actions/menu.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  isMenuActive = false;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store
      .select(MenuSelectors.selectIsFilterActive)
      .subscribe((state): void => {
        console.log(state);
        this.isMenuActive = state;
        this.cdr.markForCheck();
      });
  }

  onMenuActiveToggle() {
    this.store.dispatch(isMenuActive());
  }
}
