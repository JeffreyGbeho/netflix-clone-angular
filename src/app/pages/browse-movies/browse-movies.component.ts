import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { MoviesService } from '../../shared/services/movies.service';

@Component({
  selector: 'app-browse-movies',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './browse-movies.component.html',
  styleUrl: './browse-movies.component.scss',
})
export class BrowseMoviesComponent {
  public movies: any;
  public videoData: any;

  constructor(private movieService: MoviesService) {
    this.movieService.getMovies().subscribe((response) => {
      console.log(response);
      this.movies = response;
      this.getMoviesByTitle('Spring');
    });
  }

  private getMoviesByTitle(title: string): void {
    this.movieService.getMoviesByTitle(title).subscribe((response) => {
      const videoBlob = new Blob([response.body], { type: 'video/mp4' });
      this.videoData = URL.createObjectURL(videoBlob);
    });
  }
}
