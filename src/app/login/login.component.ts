import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }

  public submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.login(this.form.value.email!, this.form.value.password!).subscribe((response: any) => {
        console.log(response)
        localStorage.setItem('JWT_TOKEN', response.token);
        this.router.navigate(['/profile']);
      });
    }
  }

}
