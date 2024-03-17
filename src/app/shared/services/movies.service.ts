import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  public getMovies() {
    return this.http.get('http://localhost:8080/api/v1/movie');
  }

  public getMoviesByTitle(title: string): Observable<any> {
    return this.http.get(
      `http://localhost:8080/api/v1/movie/streaming/${title}`,
      {
        responseType: 'blob',
        observe: 'response',
      }
    );
  }

  public getMovieById(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/v1/movie/streaming/${id}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
