import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { MovieItemComponent } from './movie-item.component';
import { UserScoreComponent } from '../user-score/user-score.component';
import { MovieModel } from '../../models';

describe('MovieItemComponent', () => {
  let component: MovieItemComponent;
  let fixture: ComponentFixture<MovieItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieItemComponent, UserScoreComponent],
    });
    fixture = TestBed.createComponent(MovieItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the app-user-score', (done: DoneFn) => {
    const userScoreElement =
      fixture.nativeElement.querySelector('app-user-score');
    expect(userScoreElement).toBeTruthy();
    done();
  });

  it('should bind the input movie', fakeAsync(() => {
    const movieData: Partial<MovieModel> = {
      title: 'Test Movie',
      release_date: '2023-08-21',
      vote_average: 7.5,
      poster_path: '/path/to/poster.jpg',
    };

    // Update the @Input movie property
    component.movie = movieData as MovieModel;

    // Trigger change detection manually
    fixture.detectChanges();

    // Wait for asynchronous tasks to complete (if any)
    tick();

    const titleElement = fixture.nativeElement.querySelector('h3');
    expect(titleElement.textContent).toBe('Test Movie');
  }));
});
