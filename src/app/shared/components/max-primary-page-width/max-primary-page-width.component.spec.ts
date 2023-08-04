import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxPrimaryPageWidthComponent } from './max-primary-page-width.component';

describe('MaxPrimaryPageWidthComponent', () => {
  let component: MaxPrimaryPageWidthComponent;
  let fixture: ComponentFixture<MaxPrimaryPageWidthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaxPrimaryPageWidthComponent]
    });
    fixture = TestBed.createComponent(MaxPrimaryPageWidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
