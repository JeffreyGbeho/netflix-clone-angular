import { Component } from '@angular/core';
import { ProfileService } from '../../../../shared/services/profile.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Profile } from '../../../../shared/models/profile.model';
import { PROFILE_MANAGE_PATH } from '../../../../shared/constants/global.constant';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  public profile?: Profile;

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.loadData();
  }

  public updateProfile(): void {
    if (this.form.valid) {
      const profileUpdated = {
        ...this.profile,
      };
      profileUpdated.name = this.form.get('name')?.value;

      this.profileService.updateProfile(profileUpdated).subscribe(() => {
        this.router.navigate([PROFILE_MANAGE_PATH]);
      });
    }
  }

  public deleteProfile(): void {
    this.profileService
      .deleteProfile(this.profile?.id)
      .subscribe(() => this.router.navigate([PROFILE_MANAGE_PATH]));
  }

  private loadData(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.profileService.getProfileById(params['id']).subscribe((response) => {
        this.profile = response;

        this.form.patchValue({
          name: this.profile.name,
        });
      });
    });
  }
}
