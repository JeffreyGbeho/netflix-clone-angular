import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  public saveProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(
      'http://localhost:8080/api/profile',
      profile
    );
  }

  public getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>('http://localhost:8080/api/profile');
  }

  public getProfileById(id: string): Observable<Profile> {
    return this.http.get<Profile>(`http://localhost:8080/api/profile/${id}`);
  }

  public updateProfile(profile: any): Observable<Profile> {
    return this.http.put<Profile>(
      `http://localhost:8080/api/profile/${profile.id}`,
      profile
    );
  }

  public deleteProfile(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/profile/${id}`);
  }
}
