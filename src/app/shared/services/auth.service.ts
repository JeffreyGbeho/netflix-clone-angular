import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public setToken(token: string): void {
    localStorage.setItem('JWT_TOKEN', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('JWT_TOKEN');
  }

  public isTokenValid(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'http://localhost:8080/api/auth/login',
      {
        email,
        password,
      }
    );
  }

  public register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      'http://localhost:8080/api/auth/register',
      {
        email,
        password,
      }
    );
  }
}
