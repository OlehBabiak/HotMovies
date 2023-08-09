import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { MovieModel, ResponseData } from '../../shared/models';
import {map, Observable} from 'rxjs';
import { BASE_IMG_URL } from '../../shared/constants';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent implements OnInit {
  $movies!: Observable<MovieModel[]>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.$movies = this.apiService
      .getMovies()
      .pipe(
        map((responseData: ResponseData<MovieModel>) =>
          responseData.results.map((movie: MovieModel) => {
            const modifiedPosterPath: string = `${BASE_IMG_URL}${movie.poster_path}`;
            return { ...movie, poster_path: modifiedPosterPath };
          })
        )
      )
  }
}
