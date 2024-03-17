import { Component } from '@angular/core';
import { MoviesService } from '../../shared/services/movies.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-watch-movie',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './watch-movie.component.html',
  styleUrl: './watch-movie.component.scss',
})
export class WatchMovieComponent {
  public faBack = faCircleArrowLeft;

  constructor(
    private movieService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.movieService.getMovieById(params['id']).subscribe((response) => {
        const videoBlob = new Blob([response.body], { type: 'video/mp4' });
        const videoData = URL.createObjectURL(videoBlob);
        const video = document.getElementById('video') as HTMLVideoElement;
        video.src = videoData;
        video.load();
        video.play();
      });
    });
  }
}
