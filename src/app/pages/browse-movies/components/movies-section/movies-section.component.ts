import { Component, Input } from '@angular/core';
import { Movie } from '../../../../shared/models/movie.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCirclePlay,
  faCirclePlus,
  faCircleCheck,
  faCircleChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MoviesService } from '../../../../shared/services/movies.service';
import { ProfileService } from '../../../../shared/services/profile.service';
import { Profile } from '../../../../shared/models/profile.model';
import { MovieCardHoverDirective } from '../../../../shared/directives/movie-card-hover.directive';

@Component({
  selector: 'app-movies-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FontAwesomeModule,
    MovieCardHoverDirective,
  ],
  templateUrl: './movies-section.component.html',
  styleUrl: './movies-section.component.scss',
})
export class MoviesSectionComponent {
  @Input() titleSection: string = '';
  @Input() movies?: Movie[] = [];
  @Input() profile?: Profile;

  public faCirclePlay: IconDefinition = faCirclePlay;
  public faCirclePlus: IconDefinition = faCirclePlus;
  public faCircleCheck: IconDefinition = faCircleCheck;
  public faCircleChevronDown: IconDefinition = faCircleChevronDown;

  constructor(
    private router: Router,
    private movieService: MoviesService,
    private profileService: ProfileService
  ) {}

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
}
