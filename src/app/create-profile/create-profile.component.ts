import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfileService } from '../shared/services/profile.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss',
})
export class CreateProfileComponent {
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    child: new FormControl(false),
  });

  constructor(private profileService: ProfileService, private router: Router) {}

  public createProfile() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.profileService
        .saveProfile(this.form.getRawValue())
        .subscribe((response) => {
          console.log(response);
          this.router.navigate(['/profiles']);
        });
    }
  }
}
