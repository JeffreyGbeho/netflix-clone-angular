import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(email: string, password: string) {
    return this.http.post('http://localhost:8080/api/auth/login', { email, password });
  }

  public register(email: string, password: string) {
    return this.http.post('http://localhost:8080/api/auth/register', { email, password });
  }
}
