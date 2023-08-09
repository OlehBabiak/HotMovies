import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieModel, ResponseData } from '../../../shared/models';
import { BASE_IMG_URL } from '../../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor() {}

  modifyPosterPath(value: Observable<ResponseData<MovieModel>>): Observable<MovieModel[]> {
    return value.pipe(
      map((responseData: ResponseData<MovieModel>) =>
        responseData.results.map((movie: MovieModel) => {
          const modifiedPosterPath: string = `${BASE_IMG_URL}${movie.poster_path}`;
          return { ...movie, poster_path: modifiedPosterPath };
        })
      )
    );
  }
}