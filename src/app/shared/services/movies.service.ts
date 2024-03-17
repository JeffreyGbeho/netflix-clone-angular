import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('http://localhost:8080/api/v1/movie');
  }

  public getMovieById(id?: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/v1/movie/streaming/${id}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
