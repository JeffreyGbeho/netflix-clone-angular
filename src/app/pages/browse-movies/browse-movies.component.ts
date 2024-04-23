import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { MoviesService } from '../../shared/services/movies.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ManageProfileComponent } from '../profile/components/manage-profile/manage-profile.component';
import { Movie } from '../../shared/models/movie.model';
import { MovieCardHoverDirective } from '../../shared/directives/movie-card-hover.directive';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faCircleCheck,
  faCircleChevronDown,
  faCirclePlay,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Profile } from '../../shared/models/profile.model';
import { ProfileService } from '../../shared/services/profile.service';
import { FrontpageMovieComponent } from './components/frontpage-movie/frontpage-movie.component';
import { MoviesSectionComponent } from './components/movies-section/movies-section.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-browse-movies',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    RouterLink,
    ManageProfileComponent,
    MovieCardHoverDirective,
    FontAwesomeModule,
    FrontpageMovieComponent,
    MoviesSectionComponent,
    DialogComponent,
  ],
  templateUrl: './browse-movies.component.html',
  styleUrl: './browse-movies.component.scss',
})
export class BrowseMoviesComponent {
  public profile?: Profile;
  public movies: Movie[] = [];
  public movieTrending?: Movie;

  // Font Awesome Icons
  public faCirclePlay: IconDefinition = faCirclePlay;
  public faCirclePlus: IconDefinition = faCirclePlus;
  public faCircleCheck: IconDefinition = faCircleCheck;
  public faCircleChevronDown: IconDefinition = faCircleChevronDown;

  constructor(
    private movieService: MoviesService,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.profileService.activeProfile.subscribe((profile) => {
      this.profile = profile;
    });

    this.loadMovies();
  }

  public onWatchMovie(movieId: number): void {
    this.router.navigate(['/watch', movieId]);
  }

  public addMovieToFavorites(movie: Movie): void {
    this.movieService.addMovieToFavorites(movie).subscribe(() => {
      if (this.profile?.id) {
        this.profileService.refreshProfile(this.profile?.id);
      }
    });
  }

  public removeMovieToFavorites(movie: Movie): void {
    this.movieService.removeMovieToFavorites(movie).subscribe(() => {
      if (this.profile?.id) {
        this.profileService.refreshProfile(this.profile?.id);
      }
    });
  }

  public isFavorite(movie: Movie): boolean {
    return this.profile?.favourites.some((m) => m.id === movie.id) || false;
  }

  private loadMovies(): void {
    this.movieService.getMovies();

    this.movieService.movies.subscribe((response) => {
      this.movies = response;

      this.movieTrending = this.movies[0];
    });
  }
}
