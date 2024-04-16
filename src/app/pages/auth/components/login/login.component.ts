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
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { JWT_TOKEN_KEY } from '../../../../shared/constants/global.constant';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: LocalStorageService
  ) {}

  public submit(): void {
    if (this.form.valid) {
      this.formError = false;

      this.authService
        .login(this.form.value.email!, this.form.value.password!)
        .subscribe({
          next: (response) => {
            this.storage.setItem(JWT_TOKEN_KEY, response.token);
            this.router.navigate(['/browse']);
          },
          error: (error) => {
            console.error('There was an error!', error);
            this.formError = true;
          },
        });
    }
  }
}
