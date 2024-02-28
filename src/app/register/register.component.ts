import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 public form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }

  public submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.register(this.form.value.email!, this.form.value.password!).subscribe((response: any) => {
        console.log(response)
        localStorage.setItem('JWT_TOKEN', response.token);
        this.router.navigate(['/profile']);
      });
    }
  }
}
