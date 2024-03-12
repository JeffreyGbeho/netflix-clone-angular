import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from '../../../../shared/services/profile.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.scss',
})
export class ManageProfileComponent implements OnInit {
  public profiles: any[] = [];
  faCirclePlus = faCirclePlus;
  faEdit = faPencil;

  test(picture?: string) {
    return picture
      ? `bg-[url('https://occ-0-6601-56.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABZumJ3wvSKM7od-r3UjhVF9j3yteWlQYA-51F3SNoI682llhul1Xf_CUkMnfP_17Md2lpOOhbwHeGufvo8kOTjptoS_bcwtniHKz.png?r=e6e)')]`
      : null;
  }

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfiles().subscribe((data) => {
      console.log(data);
      this.profiles = data;
    });
  }

  public addProfile() {
    this.router.navigate(['/profiles/add']);
  }
}
