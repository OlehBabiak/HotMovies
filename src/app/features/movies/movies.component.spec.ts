import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { MoviesComponent } from './movies.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { MockState, MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieModel, ResponseData } from '../../shared/models';
import {
  selectMovies,
  selectPage,
} from '../../store/selectors/pagination.selectors';
import { AppState } from '../../store/reducers';
import { ApiService } from '../../shared/services/api.service';
import { ComponentsModule } from '../../shared/components';
import { of } from 'rxjs';
import { MovieItemComponent } from '../../shared/components/movie-item/movie-item.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let store: MockStore;
  let mockSelectPageNumber: MemoizedSelector<AppState, number>;
  let mockSelectMovies: MemoizedSelector<AppState, MovieModel[]>;
  let initialState: MockState<AppState>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getMovies']);

    TestBed.configureTestingModule({
      declarations: [MoviesComponent, PaginationComponent, MovieItemComponent],
      imports: [
        StoreModule.forRoot({}), // Include your store configuration here,
        RouterTestingModule,
        HttpClientTestingModule,
        ComponentsModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: ApiService, useValue: mockApiService },
      ], // Provide the mock store
    });
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore; // Inject the mock store
    mockApiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize $movies and $currentPage', () => {
    // Arrange: Mock the store's select methods to return observables
    const movieData: Partial<MovieModel> = {
      title: 'Test Movie',
      release_date: '2023-08-21',
      vote_average: 7.5,
      poster_path: '/path/to/poster.jpg',
    };
    const mockMovies: MovieModel[] = [movieData as MovieModel];
    const mockCurrentPage = 1;

    mockSelectMovies = store.overrideSelector(selectMovies, mockMovies);
    mockSelectPageNumber = store.overrideSelector(selectPage, mockCurrentPage);

    component.$movies = store.select(mockSelectMovies);
    component.$currentPage = store.select(mockSelectPageNumber);

    // Assert: Ensure that $movies and $currentPage are correctly initialized
    component.$movies.subscribe((movies) => {
      expect(movies).toEqual(mockMovies);
    });

    component.$currentPage.subscribe((page) => {
      expect(page).toEqual(mockCurrentPage);
    });
  });

  it('should display movies when available', fakeAsync(() => {
    const movieData: Partial<MovieModel> = {
      title: 'Test Movie',
      release_date: '2023-08-21',
      vote_average: 7.5,
      poster_path: '/path/to/poster.jpg',
    };
    const movieData2: Partial<MovieModel> = {
      title: 'Test Movie 2',
      release_date: '2023-08-21',
      vote_average: 8.5,
      poster_path: '/path/to/poster.jpg',
    };

    // Arrange: Provide mock movie data
    const mockMovies: MovieModel[] = [
      movieData as MovieModel,
      movieData2 as MovieModel,
    ];

    // Mock the store to return the mockMovies data when selectMovies is called
    store.overrideSelector(selectMovies, mockMovies);

    // Mock the API service to return an observable with mock data
    const mockResponseData: ResponseData<MovieModel> = {
      page: 1,
      results: [movieData as MovieModel],
      total_pages: 1,
      total_results: mockMovies.length,
    };
    mockApiService.getMovies.and.returnValue(of(mockResponseData));

    // Act: Trigger component initialization
    fixture.detectChanges();
    tick();

    // Assert: Ensure that movies are displayed in the template
    const movieItemElements =
      fixture.nativeElement.querySelectorAll('app-movie-item');
    expect(movieItemElements.length).toEqual(mockMovies.length);
  }));

  it('should display pagination button when current page equal 1', fakeAsync(() => {
    const mockCurrentPage = 1;
    store.overrideSelector(selectPage, mockCurrentPage);

    mockApiService.getMovies.and.returnValue(of());
    fixture.detectChanges();
    tick();
    // Query for the app-pagination component in the fixture
    const paginationComponentDebugElement: DebugElement =
      fixture.debugElement.query(
        By.directive(PaginationComponent) // Replace 'AppPaginationComponent' with the actual component class name
      );
    // Expect that the pagination component is displayed
    expect(paginationComponentDebugElement).toBeTruthy();
  }));

  it('shouldn`t display pagination button when current page not equal 1', fakeAsync(() => {
    const mockCurrentPage = 2;
    store.overrideSelector(selectPage, mockCurrentPage);

    mockApiService.getMovies.and.returnValue(of());
    fixture.detectChanges();
    tick();
    // Query for the app-pagination component in the fixture
    const paginationComponentDebugElement: DebugElement =
      fixture.debugElement.query(
        By.directive(PaginationComponent) // Replace 'AppPaginationComponent' with the actual component class name
      );
    // Expect that the pagination component is not displayed
    expect(paginationComponentDebugElement).toBeNull();
  }));
});
