import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<
    'open' | 'close'
  >('close');

  private data: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  public getData(): Observable<any> {
    return this.data.asObservable();
  }

  public open(data?: any): void {
    this.data.next(data || {});
    this.display.next('open');
  }

  public close(): void {
    this.display.next('close');
  }
}
