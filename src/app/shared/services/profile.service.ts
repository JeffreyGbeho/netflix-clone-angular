import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public saveProfile(profile: any) {
    return this.http.post('http://localhost:8080/api/profile', profile);
  }

  public getProfiles() {
    return this.http.get<any>('http://localhost:8080/api/profile');
  }
}
