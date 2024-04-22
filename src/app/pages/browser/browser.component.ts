import { Component } from '@angular/core';
import { Profile } from '../../shared/models/profile.model';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../common/header/header.component';
import { ManageProfileComponent } from '../profile/components/manage-profile/manage-profile.component';
import { BrowseMoviesComponent } from '../browse-movies/browse-movies.component';
import { ProfileService } from '../../shared/services/profile.service';

@Component({
  selector: 'app-browser',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ManageProfileComponent,
    BrowseMoviesComponent,
  ],
  templateUrl: './browser.component.html',
  styleUrl: './browser.component.scss',
})
export class BrowserComponent {
  public profile?: Profile;

  constructor(
    private storageService: LocalStorageService,
    private profileService: ProfileService
  ) {
    this.profileService.activeProfile.subscribe((profile) => {
      this.profile = profile;
    });

    this.loadProfile();
  }

  public loadProfile(): void {
    const profileId: string = this.storageService.getItem('profile') || '';
    if (profileId) {
      this.profileService.getProfileById(+profileId).subscribe((response) => {
        this.storageService.setItem('profile', response?.id?.toString() || '');
        this.profileService.activeProfile.next(response);
      });
    }
  }
}
