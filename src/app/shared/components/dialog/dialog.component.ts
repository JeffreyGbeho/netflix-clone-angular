import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from './services/dialog.service';
import {
  IconDefinition,
  faCircleCheck,
  faCirclePlus,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  public display$?: Observable<'open' | 'close'>;
  public data$?: Observable<any>;
  public profile?: Profile;

  public faXmark: IconDefinition = faCircleXmark;
  public faCirclePlus: IconDefinition = faCirclePlus;
  public faCircleCheck: IconDefinition = faCircleCheck;

  constructor(
    private dialogService: DialogService,
    private router: Router,
    private profileService: ProfileService,
    private movieService: MoviesService
  ) {}

  ngOnInit() {
    this.display$ = this.dialogService.watch();
    this.data$ = this.dialogService.getData();

    this.data$.subscribe((data) => {
      console.log(data);
    });

    this.profileService.activeProfile.subscribe((profile) => {
      this.profile = profile;
    });
  }

  public close(): void {
    this.dialogService.close();
  }

  public onWatchMovie(movieId: number): void {
    this.router.navigate(['/watch', movieId]);
    this.dialogService.close();
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
