import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../../shared/models/movie.model';
import { Router } from '@angular/router';
import { MoviesService } from '../../../../shared/services/movies.service';
import { After } from 'v8';
import { DialogService } from '../../../../shared/components/dialog/services/dialog.service';
import {
  IconDefinition,
  faVolumeHigh,
  faVolumeOff,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-frontpage-movie',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './frontpage-movie.component.html',
  styleUrl: './frontpage-movie.component.scss',
})
export class FrontpageMovieComponent implements AfterViewInit {
  @Input() frontPageMovie!: Movie;

  public videoMuted: boolean = true;

  public faVolumeOn: IconDefinition = faVolumeHigh;
  public faVolumeOff: IconDefinition = faVolumeXmark;

  constructor(
    private router: Router,
    private movieService: MoviesService,
    private dialogService: DialogService
  ) {}

  ngAfterViewInit(): void {
    this.getMovieById(this.frontPageMovie.id);
  }

  public mutedMovie(): void {
    const video = document.getElementById('videoTrending') as HTMLVideoElement;
    this.videoMuted = !this.videoMuted;
    video.muted = this.videoMuted;
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
    video.muted = this.videoMuted;
    video.loop = true;
  }

  public onDisplayMovieDetails(movie: Movie): void {
    this.dialogService.open(movie);
  }
}
