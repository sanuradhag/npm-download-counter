import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { INotification } from '../notification/shared/notification.model';
import { IDownloadCount } from '../counter/shared/counter.models';

@Injectable()
export class GlobalDataService {
  private showNotification = new Subject<INotification>();
  private loader = new Subject<boolean>();

  constructor() {
  }

  public showLoader(): void {
    this.loader.next(true);
  }

  public hideLoader(): void {
    this.loader.next(false);
  }

  public getLoaderState(): Observable<boolean> {
    return this.loader.asObservable();
  }

  public getNotification(): Observable<INotification> {
    return this.showNotification.asObservable();
  }

  public setNotification(notification: INotification) {
    return this.showNotification.next(notification);
  }
}
