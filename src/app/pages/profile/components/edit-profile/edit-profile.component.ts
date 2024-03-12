import { Component } from '@angular/core';
import { ProfileService } from '../../../../shared/services/profile.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  public profile: any;

  // TODO: Add fields Autoplay control
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.profileService.getProfileById(params['id']).subscribe((response) => {
        this.profile = response;

        this.form.patchValue({
          name: this.profile.name,
        });
      });
    });
  }

  public updateProfile() {
    if (this.form.valid) {
      const profileUpdated = {
        ...this.profile,
      };
      profileUpdated.name = this.form.get('name')?.value;

      this.profileService
        .updateProfile(profileUpdated)
        .subscribe((response) => {
          this.router.navigate(['/profiles']);
        });
    }
  }

  public deleteProfile() {
    this.profileService
      .deleteProfile(this.profile.id)
      .subscribe(() => this.router.navigate(['/profiles']));
  }
}
