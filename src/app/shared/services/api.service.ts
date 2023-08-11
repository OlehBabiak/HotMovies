import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieModel, ResponseData } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  day = environment.DAY;
  trending = environment.TRENDING;
  movie = environment.MOVIE;

  constructor(private http: HttpClient) {}

  getMovies(page: number): Observable<ResponseData<MovieModel>> {
    const params = new HttpParams().set('page', page).set('language', 'en-US');

    return this.http.get<ResponseData<MovieModel>>(
      `/${this.trending}/${this.movie}/${this.day}`,
      {
        params,
      }
    );
  }
}
