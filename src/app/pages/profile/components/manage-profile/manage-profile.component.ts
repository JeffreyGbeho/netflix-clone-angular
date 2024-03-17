import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faCirclePlus,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from '../../../../shared/services/profile.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Profile } from '../../../../shared/models/profile.model';

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.scss',
})
export class ManageProfileComponent implements OnInit {
  @Input() manageProfile: boolean = true;
  @Output() refreshBrowsePage: EventEmitter<Profile> = new EventEmitter();

  public profiles: Profile[] = [];

  // Font Awesome Icons
  public faCirclePlus: IconDefinition = faCirclePlus;
  public faEdit: IconDefinition = faPencil;

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit(): void {
    localStorage.removeItem('profile');

    this.profileService.getProfiles().subscribe((response) => {
      this.profiles = response;
    });
  }

  public getThumbnailOfProfile(picture?: string): string | null {
    return picture
      ? `bg-[url('https://occ-0-6601-56.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABZumJ3wvSKM7od-r3UjhVF9j3yteWlQYA-51F3SNoI682llhul1Xf_CUkMnfP_17Md2lpOOhbwHeGufvo8kOTjptoS_bcwtniHKz.png?r=e6e)')]`
      : null;
  }

  public addProfile(): void {
    this.router.navigate(['/profiles/add']);
  }

  public handleProfile(profile: Profile): void {
    if (this.manageProfile) {
      this.router.navigate(['/profiles/edit', profile.id]);
    } else {
      localStorage.setItem('profile', JSON.stringify(profile));
      this.refreshBrowsePage.emit(profile);
    }
  }
}
