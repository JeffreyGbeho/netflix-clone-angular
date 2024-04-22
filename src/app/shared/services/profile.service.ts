import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Profile } from '../models/profile.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public activeProfile: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  public refreshProfile(id: number): void {
    this.http
      .get<Profile>(`${environment.endpoints.profile}/${id}`)
      .subscribe((response) => {
        this.activeProfile.next(response);
      });
  }

  public saveProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${environment.endpoints.profile}`, profile);
  }

  public getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${environment.endpoints.profile}`);
  }

  public getProfileById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${environment.endpoints.profile}/${id}`);
  }

  public updateProfile(profile: any): Observable<Profile> {
    return this.http.put<Profile>(
      `${environment.endpoints.profile}/${profile.id}`,
      profile
    );
  }

  public deleteProfile(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.endpoints.profile}/${id}`);
  }
}
