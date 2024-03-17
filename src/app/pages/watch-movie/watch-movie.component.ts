import { Component } from '@angular/core';
import { MoviesService } from '../../shared/services/movies.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faCircleArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-watch-movie',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './watch-movie.component.html',
  styleUrl: './watch-movie.component.scss',
})
export class WatchMovieComponent {
  // Font Awesome Icons
  public faBack: IconDefinition = faCircleArrowLeft;

  constructor(
    private movieService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loadMovie();
  }

  private loadMovie(): void {
    this.movieService
      .getMovieById(this.getRouteParams())
      .subscribe((response) => {
        const videoBlob = new Blob([response.body], { type: 'video/mp4' });
        const videoData = URL.createObjectURL(videoBlob);
        const video = document.getElementById('video') as HTMLVideoElement;
        video.src = videoData;
        video.load();
        video.play();
      });
  }

  private getRouteParams(): number {
    return +this.activatedRoute.snapshot.params['id'];
  }
}
