import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { environment } from '../../../environments/environment';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public movies: Observable<Movie[]> = of([]);

  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) {}

  public getMovies(): void {
    this.movies = this.http.get<Movie[]>(`${environment.endpoints.movie}`);
  }

  public getMovieById(id?: number): Observable<any> {
    return this.http.get(`${environment.endpoints.movie}/streaming/${id}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  public addMovieToFavorites(movie: Movie): Observable<void> {
    const profile = this.profileService.activeProfile.value;

    let payload = {
      movieId: movie.id,
      profileId: profile.id,
    };

    return this.http.put<void>(
      `${environment.endpoints.movie}/favorite/add`,
      payload
    );
  }

  public removeMovieToFavorites(movie: Movie): Observable<void> {
    const profile = this.profileService.activeProfile.value;

    let payload = {
      movieId: movie.id,
      profileId: profile.id,
    };

    return this.http.put<void>(
      `${environment.endpoints.movie}/favorite/remove`,
      payload
    );
  }
}
