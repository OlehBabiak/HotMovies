import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import {
  pageNumber,
  updateMoviesStore,
} from '../../../store/actions/pagination.actions';
import { MoviesService } from '../../../features/movies/services/movies.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() page!: number | null;

  constructor(
    private apiService: ApiService,
    private store: Store,
    private movieService: MoviesService
  ) {}

  onPageLoad() {
    if (this.page) {
      this.movieService
        .modifyPosterPath(this.apiService.getMovies(this.page + 1))
        .subscribe((resp) => {
          console.log('resp', resp);
          this.store.dispatch(pageNumber({ value: resp.page }));
          this.store.dispatch(updateMoviesStore({ value: resp.results }));
        });
    }
  }
}
