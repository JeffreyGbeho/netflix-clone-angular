import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { JWT_TOKEN_KEY } from '../constants/global.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: LocalStorageService
  ) {}

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.endpoints.auth}/login`, {
      email,
      password,
    });
  }

  public register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.endpoints.auth}/register`,
      {
        email,
        password,
      }
    );
  }

  public logout(): void {
    this.storage.removeItem(JWT_TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}
