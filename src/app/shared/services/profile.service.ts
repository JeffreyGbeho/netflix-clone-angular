import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  public saveProfile(profile: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/profile', profile);
  }

  public getProfiles() {
    return this.http.get<any>('http://localhost:8080/api/profile');
  }

  public getProfileById(id: string) {
    return this.http.get<any>(`http://localhost:8080/api/profile/${id}`);
  }

  public updateProfile(profile: any) {
    console.log(profile);
    console.log(profile.id);
    return this.http.put<any>(
      `http://localhost:8080/api/profile/${profile.id}`,
      profile
    );
  }

  public deleteProfile(id: string) {
    return this.http.delete<any>(`http://localhost:8080/api/profile/${id}`);
  }
}
