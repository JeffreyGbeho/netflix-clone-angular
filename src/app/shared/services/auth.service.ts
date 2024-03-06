import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public getToken(): string | null {
    return localStorage.getItem('JWT_TOKEN');
  }

  isTokenValid(token: string): boolean {
        try {
            const decodedToken: any = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp > currentTime;
        } catch (error) {
            return false;
        }
    }

  public login(email: string, password: string) {
    return this.http.post('http://localhost:8080/api/auth/login', { email, password });
  }

  public register(email: string, password: string) {
    return this.http.post('http://localhost:8080/api/auth/register', { email, password });
  }
}
