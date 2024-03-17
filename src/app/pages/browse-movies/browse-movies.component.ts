import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { MoviesService } from '../../shared/services/movies.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-browse-movies',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterLink],
  templateUrl: './browse-movies.component.html',
  styleUrl: './browse-movies.component.scss',
})
export class BrowseMoviesComponent {
  public movies: any;
  public movieTrending: any;
  public videoData: any;

  constructor(private movieService: MoviesService) {
    this.movieService.getMovies().subscribe((response) => {
      console.log(response);
      this.movies = response;
      this.movieTrending = this.movies[0];
      this.getMoviesByTitle('Spring');
    });
  }

  public mutedTrendingMovie(): void {
    const video = document.getElementById('videoTrending') as HTMLVideoElement;
    video.muted = !video.muted;
  }

  private getMoviesByTitle(title: string): void {
    this.movieService.getMoviesByTitle(title).subscribe((response) => {
      const videoBlob = new Blob([response.body], { type: 'video/mp4' });
      this.videoData = URL.createObjectURL(videoBlob);
    });
  }
}
