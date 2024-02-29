import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-add-profil',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-profil.component.html',
  styleUrl: './add-profil.component.scss'
})
export class AddProfilComponent {
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    child: new FormControl(false),
  });

  constructor(private profileService: ProfileService) { }

  public submit() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.profileService.saveProfile(this.form.getRawValue()).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
