import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../../core/http.guards';
import { Observable } from 'rxjs/Observable';
import { IDownloadCount } from './counter.models';

interface ICounterService {
  getDownloads(packageName: string, period: string): Observable<IDownloadCount>;
}

@Injectable()
export class CounterService implements ICounterService {

  private getDownloadsUrl: string;

  constructor(private http: HttpInterceptor) {
    this.getDownloadsUrl = `/point`;
  }

  public getDownloads(packageName: string, period: string): Observable<IDownloadCount> {
    return this.http.get(`${this.getDownloadsUrl}/${period}/${packageName}`).map((response) => {
      return response.json();
    });
  }

}
