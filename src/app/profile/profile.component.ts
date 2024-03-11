import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';
import { ProfileState } from '../shared/models/profile-state.enum';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public state: ProfileState = ProfileState.Select;
  public profiles: any[] = [];

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfiles().subscribe((data) => {
      console.log(data);
      this.profiles = data;
    });
  }

  public createProfile() {
    this.router.navigate(['/profiles/create']);
  }

  public handleProfile(profile: any) {
    localStorage.setItem('profile', JSON.stringify(profile));
    this.router.navigate(['/browse']);
  }

  public switchState() {
    this.state =
      this.state === ProfileState.Select
        ? ProfileState.Manage
        : ProfileState.Select;
  }
}
