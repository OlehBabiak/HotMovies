import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  apiKey = environment.apiKey;
  url = environment.API_MOVIE

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const modifiedReq = request.clone({
      url: `${this.url}${request.url}`,
      headers: new HttpHeaders({
        accept: 'application/json',
        Authorization: `Bearer ${this.apiKey}` as string,
      }),
    });
    console.log(modifiedReq)
    return next.handle(modifiedReq);
  }
}
