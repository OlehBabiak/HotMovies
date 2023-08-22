import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from './shared/components/footer/footer.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, FooterComponent],
      imports: [
        StoreModule.forRoot({}), // Include your store configuration here,
        RouterTestingModule,
      ],
      providers: [provideMockStore()], // Provide the mock store
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore; // Inject the mock store
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it(`should have as title 'HotMovies'`, () => {
    expect(appComponent.title).toEqual('HotMovies');
  });

  it('should render the app-header', () => {
    const headerElement = fixture.nativeElement.querySelector('app-header');
    expect(headerElement).toBeTruthy();
  });

  it('should render the router-outlet', () => {
    const routerOutletElement =
      fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutletElement).toBeTruthy();
  });

  it('should render the app-footer', () => {
    const footerElement = fixture.nativeElement.querySelector('app-footer');
    expect(footerElement).toBeTruthy();
  });
});
