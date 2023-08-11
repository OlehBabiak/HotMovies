import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { MovieModel } from '../../shared/models';
import { Observable } from 'rxjs';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent implements OnInit {
  $movies!: Observable<MovieModel[]>;
  currentPage: number = 1;

  constructor(
    private apiService: ApiService,
    private movieService: MoviesService
  ) {}

  ngOnInit() {
    this.$movies = this.movieService.modifyPosterPath(
      this.apiService.getMovies(this.currentPage)
    );
  }
}
