import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { MovieModel } from '../../shared/models';
import { Observable } from 'rxjs';
import { MoviesService } from './services/movies.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import {
  selectMovies,
  selectPage,
} from '../../store/selectors/pagination.selectors';
import {pageNumber, updateMoviesStore} from "../../store/actions/pagination.actions";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent implements OnInit {
  $movies!: Observable<MovieModel[]>;
  $currentPage!: Observable<number | null>;

  constructor(
    private apiService: ApiService,
    private movieService: MoviesService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.movieService.modifyPosterPath(this.apiService.getMovies(1)).subscribe((resp) => {
      console.log('resp', resp)
      this.store.dispatch(pageNumber({ value: resp.page }));
      this.store.dispatch(updateMoviesStore({ value: resp.results }));
    });
    this.$currentPage = this.store.select(selectPage);
    this.$movies = this.store.select(selectMovies);
  }
}
