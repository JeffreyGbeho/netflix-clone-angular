import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { MoviesService } from '../../shared/services/movies.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ManageProfileComponent } from '../profile/components/manage-profile/manage-profile.component';
import { Profile } from '../../shared/models/profile.model';
import { Movie } from '../../shared/models/movie.model';

@Component({
  selector: 'app-browse-movies',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterLink, ManageProfileComponent],
  templateUrl: './browse-movies.component.html',
  styleUrl: './browse-movies.component.scss',
})
export class BrowseMoviesComponent {
  public movies: Movie[] = [];
  public movieTrending?: Movie;
  public profile?: Profile = localStorage.getItem('profile')
    ? JSON.parse(localStorage.getItem('profile')!)
    : null;

  constructor(private movieService: MoviesService) {
    this.loadData();
  }

  public mutedTrendingMovie(): void {
    const video = document.getElementById('videoTrending') as HTMLVideoElement;
    video.muted = !video.muted;
  }

  public setProfile(profile: Profile): void {
    this.profile = profile;
  }

  private getMovieById(movieId?: number): void {
    this.movieService.getMovieById(movieId).subscribe((response) => {
      const videoBlob = new Blob([response.body], { type: 'video/mp4' });
      this.loadMovieInBanner(URL.createObjectURL(videoBlob));
    });
  }

  private loadData(): void {
    this.movieService.getMovies().subscribe((response) => {
      this.movies = response;

      this.movieTrending = this.movies[0];
      this.getMovieById(this.movieTrending?.id);
    });
  }

  private loadMovieInBanner(videoData: string): void {
    const video = document.getElementById('videoTrending') as HTMLVideoElement;
    video.src = videoData;
    video.load();
    video.play();
    video.muted = true;
    video.loop = true;
  }
}
