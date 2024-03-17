import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { MoviesService } from '../../shared/services/movies.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ManageProfileComponent } from '../profile/components/manage-profile/manage-profile.component';

@Component({
  selector: 'app-browse-movies',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterLink, ManageProfileComponent],
  templateUrl: './browse-movies.component.html',
  styleUrl: './browse-movies.component.scss',
})
export class BrowseMoviesComponent {
  public movies: any;
  public movieTrending: any;
  public videoData: any;
  public profile: any = localStorage.getItem('profile');

  constructor(private movieService: MoviesService) {
    this.movieService.getMovies().subscribe((response) => {
      this.movies = response;
      this.movieTrending = this.movies[0];
      this.getMovieById(this.movieTrending.id);
    });
  }

  public mutedTrendingMovie(): void {
    const video = document.getElementById('videoTrending') as HTMLVideoElement;
    video.muted = !video.muted;
  }

  private getMovieById(movieId: string): void {
    this.movieService.getMovieById(movieId).subscribe((response) => {
      const videoBlob = new Blob([response.body], { type: 'video/mp4' });
      const videoData = URL.createObjectURL(videoBlob);
      const video = document.getElementById(
        'videoTrending'
      ) as HTMLVideoElement;
      video.src = videoData;
      video.load();
      video.play();
      video.muted = true;
    });
  }

  public setProfile(profile: any): void {
    this.profile = profile;
  }
}
