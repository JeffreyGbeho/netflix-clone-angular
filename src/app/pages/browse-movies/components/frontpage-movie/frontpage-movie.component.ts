import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../../shared/models/movie.model';
import { Router } from '@angular/router';
import { MoviesService } from '../../../../shared/services/movies.service';
import { After } from 'v8';

@Component({
  selector: 'app-frontpage-movie',
  standalone: true,
  imports: [],
  templateUrl: './frontpage-movie.component.html',
  styleUrl: './frontpage-movie.component.scss',
})
export class FrontpageMovieComponent implements AfterViewInit {
  @Input() frontPageMovie!: Movie;

  constructor(private router: Router, private movieService: MoviesService) {}

  ngAfterViewInit(): void {
    this.getMovieById(this.frontPageMovie.id);
  }

  public mutedMovie(): void {
    const video = document.getElementById('videoTrending') as HTMLVideoElement;
    video.muted = !video.muted;
  }

  // TODO: Move this method to a service
  public onWatchMovie(movieId: number): void {
    this.router.navigate(['/watch', movieId]);
  }

  private getMovieById(movieId?: number): void {
    this.movieService.getMovieById(movieId).subscribe((response) => {
      const videoBlob = new Blob([response.body], { type: 'video/mp4' });
      this.loadMovieInBanner(URL.createObjectURL(videoBlob));
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
