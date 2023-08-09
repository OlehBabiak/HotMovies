import {MovieModel} from "./movie.model";

export interface ResponseData<T> {
  "page": number,
  "results": [T],
  "total_pages": number,
  "total_results": number
}
