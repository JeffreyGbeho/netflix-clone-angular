import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FloatingInputLabelDirective } from '../../../../shared/directives/floating-input-label.directive';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { JWT_TOKEN_KEY } from '../../../../shared/constants/global.constant';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FloatingInputLabelDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: LocalStorageService
  ) {}

  public submit(): void {
    if (this.form.valid) {
      this.authService
        .register(this.form.value.email!, this.form.value.password!)
        .subscribe((response) => {
          this.storage.setItem(JWT_TOKEN_KEY, response.token);
          this.router.navigate(['/browse']);
        });
    }
  }
}
