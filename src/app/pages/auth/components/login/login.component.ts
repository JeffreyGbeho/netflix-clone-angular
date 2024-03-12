import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FloatingInputLabelDirective } from '../../../../shared/directives/floating-input-label.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FloatingInputLabelDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public formError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  public submit() {
    if (this.form.valid) {
      this.formError = false;

      this.authService
        .login(this.form.value.email!, this.form.value.password!)
        .subscribe({
          next: (response: any) => {
            this.authService.setToken(response.token);
            this.router.navigate(['/profiles']);
          },
          error: (error: any) => {
            console.error('There was an error!', error);
            this.formError = true;
          },
        });
    }
  }
}
